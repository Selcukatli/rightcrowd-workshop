# Images to PDF Converter

Converts numbered slide images into a single PDF, sorted in proper order.

## Features

- Handles decimal slide numbers (e.g., `slide 2.5` for inserted slides)
- Sorts duplicate slide numbers alphabetically
- Supports PNG, JPG, JPEG formats
- Handles RGBA images (converts to RGB for PDF compatibility)

## Requirements

```bash
brew install pillow
# or
pip install Pillow
```

## Usage

```bash
python3 scripts/images-to-pdf/images_to_pdf.py <folder> [-o output.pdf]
```

### Examples

```bash
# Basic usage (creates output.pdf in the source folder)
python3 scripts/images-to-pdf/images_to_pdf.py "presentations/ai native development workshop"

# Custom output filename
python3 scripts/images-to-pdf/images_to_pdf.py "presentations/my-slides" -o "My Presentation.pdf"

# Quiet mode
python3 scripts/images-to-pdf/images_to_pdf.py "presentations/my-slides" -q
```

## Naming Convention

The script expects files named like:
- `slide 0 - intro.png`
- `slide 1 - agenda.png`
- `slide 2.5 - extra content.png` (decimal for inserted slides)
- `slide 10 - conclusion.png`

Slides with the same number are sorted alphabetically.
