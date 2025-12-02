// Types for presentation generation

class BrandGuideline {
  name string
  toneOfVoice string?
  primaryColor string?
  secondaryColor string?
  styleDescription string?
}

class SlideSpec {
  title string
  keyPoints string[] @description("Main points to cover on this slide")
  suggestedVisual string? @description("Description of what visual would work well")
}

class SlideContent {
  title string
  content string @description("Concise, presentation-ready content")
  speakerNotes string? @description("Notes for the presenter")
  imagePrompt string @description("Detailed prompt for image generation")
}
