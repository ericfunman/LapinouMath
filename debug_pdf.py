#!/usr/bin/env python3
"""
Debug script to inspect PDF content structure
"""

import fitz
from pathlib import Path

pdf_dir = Path("kangourou")
pdf_files = [
    'kangourou2020e.pdf',
    'kangourou2020b.pdf',
]

for pdf_file in pdf_files:
    path = pdf_dir / pdf_file
    if path.exists():
        print(f"\n{'='*70}")
        print(f"INSPECTING: {pdf_file}")
        print(f"{'='*70}")
        
        doc = fitz.open(str(path))
        print(f"Total pages: {len(doc)}")
        
        # Inspect first 2 pages
        for page_num in range(min(2, len(doc))):
            print(f"\n--- PAGE {page_num + 1} ---")
            page = doc[page_num]
            text = page.get_text()
            
            # Show first 2000 characters
            print(text[:2000])
            print("\n[...truncated...]")
        
        doc.close()
    else:
        print(f"❌ Not found: {path}")
