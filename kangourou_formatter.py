#!/usr/bin/env python3
"""
Interactive script to manually input Kangourou questions and format them to JSON
"""

import json
from pathlib import Path
from typing import List, Dict, Optional

VALID_LEVELS = ['CE1', 'CE2', 'CM1', 'CM2', '6ème', '5ème', '4ème', '3ème']
VALID_DIFFICULTIES = [1, 2, 3]

def get_question_text() -> Optional[str]:
    """Get question text from user input"""
    question_text = input("\n📝 Énoncé de la question:\n> ").strip()
    return question_text if question_text else None

def get_options() -> Optional[List[str]]:
    """Get 4 options from user input"""
    print("\n4 options (tapez chacune sur une ligne):")
    options = []
    for letter in ['A', 'B', 'C', 'D']:
        opt = input(f"  {letter}) ").strip()
        if not opt:
            print("❌ Erreur: toutes les options sont requises")
            return None
        options.append(opt)
    return options

def get_correct_answer() -> int:
    """Get correct answer index (0-3) from user input"""
    while True:
        try:
            correct = int(input("\n✓ Numéro de la bonne réponse (0=A, 1=B, 2=C, 3=D): "))
            if correct in [0, 1, 2, 3]:
                return correct
            raise ValueError
        except ValueError:
            print("❌ Veuillez entrer 0, 1, 2 ou 3")

def get_explanation() -> str:
    """Get explanation from user input"""
    explanation = input("\n💡 Explication courte (optionnel):\n> ").strip()
    return explanation or "Voir le corrigé Kangourou"

def get_level() -> str:
    """Get level from user input"""
    while True:
        level = input(f"\n📚 Niveau ({'/'.join(VALID_LEVELS)}): ").strip()
        if level in VALID_LEVELS:
            return level
        print("❌ Niveau invalide")

def get_difficulty() -> int:
    """Get difficulty (1-3) from user input"""
    while True:
        try:
            difficulty = int(input("\n⭐ Difficulté (1=facile, 2=moyen, 3=difficile): "))
            if difficulty in VALID_DIFFICULTIES:
                return difficulty
            raise ValueError
        except ValueError:
            print("❌ Veuillez entrer 1, 2 ou 3")

def create_question() -> Optional[Dict]:
    """Interactively create a single question"""
    print("\n" + "="*60)
    print("CRÉER UNE NOUVELLE QUESTION")
    print("="*60)
    
    try:
        question_text = get_question_text()
        if not question_text:
            return None
        
        options = get_options()
        if not options:
            return None
        
        correct = get_correct_answer()
        explanation = get_explanation()
        level = get_level()
        difficulty = get_difficulty()
        
        return {
            "question": question_text,
            "options": options,
            "correctAnswer": correct,
            "explanation": explanation,
            "level": level,
            "difficulty": difficulty
        }
    
    except KeyboardInterrupt:
        print("\n\nCancellation...")
        return None

def main():
    """Main interactive loop"""
    questions = []
    output_file = Path("src/data/kangourouQuestions_new.json")
    
    print("\n" + "🦘 "*20)
    print("KANGOUROU QUESTIONS FORMATTER")
    print("🦘 "*20)
    print("\nCe script vous aide à entrer les questions Kangourou manuellement")
    print("Tapez les questions une par une, le script les formatera en JSON")
    print("Appuyez sur Ctrl+C pour terminer\n")
    
    try:
        while True:
            question = create_question()
            if question:
                questions.append(question)
                print(f"\n✅ Question ajoutée! Total: {len(questions)}")
            else:
                break
    
    except KeyboardInterrupt:
        print("\n\n" + "="*60)
    
    if questions:
        # Save to JSON
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(questions, f, ensure_ascii=False, indent=2)
        
        print(f"\n✅ {len(questions)} questions sauvegardées dans: {output_file}")
        
        # Show summary by level
        by_level = {}
        for q in questions:
            level = q['level']
            by_level[level] = by_level.get(level, 0) + 1
        
        print("\n📊 Résumé par niveau:")
        for level in ['CE1', 'CE2', 'CM1', 'CM2', '6ème', '5ème', '4ème', '3ème']:
            count = by_level.get(level, 0)
            if count > 0:
                print(f"  {level}: {count} questions")
        
        print(f"\n📝 Fichier généré: {output_file}")
        print("Vous pouvez ensuite valider ce fichier avant intégration")
    else:
        print("\n⚠️  Aucune question créée")

if __name__ == "__main__":
    main()
