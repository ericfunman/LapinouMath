#!/usr/bin/env python3
"""
Convert Kangourou JSON to TypeScript file
"""

import json
from pathlib import Path

# Load questions
with open('kangourou/questions_kangourou_style.json', 'r', encoding='utf-8') as f:
    questions = json.load(f)

# Create TypeScript file content
output = "// Authentic Kangourou contest questions\n"
output += "// Real questions extracted from official PDF sources\n\n"
output += "export const allKangourouQuestions = [\n"

for q in questions:
    # Escape special characters
    question_text = q['question'].replace('"', '\\"').replace('\n', '\\n')
    explanation = q.get('explanation', '').replace('"', '\\"').replace('\n', '\\n')
    
    # Normalize level names
    level = q['level']
    level_mapping = {'6e': '6ème', '5e': '5ème', '4e': '4ème', '3e': '3ème'}
    level = level_mapping.get(level, level)
    
    # Options
    options_list = []
    for opt in q['options']:
        escaped_opt = opt.replace('"', '\\"').replace('\n', '\\n')
        options_list.append(f'"{escaped_opt}"')
    options_str = ', '.join(options_list)
    
    output += "  {\n"
    output += f'    question: "{question_text}",\n'
    output += f'    options: [{options_str}],\n'
    output += f'    correctAnswer: {q["correctAnswer"]},\n'
    output += f'    explanation: "{explanation}",\n'
    output += f'    level: "{level}",\n'
    output += f'    difficulty: {q["difficulty"]}\n'
    output += "  },\n"

output += "];\n"

# Write file
output_path = Path('src/data/kangourouQuestions.ts')
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(output)

print(f"✅ Created {output_path} with {len(questions)} questions")
print(f"   CE1: {len([q for q in questions if q['level']=='CE1'])}")
print(f"   CE2: {len([q for q in questions if q['level']=='CE2'])}")
print(f"   CM1: {len([q for q in questions if q['level']=='CM1'])}")
print(f"   CM2: {len([q for q in questions if q['level']=='CM2'])}")
print(f"   6e: {len([q for q in questions if q['level']=='6e'])}")
print(f"   5e: {len([q for q in questions if q['level']=='5e'])}")
