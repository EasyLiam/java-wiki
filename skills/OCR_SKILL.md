---
name: ocr-skill
description: "Extract text from images using Tesseract OCR. Supports multiple languages including English and Chinese."
---

# OCR Text Recognition

Extract text from images using Tesseract OCR.

## Requirements

- Tesseract OCR installed: `sudo apt-get install tesseract-ocr`
- Python libraries: `pip3 install pytesseract pillow`

## Commands

Run from the OpenClaw workspace:

```bash
# Extract text from image (JSON output)
python3 {baseDir}/scripts/ocr_skill.py --image /path/to/image.png

# Extract text with Chinese language support
python3 {baseDir}/scripts/ocr_skill.py --image /path/to/image.png --lang chi_sim

# Extract text in plain text format
python3 {baseDir}/scripts/ocr_skill.py --image /path/to/image.png --format text

# Extract text with Markdown formatting
python3 {baseDir}/scripts/ocr_skill.py --image /path/to/image.png --format md
```

## Output

### json (default)
- JSON: `{success, image_path, image_size, text, word_count, language}`

### text
- Plain text output with extracted text only

### md
- Formatted Markdown output with image metadata and extracted text

## Notes

- Supported languages: eng (English), chi_sim (Simplified Chinese), chi_tra (Traditional Chinese), etc.
- Combine languages: `--lang eng+chi_sim` for bilingual text
- Works best with clear, high-contrast images
- For best results, ensure the image is well-lit and text is clearly visible
