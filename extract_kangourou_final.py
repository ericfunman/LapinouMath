#!/usr/bin/env python3
"""
Extract Kangourou questions from PDFs with improved parsing
"""

import fitz
import json
import re
from pathlib import Path
from typing import List, Dict

def extract_kangourou_v2(pdf_path: str, level: str, year: int) -> List[Dict]:
    """Extract Kangourou questions from PDF with improved parsing"""
    doc = fitz.open(pdf_path)
    questions = []
    
    # Combine all text from PDF
    full_text = ""
    for page in doc:
        full_text += page.get_text() + "\n"
    
    doc.close()
    
    # Split by question markers (numbered like "1", "2", "3" at start of lines or after newlines)
    # Pattern: newline + optional spaces + number + ) or . + space + question text
    question_pattern = r'\n\s*(\d+)\)?\s+([A-Z].+)(?=\n\s*\d+\)|$)'
    
    q_matches = list(re.finditer(question_pattern, full_text, re.DOTALL))
    
    for idx, match in enumerate(q_matches):
        q_num = int(match.group(1))
        q_text = match.group(2).strip()
        
        # Extract options from question text
        # Format: A) option text B) option text C) option text D) option text E) option text
        option_pattern = r'([A-E]\))\s*([^\n]*)(?=[A-E]\)|$)'
        option_matches = list(re.finditer(option_pattern, q_text))
        
        if len(option_matches) >= 4:
            options = []
            for opt_match in option_matches[:4]:  # Take first 4 options
                opt_text = opt_match.group(2).strip()
                if opt_text:
                    options.append(opt_text)
            
            if len(options) == 4:
                # Estimate difficulty based on question number
                # Kangourou: 1-8=easy(1), 9-16=medium(2), 17-24=hard(3)
                difficulty = min(3, max(1, (q_num - 1) // 8 + 1))
                
                questions.append({
                    'question': q_text.split('A)')[0].strip(),  # Get text before first option
                    'options': options,
                    'correctAnswer': None,  # Will be set later from corrections
                    'explanation': '',
                    'level': level,
                    'difficulty': difficulty,
                    'year': year,
                    'questionNumber': q_num
                })
    
    return questions

def extract_corrections(pdf_path: str) -> Dict[int, int]:
    """Extract answers from correction PDF"""
    # Correction file format: answer key like "1A 2C 3D..." or "Réponses: A B C D..."
    doc = fitz.open(pdf_path)
    corrections = {}
    
    full_text = ""
    for page in doc:
        full_text += page.get_text() + "\n"
    doc.close()
    
    # Look for answer patterns like "1A", "2B", "3C" etc. or just "A B C D"
    # Pattern 1: "1A 2B 3C..." format
    answer_pattern = r'(\d+)\s*([A-E])'
    matches = re.findall(answer_pattern, full_text)
    
    answer_map = {'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4}
    for q_num, answer in matches:
        corrections[int(q_num)] = answer_map.get(answer, None)
    
    return corrections

def process_single_pdf_pair(questions_file: Path, corrections_file: Path, level: str, year: int) -> List[Dict]:
    """Process a single PDF pair (questions + corrections)"""
    if not questions_file.exists():
        print(f"\n⚠️  {questions_file.name} non trouvé")
        return []
    
    print(f"\n📖 {questions_file.name} ({level})")
    
    # Extract questions
    questions = extract_kangourou_v2(str(questions_file), level, year)
    print(f"   ✅ Extrait {len(questions)} questions")
    
    # Extract corrections if available
    corrections = {}
    if corrections_file.exists():
        corrections = extract_corrections(str(corrections_file))
        print(f"   ✅ Extrait {len(corrections)} réponses")
        
        # Apply corrections
        for q in questions:
            q_num = q.get('questionNumber')
            if q_num in corrections:
                q['correctAnswer'] = corrections[q_num]
    
    # Show example
    if questions:
        q = questions[0]
        print("\n   Exemple:")
        print(f"   Q: {q['question'][:60]}...")
        print(f"   Options: {q['options']}")
        if q['correctAnswer'] is not None:
            print(f"   ✓ Réponse: {chr(65 + q['correctAnswer'])}")
        print(f"   Difficulté: {q['difficulty']}/3")
    
    return questions

def print_summary(all_questions: List[Dict]) -> None:
    """Print summary statistics of extracted questions"""
    print("\n\n📊 RÉSUMÉ FINAL")
    print("="*70)
    print(f"Total questions: {len(all_questions)}")
    
    # Count by level and difficulty
    by_level = {}
    by_difficulty = {}
    with_answers = sum(1 for q in all_questions if q['correctAnswer'] is not None)
    
    for q in all_questions:
        level = q['level']
        diff = q['difficulty']
        by_level[level] = by_level.get(level, 0) + 1
        by_difficulty[diff] = by_difficulty.get(diff, 0) + 1
    
    print("\nPar niveau:")
    for level in ['CE2', 'CM1', 'CM2', '6ème', '5ème', '4ème', '3ème']:
        if level in by_level:
            print(f"  {level}: {by_level[level]}")
    
    print("\nPar difficulté:")
    for diff in [1, 2, 3]:
        if diff in by_difficulty:
            print(f"  Niveau {diff}: {by_difficulty[diff]}")
    
    print(f"\nRéponses trouvées: {with_answers}/{len(all_questions)}")

def save_questions_to_json(questions: List[Dict], filename: str, clean_filename: str = None) -> None:
    """Save questions to JSON file(s)"""
    json_file = Path(filename)
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(questions, f, ensure_ascii=False, indent=2)
    print(f"\n✅ Fichier sauvegardé: {json_file}")
    
    if clean_filename:
        # Remove questionNumber field for final output
        clean_questions = []
        for q in questions:
            clean_q = q.copy()
            del clean_q['questionNumber']
            clean_questions.append(clean_q)
        
        json_file_clean = Path(clean_filename)
        with open(json_file_clean, 'w', encoding='utf-8') as f:
            json.dump(clean_questions, f, ensure_ascii=False, indent=2)
        print(f"✅ Fichier propre sauvegardé: {json_file_clean}")

def main():
    """Main extraction"""
    pdf_dir = Path("kangourou")
    
    if not pdf_dir.exists():
        print(f"❌ Dossier non trouvé: {pdf_dir}")
        return
    
    all_questions = []
    
    # Mapping PDF files
    file_mappings = [
        ('kangourou2020e.pdf', 'kangourou2020e4corr.pdf', 'CE2', 2020),
        ('kangourou2020b.pdf', 'kangourou2020b4corr.pdf', '6ème', 2020),
        ('kangourou2020c.pdf', 'kangourou2020c5corr.pdf', '4ème', 2020),
    ]
    
    print("\n🦘 EXTRACTION DES QUESTIONS KANGOUROU v2")
    print("="*70)
    
    for questions_file, corrections_file, level, year in file_mappings:
        q_path = pdf_dir / questions_file
        c_path = pdf_dir / corrections_file
        questions = process_single_pdf_pair(q_path, c_path, level, year)
        all_questions.extend(questions)
    
    if all_questions:
        print_summary(all_questions)
        save_questions_to_json(all_questions, "kangourou_extracted.json", "kangourou_questions.json")
    else:
        print("\n❌ Aucune question extraite")

if __name__ == "__main__":
    main()
