#!/usr/bin/env python3
"""
Detailed PDF analysis
"""

import fitz
import re
from pathlib import Path

pdf_path = Path("kangourou/kangourou2020e.pdf")
doc = fitz.open(str(pdf_path))

# Get first page content
page = doc[1]  # Page 2
text = page.get_text()

print("PAGE 2 RAW TEXT (first 3000 chars):")
print(repr(text[:3000]))

print("\n\nPATTERN ANALYSIS:")

# Try to find question numbers
patterns = [
    (r'^\d+', 'Start with number'),
    (r'\n\d+\)', 'Newline + number + paren'),
    (r'Luc colorie', 'Literal text search'),
]

for pattern, desc in patterns:
    matches = re.findall(pattern, text, re.MULTILINE)
    print(f"\n{desc}:")
    print(f"  Pattern: {pattern}")
    print(f"  Matches: {matches[:5]}")

doc.close()
