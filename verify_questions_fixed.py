#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Verification script for LapinouMath questions
Checks for:
1. Answer index validity (0-3)
2. Mathematical correctness for SIMPLE ARITHMETIC ONLY (no fractions/decimals)
"""

import re
import sys
import io
from typing import List, Dict

# Force UTF-8 output
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Read the TypeScript file
with open('src/data/questionsByLevel.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to extract questions
pattern = r'\{\s*q:\s*"([^"]+)",\s*opts:\s*\[([^\]]+)\],\s*ans:\s*(\d+),\s*exp:\s*"([^"]+)"\s*\}'

questions = re.findall(pattern, content)

errors: List[Dict] = []
warnings: List[Dict] = []
skipped = 0
total_checked = 0
total_simple_arithmetic = 0

print("Verification de {} questions...\n".format(len(questions)))

for idx, (question_text, opts_str, ans_idx_str, explanation) in enumerate(questions):
    total_checked += 1
    ans_idx = int(ans_idx_str)
    
    # Extract options
    opts_pattern = r'"([^"]*)"'
    opts = re.findall(opts_pattern, opts_str)
    
    # Check: Answer index validity
    if not (0 <= ans_idx < len(opts)):
        errors.append({
            'type': 'INDEX_OUT_OF_RANGE',
            'question': question_text[:50],
            'details': 'ans={} but only {} options available'.format(ans_idx, len(opts)),
        })
        continue
    
    # Skip if contains fractions or decimals
    if '/' in question_text or ',' in question_text:
        skipped += 1
        continue
    
    correct_answer = opts[ans_idx]
    
    # Skip if correct answer contains fractions or decimals
    if '/' in correct_answer or ',' in correct_answer:
        skipped += 1
        continue
    
    # Check Addition
    add_match = re.search(r'(\d+)\s*\+\s*(\d+)', question_text)
    if add_match:
        x, y = int(add_match.group(1)), int(add_match.group(2))
        expected = str(x + y)
        total_simple_arithmetic += 1
        if expected != correct_answer:
            warnings.append({
                'type': 'MATH_MISMATCH_ADDITION',
                'question': question_text[:50],
                'expected': expected,
                'got': correct_answer,
                'explanation': explanation,
            })
    
    # Check Subtraction
    sub_match = re.search(r'(\d+)\s*-\s*(\d+)', question_text)
    if sub_match:
        x, y = int(sub_match.group(1)), int(sub_match.group(2))
        expected = str(x - y)
        total_simple_arithmetic += 1
        if expected != correct_answer:
            warnings.append({
                'type': 'MATH_MISMATCH_SUBTRACTION',
                'question': question_text[:50],
                'expected': expected,
                'got': correct_answer,
                'explanation': explanation,
            })

print("=" * 80)
print("VERIFICATION RESULTS")
print("=" * 80)
print("Total questions: {}".format(total_checked))
print("Simple arithmetic checked: {}".format(total_simple_arithmetic))
print("Skipped (fractions/decimals): {}".format(skipped))
print("Errors: {}".format(len(errors)))
print("Warnings: {}".format(len(warnings)))
print()

if errors:
    print("CRITICAL ERRORS:")
    print("=" * 80)
    for i, err in enumerate(errors[:20], 1):
        print("\n{}. {}".format(i, err['type']))
        print("   Question: {}".format(err['question']))
        print("   Details: {}".format(err['details']))

if warnings:
    print("\nMATH WARNINGS (Simple Arithmetic):")
    print("=" * 80)
    for i, warn in enumerate(warnings[:20], 1):
        print("\n{}. {}".format(i, warn['type']))
        print("   Question: {}".format(warn['question']))
        print("   Expected: {}, Got: {}".format(warn['expected'], warn['got']))
        print("   Explanation: {}".format(warn['explanation']))

print("\n" + "=" * 80)
print("SUMMARY")
print("=" * 80)
if len(errors) == 0 and len(warnings) == 0:
    print("SUCCESS! All simple arithmetic questions are correct.")
else:
    print("Errors: {}".format(len(errors)))
    print("Warnings: {}".format(len(warnings)))
