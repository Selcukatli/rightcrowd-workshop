# PDF to Markdown Converter

Converts PDF files to markdown with AI-filtered image extraction. Uses Gemini Flash via OpenRouter to classify images and keep only meaningful content (screenshots, diagrams, charts) while filtering out decorative elements (backgrounds, icons, gradients).

## Requirements

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install pymupdf openai
```

## Usage

```bash
source .venv/bin/activate
export OPENROUTER_API_KEY="your-key-here"
python3 scripts/pdf_to_markdown.py path/to/presentation.pdf
```

## Output Structure

```
presentations/
└── your-presentation-name/
    ├── source.pdf                    # Original PDF copy
    ├── your-presentation-name.md     # Extracted markdown
    └── resources/                    # Meaningful images only
        ├── slide_1_img_1.jpeg
        └── ...
```

## How It Works

1. **Extract text** - Pulls text from each PDF page using PyMuPDF
2. **Collect images** - Gathers all unique images (deduplicated by xref)
3. **Auto-filter tiny images** - Skips images < 30x30px (bullets, dots)
4. **AI classification** - Sends remaining images to Gemini Flash in parallel batches
5. **Generate markdown** - Creates markdown file with relative image paths to `resources/`
6. **Copy source** - Keeps original PDF as `source.pdf`

## AI Classification

Each image is classified with a simple prompt:

> "Is this image meaningful slide content (screenshot, diagram, chart, photo, illustration) or just decoration (background, gradient, icon, bullet point, border, template element)?"

Response: `CONTENT` or `DECORATION`

## Performance

- Processes 275 images in ~30 seconds (20 parallel requests)
- Typical reduction: 355 images → 24 meaningful images (93% filtered)
- Cost: ~$0.01-0.02 per PDF using Gemini Flash

## Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| `BATCH_SIZE` | 20 | Parallel API requests |
| `MIN_IMAGE_SIZE` | 30px | Auto-skip threshold |
| `MODEL` | `google/gemini-2.0-flash-001` | OpenRouter model ID |
