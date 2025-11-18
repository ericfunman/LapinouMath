#!/usr/bin/env python3
"""
Generate fix file for questions with answer index mismatches
"""

import re
from typing import List, Dict

# Read the TypeScript file
with open('src/data/questionsByLevel.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to extract questions
pattern = r'\{\s*q:\s*"([^"]+)",\s*opts:\s*\[([^\]]+)\],\s*ans:\s*(\d+),\s*exp:\s*"([^"]+)"\s*\}'

questions = re.findall(pattern, content)

# Track problems
problems: List[Dict] = []

for idx, (question_text, opts_str, ans_idx_str, explanation) in enumerate(questions):
    ans_idx = int(ans_idx_str)
    
    # Extract options
    opts_pattern = r'"([^"]*)"'
    opts = re.findall(opts_pattern, opts_str)
    
    if len(opts) != 4:
        continue
    
    # Check for math mismatches
    add_match = re.search(r'(\d+)\s*\+\s*(\d+)', question_text)
    if add_match:
        x, y = int(add_match.group(1)), int(add_match.group(2))
        expected = str(x + y)
        if ans_idx < len(opts) and opts[ans_idx] != expected:
            # Try to find which option is correct
            for i, opt in enumerate(opts):
                if opt == expected:
                    problems.append({
                        'type': 'ADDITION_ERROR',
                        'question': question_text,
                        'current_ans_idx': ans_idx,
                        'correct_ans_idx': i,
                        'expected': expected,
                        'current_wrong': opts[ans_idx],
                        'options': opts,
                    })
                    break
    
    # Check for subtraction mismatches
    sub_match = re.search(r'(\d+)\s*-\s*(\d+)', question_text)
    if sub_match:
        x, y = int(sub_match.group(1)), int(sub_match.group(2))
        expected = str(x - y)
        if ans_idx < len(opts) and opts[ans_idx] != expected:
            # Try to find which option is correct
            for i, opt in enumerate(opts):
                if opt == expected:
                    problems.append({
                        'type': 'SUBTRACTION_ERROR',
                        'question': question_text,
                        'current_ans_idx': ans_idx,
                        'correct_ans_idx': i,
                        'expected': expected,
                        'current_wrong': opts[ans_idx],
                        'options': opts,
                    })
                    break

print(f"Found {len(problems)} problems to fix:\n")

# Group by type
additions = [p for p in problems if p['type'] == 'ADDITION_ERROR']
subtractions = [p for p in problems if p['type'] == 'SUBTRACTION_ERROR']

print(f"Additions with wrong answers: {len(additions)}")
print(f"Subtractions with wrong answers: {len(subtractions)}")
print(f"Total: {len(problems)}\n")

# Analyze pattern
if problems:
    print("=" * 80)
    print("SAMPLE OF PROBLEMS (first 10):")
    print("=" * 80)
    for i, p in enumerate(problems[:10], 1):
        print(f"\n{i}. {p['type']}")
        print(f"   Question: {p['question']}")
        print(f"   Options: {p['options']}")
        print(f"   Current (wrong): ans={p['current_ans_idx']} -> '{p['current_wrong']}'")
        print(f"   Correct: ans={p['correct_ans_idx']} -> '{p['expected']}'")

# Save to file for inspection
with open('problems_to_fix.txt', 'w', encoding='utf-8') as f:
    f.write(f"Total problems: {len(problems)}\n")
    f.write(f"Additions: {len(additions)}\n")
    f.write(f"Subtractions: {len(subtractions)}\n\n")
    
    for p in problems:
        f.write(f"Q: {p['question']}\n")
        f.write(f"   Current ans={p['current_ans_idx']} ({p['current_wrong']})\n")
        f.write(f"   Should be ans={p['correct_ans_idx']} ({p['expected']})\n")
        f.write(f"   Options: {p['options']}\n\n")

print("\n✅ Problems saved to problems_to_fix.txt")
