#!/usr/bin/env python3
"""
Extract Kangourou questions from PDFs using PyMuPDF
Format them to JSON for integration into LapinouMath
"""

import fitz  # pip install pymupdf
import json
import pandas as pd
import os
import re
from pathlib import Path
from typing import List, Dict, Optional

def create_new_question(level: str, year: int) -> Dict:
    """Create a new question dictionary"""
    return {
        'question': '',
        'options': [],
        'correctAnswer': None,
        'explanation': '',
        'level': level,
        'difficulty': 1,
        'year': year
    }

def is_question_start(line: str) -> tuple[bool, str]:
    """Check if line starts a new question, return (is_start, question_text)"""
    match = re.match(r'^(\d+)\.\s+', line)
    if match:
        question_text = re.sub(r'^\d+\.\s+', '', line)
        return True, question_text
    return False, ""

def is_option_line(line: str) -> tuple[bool, str]:
    """Check if line is an option, return (is_option, option_text)"""
    match = re.match(r'^[A-E]\)\s+(.+)', line)
    if match:
        return True, match.group(1)
    return False, ""

def calculate_difficulty(q_num: int) -> int:
    """Calculate difficulty based on question number"""
    return min(4, max(1, (q_num // 8) + 1))

from typing import Optional

def finalize_question(current_q: Dict, q_num: int) -> Optional[Dict]:
    """Finalize a question by setting difficulty and returning a copy"""
    if current_q['question'] and len(current_q['options']) >= 4:
        final_q = current_q.copy()
        final_q['difficulty'] = calculate_difficulty(q_num)
        return final_q
    return None

def handle_question_start(questions: List[Dict], current_q: Dict, q_num: int, level: str, year: int, question_text: str) -> tuple[Dict, int]:
    """Handle the start of a new question"""
    final_q = finalize_question(current_q, q_num)
    if final_q:
        questions.append(final_q)
    
    new_q = create_new_question(level, year)
    new_q['question'] = question_text
    return new_q, q_num + 1

def handle_option_line(current_q: Dict, option_text: str) -> bool:
    """Handle an option line, return True if option was added"""
    current_q['options'].append(option_text)
    return True

def handle_explanation_line(current_q: Dict, line: str, in_options: bool) -> bool:
    """Handle potential explanation line, return new in_options state"""
    if in_options and line and not line.startswith('('):
        if not re.match(r'Réponse|Answer', line, re.IGNORECASE):
            current_q['explanation'] = line[:200]
        return False
    return in_options

def process_page_lines(lines: List[str], level: str, year: int) -> List[Dict]:
    """Process lines from a page and extract questions"""
    questions = []
    current_q = create_new_question(level, year)
    q_num = 0
    in_options = False
    
    for line in lines:
        is_start, question_text = is_question_start(line)
        
        if is_start:
            current_q, q_num = handle_question_start(questions, current_q, q_num, level, year, question_text)
            in_options = False
            continue
        
        if not current_q['question']:
            continue
            
        is_option, option_text = is_option_line(line)
        if is_option:
            in_options = handle_option_line(current_q, option_text)
        else:
            in_options = handle_explanation_line(current_q, line, in_options)
    
    final_q = finalize_question(current_q, q_num)
    if final_q:
        questions.append(final_q)
    
    return questions

def extract_kangourou(pdf_path: str, level: str, year: int) -> List[Dict]:
    """Extract Kangourou questions from PDF"""
    doc = fitz.open(pdf_path)
    all_questions = []
    
    for page in doc:
        text = page.get_text()
        lines = [line.strip() for line in text.split('\n') if line.strip()]
        questions = process_page_lines(lines, level, year)
        all_questions.extend(questions)
    
    doc.close()
    return all_questions

def process_single_file(pdf_path: Path, level: str, year: int) -> List[Dict]:
    """Process a single PDF file and return extracted questions"""
    if not pdf_path.exists():
        print(f"\n⚠️  Fichier non trouvé: {pdf_path}")
        return []
    
    print(f"\n📖 Traitement: {pdf_path.name} ({level}, {year})")
    try:
        questions = extract_kangourou(str(pdf_path), level, year)
        print(f"   ✅ Extrait {len(questions)} questions")
        
        # Show example
        if questions:
            print("   Exemple:")
            q = questions[0]
            print(f"   Q: {q['question'][:80]}...")
            print(f"   Options: {len(q['options'])}")
            print(f"   Difficulté: {q['difficulty']}")
        
        return questions
    except Exception as e:
        print(f"   ❌ Erreur: {e}")
        return []

def print_summary(all_questions: List[Dict]) -> None:
    """Print summary statistics"""
    print("\n📊 RÉSUMÉ TOTAL")
    print("="*60)
    print(f"Total questions extraites: {len(all_questions)}")
    
    # Count by level and difficulty
    by_level = {}
    by_difficulty = {}
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
    for diff in [1, 2, 3, 4]:
        if diff in by_difficulty:
            print(f"  Niveau {diff}: {by_difficulty[diff]}")

def save_results(all_questions: List[Dict]) -> None:
    """Save results to JSON and CSV files"""
    # Save JSON
    json_file = Path("kangourou_extracted.json")
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(all_questions, f, ensure_ascii=False, indent=2)
    print(f"\n📁 Fichier JSON sauvegardé: {json_file}")
    
    # Save CSV for Excel
    csv_file = Path("kangourou_extracted.csv")
    df = pd.DataFrame(all_questions)
    df.to_csv(csv_file, index=False, encoding='utf-8')
    print(f"📁 Fichier CSV sauvegardé: {csv_file}")
    
    print("\n✅ Extraction terminée!")
    print("Vous pouvez valider les questions et utiliser le JSON pour l'intégration")

def main():
    """Main extraction function"""
    pdf_dir = Path("kangourou")
    
    if not pdf_dir.exists():
        print(f"❌ Dossier non trouvé: {pdf_dir}")
        return
    
    all_questions = []
    
    # Mapping des fichiers PDF vers niveaux
    file_mappings = [
        ('kangourou2020e.pdf', 'CE2', 2020),
        ('kangourou2020b.pdf', '6ème', 2020),
        ('kangourou2020c.pdf', '4ème', 2020),
        # Ajoute d'autres fichiers si disponibles
    ]
    
    print("\n🦘 EXTRACTION DES QUESTIONS KANGOUROU")
    print("="*60)
    
    for filename, level, year in file_mappings:
        path = pdf_dir / filename
        questions = process_single_file(path, level, year)
        all_questions.extend(questions)
    
    if all_questions:
        print_summary(all_questions)
        save_results(all_questions)
    else:
        print("\n❌ Aucune question extraite")

if __name__ == "__main__":
    main()
