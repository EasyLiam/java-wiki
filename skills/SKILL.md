---
name: tavily-search
description: "Web search via Tavily API (alternative to Brave). Use when the user asks to search the web / look up sources / find links and Brave web_search is unavailable or undesired. Returns a small set of relevant results (title, url, snippet) and can optionally include short answer summaries."
---

# Tavily Search

Use the bundled script to search the web with Tavily.

## Requirements

- Provide API key via either:
  - environment variable: `TAVILY_API_KEY`, or
  - `~/.openclaw/.env` line: `TAVILY_API_KEY=...`

## Commands

Run from the OpenClaw workspace:

```bash
# raw JSON (default)
python3 {baseDir}/scripts/tavily_search.py --query "..." --max-results 5

# include short answer (if available)
python3 {baseDir}/scripts/tavily_search.py --query "..." --max-results 5 --include-answer

# stable schema (closer to web_search): {query, results:[{title,url,snippet}], answer?}
python3 {baseDir}/scripts/tavily_search.py --query "..." --max-results 5 --format brave

# human-readable Markdown list
python3 {baseDir}/scripts/tavily_search.py --query "..." --max-results 5 --format md
```

## Output

### raw (default)
- JSON: `query`, optional `answer`, `results: [{title,url,content}]`

### brave
- JSON: `query`, optional `answer`, `results: [{title,url,snippet}]`

### md
- A compact Markdown list with title/url/snippet.

## Notes

- Keep `max-results` small by default (3–5) to reduce token/reading load.
- Prefer returning URLs + snippets; fetch full pages only when needed.
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
