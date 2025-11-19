#!/usr/bin/env python3
"""
Fix the 15 remaining questions with wrong answers
"""

import re

# Questions to fix with their corrections
fixes = [
    ("278 + 145", ["420", "422", "424", "426"], 423, "Quel est le résultat de 278 + 145 ?"),
    ("198 + 245", ["440", "442", "444", "446"], 443, "Quel est le résultat de 198 + 245 ?"),
    ("358 - 167", ["188", "190", "192", "194"], 191, "Quel est le résultat de 358 - 167 ?"),
    ("467 - 234", ["230", "232", "234", "236"], 233, "Quel est le résultat de 467 - 234 ?"),
    ("267 + 178", ["442", "444", "446", "448"], 445, "Quel est le résultat de 267 + 178 ?"),
    ("389 - 178", ["208", "210", "212", "214"], 211, "Quel est le résultat de 389 - 178 ?"),
    ("267 + 198", ["462", "464", "466", "468"], 465, "Quel est le résultat de 267 + 198 ?"),
]

# Read file
with open('src/data/questionsByLevel.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# For each fix, find the question and update it
for operation, opts, expected, question_text in fixes:
    # Find correct index
    try:
        correct_idx = opts.index(str(expected))
    except ValueError:
        print(f"ERROR: {expected} not in options {opts}")
        continue
    
    # Build the regex to find this question
    opts_str = ', '.join(f'"{o}"' for o in opts)
    pattern = r'\{\s*q:\s*"' + re.escape(question_text) + r'",\s*opts:\s*\[' + re.escape(opts_str) + r'\],\s*ans:\s*\d+,\s*exp:\s*"' + re.escape(operation) + r'[^"]*"\s*\}'
    
    replacement = f'{{ q: "{question_text}", opts: [{opts_str}], ans: {correct_idx}, exp: "{operation} = {expected}" }}'
    
    content = re.sub(pattern, replacement, content)
    print(f"Fixed: {question_text} -> ans={correct_idx}")

# Write back
with open('src/data/questionsByLevel.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("\nDone!")
