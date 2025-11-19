#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Convert Kangourou questions from JSON format to TypeScript format
Fix the level names: 4e → 4ème, 5e → 5ème, 6e → 6ème, etc.
"""

import json

# Read the kangourou JSON
with open('kangourou/questions_kangourou_style.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Mapping for level conversion
level_map = {
    'CE1': 'CE1',
    'CE2': 'CE2',
    'CM1': 'CM1',
    'CM2': 'CM2',
    '6e': '6ème',
    '5e': '5ème',
    '4e': '4ème',
}

# Convert to TypeScript format
ts_content = """// Authentic Kangourou contest questions
// Real questions extracted from official PDF sources
// Format: { q, opts, ans, exp, level, difficulty }

export const allKangourouQuestions = [
"""

for q in data:
    level = q.get('level', 'Unknown')
    # Convert level name if needed
    level = level_map.get(level, level)
    
    question = q.get('question', '').replace('"', '\\"')
    options = q.get('options', [])
    correct_answer = q.get('correctAnswer', 0)
    explanation = q.get('explanation', '').replace('"', '\\"')
    difficulty = q.get('difficulty', 1)
    
    # Build options array as TypeScript string
    opts_str = ', '.join([f'"{opt}"' for opt in options])
    
    ts_content += f"""  {{
    q: "{question}",
    opts: [{opts_str}],
    ans: {correct_answer},
    exp: "{explanation}",
    level: "{level}",
    difficulty: {difficulty}
  }},
"""

ts_content += """];
"""

# Write the corrected file
with open('src/data/kangourouQuestions.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print("✅ Fixed kangourouQuestions.ts!")
print(f"Total questions: {len(data)}")
print("Level conversion: 4e→4ème, 5e→5ème, 6e→6ème, etc.")
