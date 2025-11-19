#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Convert Kangourou questions from JSON format to TypeScript format
Fix the field names to match the expected format: q, opts, ans, exp
"""

import json

# Read the kangourou JSON
with open('kangourou/questions_kangourou_style.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Convert to TypeScript format
ts_content = """// Authentic Kangourou contest questions
// Real questions extracted from official PDF sources
// Format: { q, opts, ans, exp, level, difficulty }

export const allKangourouQuestions = [
"""

for q in data:
    level = q.get('level', 'Unknown')
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

print(f"✅ Fixed kangourouQuestions.ts!")
print(f"Total questions: {len(data)}")
print("Format conversion: question→q, options→opts, correctAnswer→ans, explanation→exp")
