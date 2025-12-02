"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MarkdownEditor } from "@/components/markdown-editor"; // Import the new component
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for checkpoint 1
const mockGuidelines = [
  { _id: "1", name: "Corporate Blue" },
  { _id: "2", name: "Startup Fresh" },
  { _id: "3", name: "Creative Bold" },
];

export default function NewPresentationPage() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto flex flex-col h-[calc(100vh-2rem)]">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back
      </Link>

      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="header-display text-2xl md:text-3xl">New Presentation</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Create a new slide deck from scratch or import existing content.
          </p>
        </div>
        <Button type="submit" form="presentation-form" className="rounded-full gap-2 px-8 shadow-lg shadow-primary/20" size="lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1-1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
          </svg>
          Generate Slides
        </Button>
      </div>

      <form id="presentation-form" className="flex flex-col lg:flex-row gap-8 flex-1 pb-6 min-h-0">
        {/* Left Column: Details & Settings */}
        <div className="lg:w-1/3 flex flex-col h-full">
          <div className="p-5 rounded-xl bg-card border shadow-sm space-y-6 flex-1 overflow-y-auto">
             <div>
                <h3 className="font-semibold text-base mb-3">Presentation Details</h3>
                <div className="space-y-4">
                   <div className="space-y-1.5">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Q4 Product Strategy"
                    />
                  </div>

                   <div className="space-y-1.5">
                    <Label htmlFor="description">Description <span className="text-muted-foreground font-normal">(Optional)</span></Label>
                    <Input
                      id="description"
                      placeholder="Brief context about the deck"
                    />
                  </div>
                </div>
             </div>

             <div className="pt-6 border-t">
                 <h3 className="font-semibold text-base mb-3">Style & Branding</h3>
                  <div className="space-y-1.5">
                    <Label htmlFor="brandGuideline">Brand Guideline</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None (Default)</SelectItem>
                        {mockGuidelines.map((g) => (
                          <SelectItem key={g._id} value={g._id}>
                            {g.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                     <p className="text-[10px] text-muted-foreground">
                      Apply a consistent visual theme to your slides.
                    </p>
                  </div>
             </div>
          </div>
        </div>

        {/* Right Column: Outline Editor */}
        <div className="lg:w-2/3 flex flex-col h-full gap-4">
           <div className="p-5 rounded-xl bg-card border shadow-sm flex flex-col h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-4 pb-4 border-b flex-shrink-0">
                  <div>
                    <h3 className="font-semibold text-base">Content Outline</h3>
                    <p className="text-xs text-muted-foreground">Structure your slides with markdown.</p>
                  </div>
                  <Button type="button" variant="outline" size="sm" className="gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" x2="12" y1="3" y2="15" />
                    </svg>
                    Import Presentation
                  </Button>
              </div>
              
              <div className="flex-1 min-h-0">
                <MarkdownEditor
                  defaultValue={`# Presentation Title

## Slide 1 Title
- Bullet point 1
- Bullet point 2

## Slide 2 Title
- Key concept A
- Key concept B`}
                />
              </div>
            
             <div className="mt-2 pt-2 border-t flex-shrink-0">
                 <p className="text-[10px] text-muted-foreground">
                   <span className="font-medium">Tip:</span> Each heading 1 (#) starts a new slide.
                 </p>
             </div>
           </div>
        </div>
      </form>
    </div>
  );
}