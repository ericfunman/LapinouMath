#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Advanced verification script for LapinouMath questions
Handles:
1. Simple arithmetic (2 numbers)
2. Multiple operations (3+ numbers)
3. Negative numbers
4. Fractions and decimals (basic detection)
"""

import re
import sys
import io
from typing import List, Dict, Optional, Tuple

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
total_arithmetic = 0

print("Verification de {} questions...\n".format(len(questions)))

def evaluate_math_expression(expr_str: str) -> Optional[str]:
    """Try to safely evaluate a math expression and return the result"""
    try:
        # Remove spaces
        expr_str = expr_str.replace(' ', '')
        
        # Handle negative numbers: -5 + 8 -> (-5) + 8
        expr_str = re.sub(r'(-\d+)', r'(\1)', expr_str)
        
        # Safely evaluate
        result = eval(expr_str)
        return str(result)
    except Exception as e:
        return None

def extract_and_evaluate(question_text: str) -> Optional[str]:
    """Extract a math expression from question text and evaluate it"""
    
    # Pattern 1: Simple addition/subtraction: "X + Y" or "X - Y"
    simple_match = re.search(r'(-?\d+(?:\s*[+\-]\s*\d+)+)', question_text)
    if simple_match:
        expr = simple_match.group(1)
        result = evaluate_math_expression(expr)
        if result:
            return result
    
    # Pattern 2: Handle fractions and decimals - skip
    if '/' in question_text or ',' in question_text:
        return None
    
    return None

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
    if '/' in question_text or (',' in question_text and opts and ',' not in opts[ans_idx]):
        skipped += 1
        continue
    
    correct_answer = opts[ans_idx]
    
    # Skip if correct answer contains fractions or decimals (but allow if all options have them)
    if '/' in correct_answer:
        skipped += 1
        continue
    
    # Try to evaluate the expression
    expected = extract_and_evaluate(question_text)
    
    if expected:
        total_arithmetic += 1
        
        # For decimal results, convert to int if applicable
        try:
            # Try to match: remove trailing .0
            if '.' in expected and expected.endswith('.0'):
                expected_clean = expected[:-2]
            else:
                expected_clean = expected
            
            if expected_clean != correct_answer:
                warnings.append({
                    'type': 'MATH_MISMATCH',
                    'question': question_text[:60],
                    'expected': expected_clean,
                    'got': correct_answer,
                    'explanation': explanation,
                    'ans_idx': ans_idx,
                    'options': opts,
                })
        except:
            pass

print("=" * 80)
print("VERIFICATION RESULTS")
print("=" * 80)
print("Total questions: {}".format(total_checked))
print("Arithmetic checked: {}".format(total_arithmetic))
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
    print("\nMATH WARNINGS:")
    print("=" * 80)
    for i, warn in enumerate(warnings[:20], 1):
        print("\n{}. {}".format(i, warn['type']))
        print("   Question: {}".format(warn['question']))
        print("   Expected: {}, Got: {}".format(warn['expected'], warn['got']))
        print("   Explanation: {}".format(warn['explanation']))
        print("   Options: {}".format(warn['options']))
        print("   Selected ans_idx: {}".format(warn['ans_idx']))

print("\n" + "=" * 80)
print("SUMMARY")
print("=" * 80)
if len(errors) == 0 and len(warnings) == 0:
    print("SUCCESS! All arithmetic questions are correct.")
else:
    print("Errors: {}".format(len(errors)))
    print("Warnings: {}".format(len(warnings)))
    if warnings:
        print("\nWarnings Details:")
        for warn in warnings:
            print("  - {} (expected {}, got {})".format(warn['question'], warn['expected'], warn['got']))
