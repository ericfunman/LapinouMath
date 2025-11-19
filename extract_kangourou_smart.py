#!/usr/bin/env python3
"""
Smart Kangourou PDF extractor - handles irregular formatting
"""

import fitz
import json
import re
from pathlib import Path
from typing import List, Dict

def split_into_questions(text: str) -> List[str]:
    """
    Split PDF text into individual questions
    Kangourou questions usually start with verb (Quel, Combien, Laquelle, etc.)
    """
    # Split by patterns that likely indicate new question
    # Look for capitalized words followed by common question starters
    question_starters = [
        r'\nQuel', r'\nQuelle', r'\nQuels', r'\nQuelles', r'\nCombien',
        r'\nLaquelle', r'\nLequel', r'\nLesquels', r'\nLesquelles',
        r'\nColorie', r'\nÉcrit', r'\nDessine', r'\nRegarde', r'\nPlace',
        r'\nMesure', r'\nPlie', r'\nConstruit', r'\nDoit', r'\nVaut'
    ]
    
    splitter = '|'.join(question_starters)
    question_texts = re.split(splitter, text)
    return [q.strip() for q in question_texts if q.strip()]

OPTION_PATTERN = re.compile(r'^[A-E]\)')

def find_option_lines(lines: List[str]) -> int:
    """Find the index where options start"""
    for i, line in enumerate(lines):
        if OPTION_PATTERN.match(line):
            return i
    return -1

def extract_single_option(lines: List[str], start_idx: int) -> tuple[str, int]:
    """Extract one option and return (option_text, next_index)"""
    line = lines[start_idx]
    option_text = OPTION_PATTERN.sub('', line).strip()
    
    j = start_idx + 1
    while j < len(lines) and not OPTION_PATTERN.match(lines[j]) and lines[j].strip():
        if not any(w in lines[j] for w in ['écrits', 'Qu\'', 'est', 'vaut', 'Sur qu', 'où', 'Lequel']):
            option_text += ' ' + lines[j].strip()
            j += 1
        else:
            break
    
    return option_text.strip(), j

def extract_options_and_answer(question_text: str) -> Dict:
    """Extract options A-E and determine correct answer"""
    lines = question_text.split('\n')
    
    # Find options
    options = []
    option_start_idx = find_option_lines(lines)
    
    if option_start_idx >= 0:
        i = option_start_idx
        while i < len(lines) and len(options) < 5:
            if OPTION_PATTERN.match(lines[i]):
                option_text, next_i = extract_single_option(lines, i)
                options.append(option_text)
                i = next_i
            else:
                i += 1
    
    # Extract question text (everything before first option)
    question_text_only = ''
    if option_start_idx > 0:
        question_text_only = '\n'.join(lines[:option_start_idx]).strip()
    
    result = {
        'question': question_text_only,
        'options': options,
        'correctAnswer': None,
        'explanation': ''
    }
    
    return result

def extract_kangourou_smart(pdf_path: str, level: str, year: int) -> List[Dict]:
    """Extract questions using smart splitting"""
    doc = fitz.open(pdf_path)
    
    full_text = ""
    for page in doc:
        full_text += page.get_text() + "\n"
    doc.close()
    
    # Remove header/footer noise (like page numbers, KANGOUROU 2020, etc.)
    full_text = re.sub(r'KANGOUROU \d+[^\n]*\n', '', full_text, flags=re.IGNORECASE)
    full_text = re.sub(r'[EBC]-\d+', '', full_text)
    full_text = re.sub(r'Sujet [A-Z]', '', full_text)
    
    # Split into questions
    question_texts = split_into_questions(full_text)
    
    questions = []
    for q_num, q_text in enumerate(question_texts, 1):
        if len(q_text) < 10:  # Skip very short fragments
            continue
        
        parsed = extract_options_and_answer(q_text)
        
        if len(parsed['options']) >= 4 and parsed['question'].strip():
            # Difficulty: questions 1-8=1, 9-16=2, 17-24=3
            difficulty = min(3, max(1, (q_num - 1) // 8 + 1))
            
            questions.append({
                'question': parsed['question'],
                'options': parsed['options'][:4],
                'correctAnswer': None,
                'explanation': parsed['explanation'],
                'level': level,
                'difficulty': difficulty,
                'year': year
            })
    
    return questions

def process_single_pdf(pdf_path: Path, level: str, year: int) -> List[Dict]:
    """Process a single PDF file and return extracted questions"""
    if not pdf_path.exists():
        print(f"\n⚠️  {pdf_path.name} non trouvé")
        return []
    
    print(f"\n📖 {pdf_path.name}")
    questions = extract_kangourou_smart(str(pdf_path), level, year)
    print(f"   ✅ {len(questions)} questions extraites")
    
    if questions:
        print("\n   Exemples:")
        for i, q in enumerate(questions[:3]):
            print(f"\n   Q{i+1} (Difficulté {q['difficulty']}):")
            print(f"      {q['question'][:80]}...")
            print(f"      Réponses: {len(q['options'])}")
    
    return questions

def print_summary(all_questions: List[Dict]) -> None:
    """Print summary statistics of extracted questions"""
    print("\n\n📊 RÉSUMÉ")
    print("="*70)
    print(f"Total questions: {len(all_questions)}")
    
    by_level = {}
    by_difficulty = {}
    for q in all_questions:
        by_level[q['level']] = by_level.get(q['level'], 0) + 1
        by_difficulty[q['difficulty']] = by_difficulty.get(q['difficulty'], 0) + 1
    
    print("\nPar niveau:")
    for level in ['CE2', '6ème', '4ème']:
        print(f"  {level}: {by_level.get(level, 0)}")
    
    print("\nPar difficulté:")
    for d in [1, 2, 3]:
        print(f"  Niveau {d}: {by_difficulty.get(d, 0)}")

def save_questions_to_json(questions: List[Dict], filename: str) -> None:
    """Save questions to JSON file"""
    json_file = Path(filename)
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(questions, f, ensure_ascii=False, indent=2)
    
    print(f"\n✅ Fichier sauvegardé: {json_file}")
    print("   Prêt pour intégration dans LapinouMath")

def main():
    """Main function"""
    pdf_dir = Path("kangourou")
    
    file_mappings = [
        ('kangourou2020e.pdf', 'CE2', 2020),
        ('kangourou2020b.pdf', '6ème', 2020),
        ('kangourou2020c.pdf', '4ème', 2020),
    ]
    
    all_questions = []
    
    print("\n🦘 KANGOUROU QUESTION EXTRACTOR (Smart Mode)")
    print("="*70)
    
    for pdf_file, level, year in file_mappings:
        pdf_path = pdf_dir / pdf_file
        questions = process_single_pdf(pdf_path, level, year)
        all_questions.extend(questions)
    
    if all_questions:
        print_summary(all_questions)
        save_questions_to_json(all_questions, "kangourou_questions.json")
    else:
        print("\n❌ Aucune question extraite")

if __name__ == "__main__":
    main()
