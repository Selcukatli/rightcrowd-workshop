#!/usr/bin/env python3
"""
PDF to Markdown converter with AI-filtered image extraction.
Uses Gemini Flash via OpenRouter to classify meaningful vs decorative images.
"""

import pymupdf
import os
import re
import sys
import base64
import asyncio
import shutil
from openai import AsyncOpenAI

# Configuration
BATCH_SIZE = 20  # Parallel API requests
MIN_IMAGE_SIZE = 30  # Skip images smaller than this (px)
MODEL = "google/gemini-2.0-flash-001"


def get_client():
    api_key = os.environ.get("OPENROUTER_API_KEY")
    if not api_key:
        print("Error: OPENROUTER_API_KEY environment variable not set")
        sys.exit(1)
    return AsyncOpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=api_key,
    )


def slugify(text: str) -> str:
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')


async def classify_image(client: AsyncOpenAI, image_bytes: bytes, image_ext: str) -> bool:
    """Returns True if image is meaningful content, False if decorative."""
    b64 = base64.b64encode(image_bytes).decode()
    mime = f"image/{image_ext}" if image_ext != "jpg" else "image/jpeg"

    try:
        response = await client.chat.completions.create(
            model=MODEL,
            messages=[{
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Is this image meaningful slide content (screenshot, diagram, chart, photo, illustration) or just decoration (background, gradient, icon, bullet point, border, template element)? Reply with only 'CONTENT' or 'DECORATION'."
                    },
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:{mime};base64,{b64}"}
                    }
                ]
            }],
            max_tokens=10
        )
        result = response.choices[0].message.content.strip().upper()
        return "CONTENT" in result
    except Exception as e:
        print(f"  Warning: Error classifying image: {e}")
        return True  # Keep on error


async def process_pdf(pdf_path: str, output_base: str = None):
    """Process a PDF and generate filtered markdown with images."""

    if not os.path.exists(pdf_path):
        print(f"Error: File not found: {pdf_path}")
        sys.exit(1)

    client = get_client()

    pdf_name = os.path.splitext(os.path.basename(pdf_path))[0]
    slug = slugify(pdf_name)

    if output_base is None:
        # Default to presentations/ in the same directory as the PDF
        output_base = os.path.join(os.path.dirname(pdf_path), "..", "presentations")

    output_dir = os.path.join(output_base, slug)
    resources_dir = os.path.join(output_dir, "resources")
    os.makedirs(resources_dir, exist_ok=True)

    # Copy source PDF
    source_pdf_path = os.path.join(output_dir, "source.pdf")
    shutil.copy2(pdf_path, source_pdf_path)

    print(f"Processing: {pdf_path}")
    doc = pymupdf.open(pdf_path)

    # Collect all unique images
    all_images = []
    seen_xrefs = set()

    for page_num, page in enumerate(doc, 1):
        for img_idx, img in enumerate(page.get_images()):
            xref = img[0]
            if xref in seen_xrefs:
                continue
            seen_xrefs.add(xref)

            base_image = doc.extract_image(xref)
            all_images.append({
                "xref": xref,
                "page_num": page_num,
                "img_idx": img_idx,
                "bytes": base_image["image"],
                "ext": base_image["ext"],
                "width": base_image["width"],
                "height": base_image["height"]
            })

    print(f"Found {len(all_images)} unique images")

    # Quick filter: skip tiny images
    to_classify = []
    auto_skip = 0
    for img in all_images:
        if img["width"] < MIN_IMAGE_SIZE or img["height"] < MIN_IMAGE_SIZE:
            img["keep"] = False
            auto_skip += 1
        else:
            to_classify.append(img)

    print(f"  Auto-skipped {auto_skip} tiny images (<{MIN_IMAGE_SIZE}px)")
    print(f"  Classifying {len(to_classify)} images with AI...")

    # Classify in batches for parallelism
    for i in range(0, len(to_classify), BATCH_SIZE):
        batch = to_classify[i:i+BATCH_SIZE]
        tasks = [classify_image(client, img["bytes"], img["ext"]) for img in batch]
        results = await asyncio.gather(*tasks)
        for img, keep in zip(batch, results):
            img["keep"] = keep
        print(f"  Processed {min(i+BATCH_SIZE, len(to_classify))}/{len(to_classify)}")

    # Build markdown with filtered images
    kept_count = 0
    output = []

    for page_num, page in enumerate(doc, 1):
        text = page.get_text().strip()
        slide_content = f"## Slide {page_num}\n\n{text}\n"

        for img in all_images:
            if img["page_num"] == page_num and img.get("keep", False):
                filename = f"slide_{page_num}_img_{img['img_idx'] + 1}.{img['ext']}"
                with open(os.path.join(resources_dir, filename), "wb") as f:
                    f.write(img["bytes"])
                slide_content += f"\n![Image](resources/{filename})\n"
                kept_count += 1

        output.append(slide_content)

    # Write markdown (filename matches folder name)
    md_path = os.path.join(output_dir, f"{slug}.md")
    with open(md_path, "w") as f:
        f.write(f"# {pdf_name}\n\n")
        f.write("\n---\n\n".join(output))

    print(f"\nDone!")
    print(f"  Pages: {len(doc)}")
    print(f"  Kept: {kept_count} meaningful images")
    print(f"  Filtered: {len(all_images) - kept_count} decorative images")
    print(f"  Output: {md_path}")

    return md_path


def main():
    if len(sys.argv) < 2:
        print("Usage: python pdf_to_markdown.py <pdf_path> [output_dir]")
        print("\nExample:")
        print("  python pdf_to_markdown.py presentation.pdf")
        print("  python pdf_to_markdown.py presentation.pdf ./output")
        sys.exit(1)

    pdf_path = sys.argv[1]
    output_base = sys.argv[2] if len(sys.argv) > 2 else None

    asyncio.run(process_pdf(pdf_path, output_base))


if __name__ == "__main__":
    main()
