"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
    <div className="p-6 md:p-8 max-w-2xl">
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

      <div className="p-5 rounded-xl bg-card shadow-sm shadow-black/[0.03] animate-fade-in">
        <div className="mb-5">
          <h1 className="header-display text-xl md:text-2xl">New Presentation</h1>
          <p className="text-muted-foreground text-xs mt-1">
            Enter your outline and select a brand style to generate slides
          </p>
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-xs">Title</Label>
              <Input
                id="title"
                placeholder="e.g., Q4 Product Strategy"
                className="h-9"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="brandGuideline" className="text-xs">Brand Guideline</Label>
              <Select>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {mockGuidelines.map((g) => (
                    <SelectItem key={g._id} value={g._id}>
                      {g.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description" className="text-xs">Description (optional)</Label>
            <Input
              id="description"
              placeholder="Brief description of the presentation"
              className="h-9"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="outline" className="text-xs">Outline</Label>
              <span className="te-label text-muted-foreground">Markdown</span>
            </div>
            <Textarea
              id="outline"
              placeholder={`# Introduction
- Who we are
- What we do

# Problem Statement
- Market challenges
- Customer pain points

# Our Solution
- Key features
- Benefits

# Roadmap
- Q1 goals
- Q2 goals

# Q&A`}
              rows={12}
              className="font-mono text-xs"
            />
            <p className="text-[10px] text-muted-foreground">
              Each heading (#) becomes a slide. Use bullet points for content.
            </p>
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="submit" className="rounded-full gap-2">
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
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
              Generate Slides
            </Button>
            <Button type="button" variant="outline" className="rounded-full">
              Save Draft
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
