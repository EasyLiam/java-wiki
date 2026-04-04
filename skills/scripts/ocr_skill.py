#!/usr/bin/env python3
"""
OCR Skill for OpenClaw
Extract text from images using Tesseract OCR
"""

import argparse
import json
import sys
from pathlib import Path

try:
    from PIL import Image
    import pytesseract
except ImportError:
    print("Error: Required libraries not installed. Run: pip3 install pytesseract pillow", file=sys.stderr)
    sys.exit(1)


def extract_text_from_image(image_path: str, lang: str = 'eng+chi_sim') -> dict:
    """
    Extract text from an image using OCR
    
    Args:
        image_path: Path to the image file
        lang: Language code(s) for OCR (default: eng+chi_sim for English and Chinese)
    
    Returns:
        Dictionary with extracted text and metadata
    """
    try:
        # Open image
        img = Image.open(image_path)
        
        # Get image dimensions
        width, height = img.size
        
        # Perform OCR
        text = pytesseract.image_to_string(img, lang=lang)
        
        # Get detailed OCR data
        data = pytesseract.image_to_data(img, lang=lang, output_type=pytesseract.Output.DICT)
        
        # Count detected words
        num_words = len([w for w in data['text'] if w.strip()])
        
        result = {
            'success': True,
            'image_path': str(image_path),
            'image_size': {'width': width, 'height': height},
            'text': text.strip(),
            'word_count': num_words,
            'language': lang
        }
        
        return result
        
    except Exception as e:
        return {
            'success': False,
            'error': str(e),
            'image_path': str(image_path)
        }


def main():
    parser = argparse.ArgumentParser(description='Extract text from images using OCR')
    parser.add_argument('--image', '-i', required=True, help='Path to the image file')
    parser.add_argument('--lang', '-l', default='eng', help='Language code (default: eng)')
    parser.add_argument('--format', '-f', choices=['json', 'text', 'md'], default='json',
                       help='Output format (default: json)')
    
    args = parser.parse_args()
    
    # Check if file exists
    if not Path(args.image).exists():
        print(json.dumps({'success': False, 'error': f'File not found: {args.image}'}))
        sys.exit(1)
    
    # Perform OCR
    result = extract_text_from_image(args.image, args.lang)
    
    # Output results
    if args.format == 'json':
        print(json.dumps(result, indent=2, ensure_ascii=False))
    elif args.format == 'text':
        if result['success']:
            print(result['text'])
        else:
            print(f"Error: {result['error']}", file=sys.stderr)
            sys.exit(1)
    elif args.format == 'md':
        if result['success']:
            print(f"## OCR Results\n")
            print(f"**Image**: `{result['image_path']}`\n")
            print(f"**Size**: {result['image_size']['width']}x{result['image_size']['height']} pixels\n")
            print(f"**Words**: {result['word_count']}\n")
            print(f"**Language**: {result['language']}\n")
            print(f"### Extracted Text\n")
            print(f"```\n{result['text']}\n```")
        else:
            print(f"**Error**: {result['error']}", file=sys.stderr)
            sys.exit(1)


if __name__ == '__main__':
    main()
