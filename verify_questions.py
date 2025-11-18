#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Verification script for LapinouMath questions
Checks for:
1. Answer index validity (0-3)
2. Answer index matches option position
3. Mathematical correctness of answers
"""

import re
import sys
import io
from typing import List, Dict, Tuple

# Force UTF-8 output
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Read the TypeScript file
with open('src/data/questionsByLevel.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to extract questions
# Matches: { q: "...", opts: [...], ans: X, exp: "..." }
pattern = r'\{\s*q:\s*"([^"]+)",\s*opts:\s*\[([^\]]+)\],\s*ans:\s*(\d+),\s*exp:\s*"([^"]+)"\s*\}'

questions = re.findall(pattern, content)

errors: List[Dict] = []
warnings: List[Dict] = []
total_checked = 0

print(f"🔍 Vérification de {len(questions)} questions...\n")

for idx, (question_text, opts_str, ans_idx_str, explanation) in enumerate(questions):
    total_checked += 1
    ans_idx = int(ans_idx_str)
    
    # Extract options (remove quotes and clean)
    opts_pattern = r'"([^"]*)"'
    opts = re.findall(opts_pattern, opts_str)
    
    # Check 1: Answer index validity (0-3)
    if not (0 <= ans_idx < len(opts)):
        errors.append({
            'type': 'INDEX_OUT_OF_RANGE',
            'question': question_text[:50],
            'details': f'ans={ans_idx} but only {len(opts)} options available',
            'idx': idx
        })
    
    # Check 2: Consistency
    if len(opts) != 4:
        warnings.append({
            'type': 'WRONG_OPTION_COUNT',
            'question': question_text[:50],
            'details': f'Expected 4 options, got {len(opts)}: {opts}',
            'idx': idx
        })
    
    # Check 3: Mathematical correctness (simple heuristics)
    # Extract numbers from question
    numbers = re.findall(r'\d+', question_text)
    if len(numbers) >= 2 and len(opts) > ans_idx:
        correct_answer = opts[ans_idx]
        
        # Try simple operations
        try:
            a, b = int(numbers[0]), int(numbers[1])
            
            # Addition check
            if '+' in question_text or 'font' in question_text and '+ ' in question_text:
                expected = str(a + b)
                if expected != correct_answer and question_text.count('+') > 0:
                    # Try to parse the exact operation
                    add_match = re.search(r'(\d+)\s*\+\s*(\d+)', question_text)
                    if add_match:
                        x, y = int(add_match.group(1)), int(add_match.group(2))
                        if str(x + y) != correct_answer:
                            warnings.append({
                                'type': 'MATH_MISMATCH_ADDITION',
                                'question': question_text[:50],
                                'expected': str(x + y),
                                'got': correct_answer,
                                'explanation': explanation,
                                'idx': idx
                            })
            
            # Subtraction check
            if '-' in question_text:
                sub_match = re.search(r'(\d+)\s*-\s*(\d+)', question_text)
                if sub_match:
                    x, y = int(sub_match.group(1)), int(sub_match.group(2))
                    if str(x - y) != correct_answer:
                        warnings.append({
                            'type': 'MATH_MISMATCH_SUBTRACTION',
                            'question': question_text[:50],
                            'expected': str(x - y),
                            'got': correct_answer,
                            'explanation': explanation,
                            'idx': idx
                        })
        except:
            pass

print(f"✅ Total questions checked: {total_checked}")
print(f"❌ Errors found: {len(errors)}")
print(f"⚠️  Warnings: {len(warnings)}\n")

if errors:
    print("=" * 80)
    print("CRITICAL ERRORS:")
    print("=" * 80)
    for i, err in enumerate(errors[:20], 1):
        print(f"\n{i}. {err['type']}")
        print(f"   Question: {err['question']}")
        print(f"   Details: {err['details']}")
        if 'idx' in err:
            print(f"   Position: Question #{err['idx']}")

if warnings:
    print("\n" + "=" * 80)
    print(f"MATH WARNINGS (showing first 50):")
    print("=" * 80)
    for i, warn in enumerate(warnings[:50], 1):
        print(f"\n{i}. {warn['type']}")
        print(f"   Question: {warn['question']}")
        if 'expected' in warn:
            print(f"   Expected: {warn['expected']}, Got: {warn['got']}")
            print(f"   Explanation: {warn['explanation']}")

print("\n" + "=" * 80)
print("SUMMARY")
print("=" * 80)
print(f"Critical Errors: {len(errors)}")
print(f"Math Warnings: {len(warnings)}")
print(f"Total Checked: {total_checked}")

if len(errors) > 0:
    sys.exit(1)
