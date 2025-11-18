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

def check_and_fix_line(match):
    """Check if this question has math errors and fix them"""
    q_text = match.group(1)
    opts_str = match.group(2)
    ans_idx_str = match.group(3)
    exp = match.group(4)
    
    ans_idx = int(ans_idx_str)
    
    # Extract options
    opts_pattern = r'"([^"]*)"'
    opts = re.findall(opts_pattern, opts_str)
    
    if len(opts) != 4:
        return match.group(0)  # Don't change
    
    # Check for addition
    add_match = re.search(r'(\d+)\s*\+\s*(\d+)', q_text)
    if add_match:
        x, y = int(add_match.group(1)), int(add_match.group(2))
        expected = str(x + y)
        if ans_idx < len(opts) and opts[ans_idx] != expected:
            # Find correct index
            for i, opt in enumerate(opts):
                if opt == expected:
                    # Reconstruct with correct answer
                    opts_formatted = ', '.join(f'"{o}"' for o in opts)
                    return f'{{ q: "{q_text}", opts: [{opts_formatted}], ans: {i}, exp: "{exp}" }}'
    
    # Check for subtraction
    sub_match = re.search(r'(\d+)\s*-\s*(\d+)', q_text)
    if sub_match:
        x, y = int(sub_match.group(1)), int(sub_match.group(2))
        expected = str(x - y)
        if ans_idx < len(opts) and opts[ans_idx] != expected:
            # Find correct index
            for i, opt in enumerate(opts):
                if opt == expected:
                    # Reconstruct with correct answer
                    opts_formatted = ', '.join(f'"{o}"' for o in opts)
                    return f'{{ q: "{q_text}", opts: [{opts_formatted}], ans: {i}, exp: "{exp}" }}'
    
    return match.group(0)  # Don't change

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
