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

def extract_kangourou(pdf_path: str, level: str, year: int) -> List[Dict]:
    """Extract Kangourou questions from PDF"""
    doc = fitz.open(pdf_path)
    questions = []
    current_q = {
        'question': '',
        'options': [],
        'correctAnswer': None,
        'explanation': '',
        'level': level,
        'difficulty': 1,
        'year': year
    }
    
    q_num = 0
    in_question = False
    in_options = False

    for page_num, page in enumerate(doc):
        text = page.get_text()
        lines = [line.strip() for line in text.split('\n') if line.strip()]

        for idx, line in enumerate(lines):
            # Détecte un numéro de question (1., 2., etc.)
            if re.match(r'^(\d+)\.\s+', line):
                # Sauvegarde la question précédente
                if current_q['question'] and len(current_q['options']) >= 4:
                    # Estimé la difficulté selon le numéro
                    # Kangourou: 1-8=facile(1-2), 9-16=moyen(2-3), 17-24=difficile(3-4)
                    current_q['difficulty'] = min(4, max(1, (q_num // 8) + 1))
                    questions.append(current_q)
                
                q_num += 1
                question_text = re.sub(r'^\d+\.\s+', '', line)
                current_q = {
                    'question': question_text,
                    'options': [],
                    'correctAnswer': None,
                    'explanation': '',
                    'level': level,
                    'difficulty': 1,
                    'year': year
                }
                in_question = True
                in_options = False
            
            # Détecte les options (A) B) C) D) ou A. B. C. D.)
            elif in_question and re.match(r'^[A-E]\)\s+(.+)', line):
                option_match = re.match(r'^[A-E]\)\s+(.+)', line)
                if option_match:
                    current_q['options'].append(option_match.group(1))
                in_options = True
            
            # Fin des options si on voit une nouvelle ligne qui n'est pas une option
            elif in_options and not re.match(r'^[A-E]\)', line) and line and not line.startswith('('):
                in_options = False
                # La ligne suivante peut être l'explication ou la prochaine question
                if not re.match(r'^\d+\.\s+', line) and not re.match(r'Réponse|Answer', line, re.IGNORECASE):
                    current_q['explanation'] = line[:200]  # Limiter à 200 chars

    # Ajoute la dernière question
    if current_q['question'] and len(current_q['options']) >= 4:
        current_q['difficulty'] = min(4, max(1, (q_num // 8) + 1))
        questions.append(current_q)
    
    doc.close()
    return questions

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
        if path.exists():
            print(f"\n📖 Traitement: {filename} ({level}, {year})")
            try:
                qs = extract_kangourou(str(path), level, year)
                all_questions.extend(qs)
                print(f"   ✅ Extrait {len(qs)} questions")
                
                # Affiche les premières questions
                if qs:
                    print("   Exemple:")
                    q = qs[0]
                    print(f"   Q: {q['question'][:80]}...")
                    print(f"   Options: {len(q['options'])}")
                    print(f"   Difficulté: {q['difficulty']}")
            except Exception as e:
                print(f"   ❌ Erreur: {e}")
        else:
            print(f"\n⚠️  Fichier non trouvé: {path}")
    
    if all_questions:
        print("\n📊 RÉSUMÉ TOTAL")
        print("="*60)
        print(f"Total questions extraites: {len(all_questions)}")
        
        # Comptage par niveau
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
        
        # Sauvegarde JSON
        json_file = Path("kangourou_extracted.json")
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(all_questions, f, ensure_ascii=False, indent=2)
        print(f"\n📁 Fichier JSON sauvegardé: {json_file}")
        
        # Sauvegarde CSV pour Excel
        csv_file = Path("kangourou_extracted.csv")
        df = pd.DataFrame(all_questions)
        df.to_csv(csv_file, index=False, encoding='utf-8')
        print(f"📁 Fichier CSV sauvegardé: {csv_file}")
        
        print("\n✅ Extraction terminée!")
        print("Vous pouvez valider les questions et utiliser le JSON pour l'intégration")
    else:
        print("\n❌ Aucune question extraite")

if __name__ == "__main__":
    main()
