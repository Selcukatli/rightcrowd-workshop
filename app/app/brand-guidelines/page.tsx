"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

// Mock data for checkpoint 1
const mockGuidelines = [
  {
    _id: "1",
    name: "Corporate Blue",
    description: "Professional corporate style",
    primaryColor: "#1e40af",
    secondaryColor: "#60a5fa",
    toneOfVoice: "Professional, confident, clear",
  },
  {
    _id: "2",
    name: "Startup Fresh",
    description: "Modern startup aesthetic",
    primaryColor: "#10b981",
    secondaryColor: "#fbbf24",
    toneOfVoice: "Friendly, innovative, energetic",
  },
  {
    _id: "3",
    name: "Creative Bold",
    description: "Eye-catching creative style",
    primaryColor: "#dc2626",
    secondaryColor: "#7c3aed",
    toneOfVoice: "Bold, expressive, unconventional",
  },
];

export default function BrandGuidelinesPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-6 md:p-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="header-display text-2xl md:text-3xl mb-2">Brand Guidelines</h1>
          <p className="text-muted-foreground text-sm">
            Define visual and tone styles for your presentations
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="rounded-full"
        >
          {showForm ? "Cancel" : "New Guideline"}
        </Button>
      </div>

      {showForm && (
        <div className="p-5 rounded-xl bg-card shadow-sm shadow-black/[0.03] mb-6 animate-fade-in">
          <div className="mb-4">
            <h2 className="font-medium text-base">Create Brand Guideline</h2>
            <p className="text-muted-foreground text-xs mt-1">
              Define the visual style and tone for your presentations
            </p>
          </div>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs">Name</Label>
                <Input id="name" placeholder="e.g., Corporate Blue" className="h-9" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="description" className="text-xs">Description</Label>
                <Input id="description" placeholder="Brief description" className="h-9" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="primaryColor" className="text-xs">Primary Color</Label>
                <div className="flex gap-2">
                  <Input id="primaryColor" type="color" defaultValue="#1e40af" className="w-10 h-9 p-1 cursor-pointer" />
                  <Input placeholder="#1e40af" className="flex-1 h-9 font-mono text-xs" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="secondaryColor" className="text-xs">Secondary Color</Label>
                <div className="flex gap-2">
                  <Input id="secondaryColor" type="color" defaultValue="#60a5fa" className="w-10 h-9 p-1 cursor-pointer" />
                  <Input placeholder="#60a5fa" className="flex-1 h-9 font-mono text-xs" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="toneOfVoice" className="text-xs">Tone of Voice</Label>
              <Textarea
                id="toneOfVoice"
                placeholder="e.g., Professional, confident, clear"
                rows={2}
                className="text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Style Reference Image</Label>
              <div className="border-2 border-dashed border-muted-foreground/20 rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer bg-muted/50">
                <input id="styleImage" type="file" accept="image/*" className="hidden" />
                <label htmlFor="styleImage" className="cursor-pointer">
                  <div className="text-muted-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mx-auto mb-2 opacity-50"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" x2="12" y1="3" y2="15" />
                    </svg>
                    <span className="text-xs">Click to upload or drag and drop</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button type="submit" className="rounded-full">Create Guideline</Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="rounded-full">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {mockGuidelines.map((guideline, index) => (
          <div
            key={guideline._id}
            className="group p-4 md:p-5 rounded-xl bg-card cursor-pointer transition-all duration-200 shadow-sm shadow-black/[0.03] hover:shadow-xl hover:shadow-black/[0.08] hover:scale-[1.02] animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="space-y-3">
              <div>
                <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                  {guideline.name}
                </h3>
                <p className="text-muted-foreground text-xs mt-0.5">{guideline.description}</p>
              </div>

              <div className="flex gap-2">
                <div
                  className="w-8 h-8 rounded-lg shadow-sm"
                  style={{ backgroundColor: guideline.primaryColor }}
                />
                <div
                  className="w-8 h-8 rounded-lg shadow-sm"
                  style={{ backgroundColor: guideline.secondaryColor }}
                />
              </div>

              <p className="text-xs text-muted-foreground">
                <span className="te-label text-foreground/70">Tone:</span>{" "}
                {guideline.toneOfVoice}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
