#!/usr/bin/env python3
"""
Final Kangourou extractor - cleans and validates questions
"""

import json
import re
from pathlib import Path

def clean_question_text(text: str) -> str:
    """Remove headers and noise from question text"""
    # Remove page headers
    text = re.sub(r'KANGOUROU DES MATHÉMATIQUES.*?organise le jeu.*?\.\s*', '', text, flags=re.DOTALL)
    text = re.sub(r'KANGOUROU\s+(?:ANGOUROU\s+)?DES.*?TIQUES.*?jeu-concours.*?\.\s*', '', text, flags=re.DOTALL | re.IGNORECASE)
    text = re.sub(r'Jeu-concours.*?change pas\.\s*', '', text, flags=re.DOTALL)
    text = re.sub(r"Pour gagner.*?…\)\s*", '', text, flags=re.DOTALL)
    text = re.sub(r'L\'association.*?points chacune\.\s*', '', text, flags=re.DOTALL)
    
    # Remove copyright/footer stuff
    text = re.sub(r'Toute représentation[^\n]*\n', '', text)
    text = re.sub(r'© Art Culture[^\n]*\n', '', text)
    text = re.sub(r'Kangourou des mathématiques[^\n]*\n', '', text)
    
    # Clean up multiple newlines
    text = re.sub(r'\n\s*\n+', '\n', text)
    text = re.sub(r'\s+\n', '\n', text)
    
    return text.strip()

def validate_and_clean(questions: list) -> list:
    """Filter and clean valid questions"""
    valid_questions = []
    
    for q in questions:
        # Clean question text
        question = clean_question_text(q.get('question', ''))
        
        # Remove questions that are just headers/instructions
        if len(question) < 20 or 'KANGOUROU' in question or 'association' in question:
            continue
        
        # Keep questions with text and at least some valid options
        options = [opt.strip() for opt in q.get('options', []) if opt.strip()]
        
        # Must have at least 3 valid non-empty options
        if len(options) >= 3 and question:
            valid_questions.append({
                'question': question,
                'options': options[:4],  # Keep max 4
                'correctAnswer': q.get('correctAnswer'),
                'explanation': q.get('explanation', '').strip() or 'Voir le corrigé Kangourou',
                'level': q.get('level', 'CE2'),
                'difficulty': q.get('difficulty', 1),
                'year': q.get('year', 2020)
            })
    
    return valid_questions

def main():
    """Process extracted questions"""
    json_file = Path("kangourou_questions.json")
    
    if not json_file.exists():
        print(f"❌ File not found: {json_file}")
        return
    
    print("📖 Loading extracted questions...")
    with open(json_file, 'r', encoding='utf-8') as f:
        questions = json.load(f)
    
    print(f"   Found {len(questions)} raw questions")
    
    # Clean and validate
    valid_questions = validate_and_clean(questions)
    print(f"   After cleaning: {len(valid_questions)} valid questions")
    
    if valid_questions:
        print("\n📊 Breakdown by level:")
        by_level = {}
        for q in valid_questions:
            level = q['level']
            by_level[level] = by_level.get(level, 0) + 1
        
        for level in sorted(by_level.keys()):
            print(f"  {level}: {by_level[level]}")
        
        # Show some examples
        print("\n📝 Exemples:")
        for i, q in enumerate(valid_questions[:3], 1):
            print(f"\n  Q{i} ({q['level']}, Difficulté {q['difficulty']}):")
            print(f"     {q['question'][:80]}...")
            print(f"     Options: {len(q['options'])}")
        
        # Save cleaned version
        output_file = Path("kangourou_questions_cleaned.json")
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(valid_questions, f, ensure_ascii=False, indent=2)
        
        print(f"\n✅ Cleaned file saved: {output_file}")
        print(f"\n⚠️  NOTE: These are {len(valid_questions)} Kangourou 2020 questions")
        print("   They need manual review before integration into LapinouMath")
        print("   Many have empty options because they're image-based questions")
        
    else:
        print("❌ No valid questions found after cleaning")

if __name__ == "__main__":
    main()
