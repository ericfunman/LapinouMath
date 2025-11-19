#!/usr/bin/env python3
import json

with open('kangourou/questions_kangourou_style.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

levels = {}
for q in data:
    level = q.get('level', 'Unknown')
    if level not in levels:
        levels[level] = 0
    levels[level] += 1

print("Kangourou questions by level:")
for level in sorted(levels.keys()):
    print(f"  {level}: {levels[level]} questions")
