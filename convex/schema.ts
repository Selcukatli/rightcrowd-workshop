import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Brand guidelines for consistent styling
  brandGuidelines: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    // Text guidelines
    primaryFont: v.optional(v.string()),
    headingStyle: v.optional(v.string()),
    toneOfVoice: v.optional(v.string()),
    // Visual guidelines
    primaryColor: v.optional(v.string()),
    secondaryColor: v.optional(v.string()),
    logoUrl: v.optional(v.string()),
    styleImageId: v.optional(v.id("_storage")), // Reference image for style
    createdAt: v.number(),
  }),

  // Presentations container
  presentations: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    outline: v.string(), // Full outline text (markdown)
    brandGuidelineId: v.optional(v.id("brandGuidelines")),
    status: v.union(
      v.literal("draft"),
      v.literal("generating"),
      v.literal("complete")
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_status", ["status"]),

  // Individual slides
  slides: defineTable({
    presentationId: v.id("presentations"),
    order: v.number(),
    // Content
    title: v.string(),
    content: v.string(), // Generated slide content (markdown/text)
    speakerNotes: v.optional(v.string()),
    // Visuals
    imagePrompt: v.optional(v.string()), // Generated prompt for fal.ai
    imageUrl: v.optional(v.string()), // Generated image URL
    imageId: v.optional(v.id("_storage")), // Stored in Convex
    // Status
    status: v.union(
      v.literal("pending"),
      v.literal("generating"),
      v.literal("complete"),
      v.literal("error")
    ),
    createdAt: v.number(),
  })
    .index("by_presentation", ["presentationId"])
    .index("by_presentation_order", ["presentationId", "order"]),
});
