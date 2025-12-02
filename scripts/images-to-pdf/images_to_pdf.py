#!/usr/bin/env python3
"""
Convert numbered slide images to a single PDF.

Handles various naming patterns:
- slide 0 - intro.png
- slide 2.5 - extra.png (decimal numbers for inserted slides)
- Duplicate slide numbers are sorted alphabetically
"""
import argparse
import os
import re
import sys
from PIL import Image


def get_slide_number(filename):
    """Extract numeric slide number (handles decimals like 2.5, 24.5)"""
    match = re.search(r'slide\s+(\d+(?:\.\d+)?)', filename, re.IGNORECASE)
    if match:
        return float(match.group(1))
    return float('inf')


def main():
    parser = argparse.ArgumentParser(
        description='Convert numbered slide images to PDF'
    )
    parser.add_argument(
        'folder',
        help='Folder containing slide images'
    )
    parser.add_argument(
        '-o', '--output',
        help='Output PDF filename (default: output.pdf in the source folder)'
    )
    parser.add_argument(
        '-e', '--extensions',
        default='png,jpg,jpeg',
        help='Comma-separated image extensions to include (default: png,jpg,jpeg)'
    )
    parser.add_argument(
        '-q', '--quiet',
        action='store_true',
        help='Suppress output except errors'
    )
    parser.add_argument(
        '--quality',
        type=int,
        default=95,
        help='Image quality 1-100 (default: 95, use 100 for lossless)'
    )
    parser.add_argument(
        '--dpi',
        type=int,
        default=300,
        help='Resolution in DPI (default: 300)'
    )
    args = parser.parse_args()

    folder = os.path.abspath(args.folder)
    if not os.path.isdir(folder):
        print(f"Error: '{folder}' is not a directory", file=sys.stderr)
        sys.exit(1)

    extensions = tuple(f'.{ext.strip().lower()}' for ext in args.extensions.split(','))

    # Get all image files
    image_files = [f for f in os.listdir(folder) if f.lower().endswith(extensions)]

    if not image_files:
        print(f"Error: No image files found in '{folder}'", file=sys.stderr)
        sys.exit(1)

    # Sort by slide number, then alphabetically for same numbers
    image_files.sort(key=lambda f: (get_slide_number(f), f.lower()))

    if not args.quiet:
        print("Slides in order:")
        for i, f in enumerate(image_files, 1):
            print(f"  {i}. {f}")

    # Convert to PIL images
    images = []
    for f in image_files:
        img = Image.open(os.path.join(folder, f))
        if img.mode == 'RGBA':
            img = img.convert('RGB')
        images.append(img)

    # Determine output path
    if args.output:
        output_path = args.output
        if not os.path.isabs(output_path):
            output_path = os.path.join(folder, output_path)
    else:
        output_path = os.path.join(folder, 'output.pdf')

    # Save as PDF with quality settings
    images[0].save(
        output_path,
        save_all=True,
        append_images=images[1:],
        quality=args.quality,
        resolution=args.dpi
    )

    if not args.quiet:
        print(f"\nCreated PDF with {len(images)} slides: {output_path}")


if __name__ == '__main__':
    main()
