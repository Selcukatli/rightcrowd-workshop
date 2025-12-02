"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for checkpoint 1
const mockPresentation = {
  _id: "1",
  title: "AI Native Development Workshop",
  description: "Building with Multi-Agent Systems",
  status: "complete" as const,
  outline: `# Introduction
- Background & credentials
- AI Native Coding for 18+ months

# The AI Development Spectrum
- Vibe Coding
- Code Assist
- AI Native Development`,
};

const mockSlides = [
  {
    _id: "s1",
    order: 1,
    title: "Introduction",
    content: "Background & credentials\n\nAI Native Coding for 18+ months",
    speakerNotes: "Introduce yourself and your background",
    imageUrl: null,
    status: "complete" as const,
  },
  {
    _id: "s2",
    order: 2,
    title: "The AI Development Spectrum",
    content: "Three approaches:\n• Vibe Coding\n• Code Assist\n• AI Native Development",
    speakerNotes: "Explain each approach briefly",
    imageUrl: null,
    status: "complete" as const,
  },
  {
    _id: "s3",
    order: 3,
    title: "Vibe Coding",
    content: "• Let AI take the wheel\n• Quick prototyping\n• Risk: Technical debt",
    speakerNotes: "For non-technical roles",
    imageUrl: null,
    status: "pending" as const,
  },
  {
    _id: "s4",
    order: 4,
    title: "Code Assist",
    content: "• AI as a copilot\n• Developer stays in control\n• Best for experienced devs",
    speakerNotes: "Middle ground approach",
    imageUrl: null,
    status: "generating" as const,
  },
];

export default function PresentationPage() {
  return (
    <div className="p-6 md:p-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mb-3"
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
          <h1 className="header-display text-xl md:text-2xl mb-1">{mockPresentation.title}</h1>
          <p className="text-muted-foreground text-sm">{mockPresentation.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-full gap-1.5">
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
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            Export
          </Button>
          <Button size="sm" className="rounded-full gap-1.5">
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
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            Regenerate
          </Button>
        </div>
      </div>

      <Tabs defaultValue="slides" className="w-full">
        <TabsList className="mb-4 h-9 p-1 bg-muted/50 rounded-full">
          <TabsTrigger value="slides" className="rounded-full text-xs px-4">
            Slides ({mockSlides.length})
          </TabsTrigger>
          <TabsTrigger value="outline" className="rounded-full text-xs px-4">
            Outline
          </TabsTrigger>
        </TabsList>

        <TabsContent value="slides" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {mockSlides.map((slide, index) => (
              <SlideCard key={slide._id} slide={slide} index={index} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="outline" className="mt-0">
          <div className="p-5 rounded-xl bg-card shadow-sm shadow-black/[0.03] animate-fade-in">
            <pre className="whitespace-pre-wrap font-mono text-xs bg-muted p-4 rounded-lg leading-relaxed">
              {mockPresentation.outline}
            </pre>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" className="rounded-full gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                </svg>
                Edit Outline
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SlideCard({ slide, index }: { slide: typeof mockSlides[0]; index: number }) {
  return (
    <div
      className="group p-4 rounded-xl bg-card transition-all duration-200 shadow-sm shadow-black/[0.03] hover:shadow-xl hover:shadow-black/[0.08] hover:scale-[1.02] animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Thumbnail */}
      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-3 relative">
        {slide.imageUrl ? (
          <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover rounded-md" />
        ) : (
          <div className="text-muted-foreground/30">
            {slide.status === "pending" || slide.status === "generating" ? (
              <div className="text-center">
                <div className="w-6 h-6 border-2 border-muted-foreground/20 border-t-primary rounded-full animate-spin mx-auto mb-1.5" />
                <span className="text-[10px]">
                  {slide.status === "pending" ? "Waiting..." : "Generating..."}
                </span>
              </div>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
            )}
          </div>
        )}
        <div className="absolute top-1.5 left-1.5">
          <span className="bg-background/90 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] font-medium te-numeric">
            {slide.order}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-sm leading-tight group-hover:text-primary transition-colors">
            {slide.title}
          </h3>
          <StatusBadge status={slide.status} />
        </div>
        <p className="text-muted-foreground text-xs line-clamp-2 whitespace-pre-line">
          {slide.content}
        </p>
        <div className="flex gap-1.5 pt-1">
          <Button size="sm" variant="outline" className="h-7 text-xs rounded-full flex-1 gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            </svg>
            Edit
          </Button>
          <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: "pending" | "generating" | "complete" | "error" }) {
  const config = {
    pending: { bg: "bg-gray-500/10", text: "text-gray-600", label: "Pending" },
    generating: { bg: "bg-blue-500/10", text: "text-blue-600", label: "Generating" },
    complete: { bg: "bg-emerald-500/10", text: "text-emerald-600", label: "Complete" },
    error: { bg: "bg-red-500/10", text: "text-red-600", label: "Error" },
  };

  const { bg, text, label } = config[status];

  return (
    <span
      className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${bg} ${text} flex-shrink-0 uppercase tracking-wide`}
    >
      {label}
    </span>
  );
}
