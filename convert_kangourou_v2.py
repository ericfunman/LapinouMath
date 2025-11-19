#!/usr/bin/env python3
"""
Convert Kangourou JSON to TypeScript file with proper level mapping
"""

import json
from pathlib import Path

# Load questions
print("Loading questions...")
with open('kangourou/questions_kangourou_style.json', 'r', encoding='utf-8') as f:
    questions = json.load(f)

print(f"Loaded {len(questions)} questions")

# Create TypeScript file content
output = "// Authentic Kangourou contest questions\n"
output += "// Real questions extracted from official PDF sources\n\n"
output += "export const allKangourouQuestions = [\n"

# Level mapping
level_mapping = {'6e': '6ème', '5e': '5ème', '4e': '4ème', '3e': '3ème', 'CE1': 'CE1', 'CE2': 'CE2', 'CM1': 'CM1', 'CM2': 'CM2'}

for q in questions:
    # Escape special characters
    question_text = q['question'].replace('"', '\\"').replace('\n', '\\n')
    explanation = q.get('explanation', '').replace('"', '\\"').replace('\n', '\\n')
    
    # Normalize level names
    level = q['level']
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
print(f"Writing to {output_path}...")
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(output)

# Verify
by_level = {}
for q in questions:
    level = level_mapping.get(q['level'], q['level'])
    by_level[level] = by_level.get(level, 0) + 1

print(f"✅ Created {output_path} with {len(questions)} questions")
print(f"Breakdown by level:")
for level in sorted(by_level.keys()):
    print(f"  {level}: {by_level[level]}")
