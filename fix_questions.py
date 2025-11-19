#!/usr/bin/env python3
"""
Auto-fix questions with wrong answer indices
"""

import re

# Read the TypeScript file
with open('src/data/questionsByLevel.ts', 'r', encoding='utf-8') as f:
    original_content = f.read()

content = original_content

# Pattern to match questions
pattern = r'\{\s*q:\s*"([^"]+)",\s*opts:\s*\[([^\]]+)\],\s*ans:\s*(\d+),\s*exp:\s*"([^"]+)"\s*\}'

def extract_options(opts_str):
    """Extract options from string"""
    opts_pattern = r'"([^"]*)"'
    return re.findall(opts_pattern, opts_str)

def find_correct_answer_index(opts, expected):
    """Find the index of the correct answer"""
    for i, opt in enumerate(opts):
        if opt == expected:
            return i
    return -1

def format_question(q_text, opts, ans_idx, exp):
    """Format question back to string"""
    opts_formatted = ', '.join(f'"{o}"' for o in opts)
    return f'{{ q: "{q_text}", opts: [{opts_formatted}], ans: {ans_idx}, exp: "{exp}" }}'

def check_and_fix_math(q_text, opts, ans_idx, exp):
    """Check and fix math operations"""
    # Check for addition
    add_match = re.search(r'(\d+)\s*\+\s*(\d+)', q_text)
    if add_match:
        x, y = int(add_match.group(1)), int(add_match.group(2))
        expected = str(x + y)
        if ans_idx < len(opts) and opts[ans_idx] != expected:
            correct_idx = find_correct_answer_index(opts, expected)
            if correct_idx != -1:
                return format_question(q_text, opts, correct_idx, exp)

    # Check for subtraction
    sub_match = re.search(r'(\d+)\s*-\s*(\d+)', q_text)
    if sub_match:
        x, y = int(sub_match.group(1)), int(sub_match.group(2))
        expected = str(x - y)
        if ans_idx < len(opts) and opts[ans_idx] != expected:
            correct_idx = find_correct_answer_index(opts, expected)
            if correct_idx != -1:
                return format_question(q_text, opts, correct_idx, exp)

    return None

def check_and_fix_line(match):
    """Check if this question has math errors and fix them"""
    q_text = match.group(1)
    opts_str = match.group(2)
    ans_idx_str = match.group(3)
    exp = match.group(4)

    ans_idx = int(ans_idx_str)
    opts = extract_options(opts_str)

    if len(opts) != 4:
        return match.group(0)  # Don't change

    fixed = check_and_fix_math(q_text, opts, ans_idx, exp)
    return fixed if fixed else match.group(0)

# Apply fixes
fixed_content = re.sub(pattern, check_and_fix_line, content)

# Count changes
original_lines = original_content.split('\n')
fixed_lines = fixed_content.split('\n')
changes = sum(1 for a, b in zip(original_lines, fixed_lines) if a != b)

print(f"✅ Fixed {changes} lines")

# Write back
with open('src/data/questionsByLevel.ts', 'w', encoding='utf-8') as f:
    f.write(fixed_content)

print("✅ File updated: src/data/questionsByLevel.ts")
