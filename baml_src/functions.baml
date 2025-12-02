// Functions for presentation generation

function ParseOutline(outline: string, brandGuideline: BrandGuideline?) -> SlideSpec[] {
  client CustomSonnet4
  prompt #"
    Parse this presentation outline into individual slides.

    For each section or major point in the outline, create a slide specification with:
    - A clear, concise title
    - Key points (bullet list of main ideas)
    - A suggested visual description

    OUTLINE:
    {{ outline }}

    {% if brandGuideline %}
    BRAND VOICE: {{ brandGuideline.toneOfVoice }}
    {% endif %}

    Return a list of slide specifications. Each slide should be focused on ONE main topic.
    Aim for 1-3 key points per slide for clarity.

    {{ ctx.output_format }}
  "#
}

function GenerateSlideContent(
  slideSpec: SlideSpec,
  brandGuideline: BrandGuideline?,
  presentationContext: string
) -> SlideContent {
  client CustomSonnet4
  prompt #"
    Generate polished presentation slide content.

    SLIDE SPECIFICATION:
    Title: {{ slideSpec.title }}
    Key Points:
    {% for point in slideSpec.keyPoints %}
    - {{ point }}
    {% endfor %}
    Suggested Visual: {{ slideSpec.suggestedVisual }}

    PRESENTATION CONTEXT:
    {{ presentationContext }}

    {% if brandGuideline %}
    BRAND GUIDELINES:
    - Tone: {{ brandGuideline.toneOfVoice }}
    - Primary Color: {{ brandGuideline.primaryColor }}
    - Secondary Color: {{ brandGuideline.secondaryColor }}
    {% endif %}

    Generate:
    1. A polished slide title (can refine the original)
    2. Concise, presentation-ready content (use bullet points, keep it scannable)
    3. Speaker notes for the presenter
    4. A detailed image prompt that would create a compelling visual for this slide

    The image prompt should be specific and detailed, suitable for an AI image generator.
    Consider the brand colors and style in the image prompt.

    {{ ctx.output_format }}
  "#
}

function GenerateImagePrompt(
  slideTitle: string,
  slideContent: string,
  brandGuideline: BrandGuideline?
) -> string {
  client CustomHaiku
  prompt #"
    Create a detailed image generation prompt for a presentation slide.

    SLIDE TITLE: {{ slideTitle }}
    SLIDE CONTENT: {{ slideContent }}

    {% if brandGuideline %}
    BRAND STYLE:
    - Colors: {{ brandGuideline.primaryColor }}, {{ brandGuideline.secondaryColor }}
    - Style: {{ brandGuideline.styleDescription }}
    {% endif %}

    Generate a detailed prompt for an AI image generator (like Stable Diffusion or DALL-E).
    The image should:
    - Be professional and suitable for a business presentation
    - Complement the slide content without being too literal
    - Use the brand colors if specified
    - Be clean and modern

    Return ONLY the image prompt, nothing else.
  "#
}
