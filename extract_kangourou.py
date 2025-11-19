#!/usr/bin/env python3
"""
Script to extract Kangourou questions from PDF files and convert to JSON format
"""

import PyPDF2
import json
import re
import os
from pathlib import Path

def extract_text_from_pdf(pdf_path):
    """Extract text from a PDF file"""
    try:
        text = ""
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            for page in pdf_reader.pages:
                text += page.extract_text()
        return text
    except Exception as e:
        print(f"Error reading {pdf_path}: {e}")
        return ""

def map_level_from_subject(subject_code):
    """Map subject code to grade levels"""
    mapping = {
        'E': ['CE2', 'CM1', 'CM2'],
        'B': ['6ème', '5ème'],
        'C': ['4ème', '3ème']
    }
    return mapping.get(subject_code, [])

def parse_kangourou_questions(text, subject_code):
    """Parse questions from extracted text"""
    questions = []
    
    # Split by question numbers (1., 2., 3., etc.)
    # Kangourou format: number followed by question text
    
    # Pattern to find questions
    question_pattern = r'(\d+)\.\s*(.+?)(?=\d+\.|$)'
    matches = re.finditer(question_pattern, text, re.DOTALL)
    
    for match in matches:
        question_num = match.group(1)
        question_text = match.group(2).strip()
        
        # Try to extract options and answer
        # Kangourou typically uses A) B) C) D) format
        option_pattern = r'[A-D]\)\s*([^\n]+)'
        options = re.findall(option_pattern, question_text)
        
        if len(options) >= 4:
            # Find answer (usually marked with an asterisk or in corrections)
            # This is a simplified extraction
            questions.append({
                'number': question_num,
                'text': question_text,
                'options': options[:4],
                'subject': subject_code
            })
    
    return questions

def main():
    """Main function to process all PDFs"""
    pdf_dir = Path("c:/Users/lapin/OneDrive/Documents/Developpement/LapinouMath/kangourou")
    
    if not pdf_dir.exists():
        print(f"Directory not found: {pdf_dir}")
        return
    
    all_questions = {
        'CE2': [],
        'CM1': [],
        'CM2': [],
        '6ème': [],
        '5ème': [],
        '4ème': [],
        '3ème': []
    }
    
    # Process each PDF
    for pdf_file in pdf_dir.glob("kangourou2020*.pdf"):
        # Skip correction files for now (they have 'corr' in the name)
        if 'corr' in pdf_file.name:
            continue
            
        print(f"\nProcessing: {pdf_file.name}")
        
        # Extract subject code (E, B, or C)
        subject_match = re.search(r'kangourou2020([ebc])', pdf_file.name.lower())
        if not subject_match:
            continue
        
        subject_code = subject_match.group(1).upper()
        print(f"Subject code: {subject_code}")
        
        # Extract text from PDF
        text = extract_text_from_pdf(str(pdf_file))
        if not text:
            print(f"Could not extract text from {pdf_file.name}")
            continue
        
        # Parse questions
        questions = parse_kangourou_questions(text, subject_code)
        print(f"Found {len(questions)} questions")
        
        # For now, print sample
        if questions:
            print(f"Sample question: {questions[0]}")
    
    print("\n✅ PDF extraction complete!")
    print("Note: Manual review needed to match questions with correct answers")
    print("Please extract the text manually or use an OCR tool for better results")

if __name__ == "__main__":
    main()
