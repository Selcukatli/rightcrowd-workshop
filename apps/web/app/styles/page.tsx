"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

// Mock data for styles
const mockStyles = [
  {
    _id: "1",
    name: "Minimalist Light",
    description: "Clean and airy design with plenty of whitespace",
    colors: {
      primary: "#000000",
      secondary: "#666666",
      accent: "#3b82f6",
      background: "#ffffff",
    },
    typography: {
      heading: "Inter",
      body: "Inter",
    },
  },
  {
    _id: "2",
    name: "Dark Mode Tech",
    description: "Sleek dark theme perfect for technical presentations",
    colors: {
      primary: "#ffffff",
      secondary: "#a1a1aa",
      accent: "#8b5cf6",
      background: "#18181b",
    },
    typography: {
      heading: "JetBrains Mono",
      body: "Inter",
    },
  },
  {
    _id: "3",
    name: "Corporate Blue",
    description: "Professional and trustworthy",
    colors: {
      primary: "#1e40af",
      secondary: "#60a5fa",
      accent: "#f59e0b",
      background: "#f8fafc",
    },
    typography: {
      heading: "Montserrat",
      body: "Open Sans",
    },
  },
];

export default function StylesPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="header-display text-2xl md:text-3xl mb-2">Styles</h1>
          <p className="text-muted-foreground text-sm">
            Manage your presentation themes and visual styles
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="rounded-full"
        >
          {showForm ? "Cancel" : "New Style"}
        </Button>
      </div>

      {showForm && (
        <div className="p-6 rounded-xl bg-card shadow-sm shadow-black/[0.03] mb-8 animate-fade-in border">
          <div className="mb-6">
            <h2 className="font-medium text-lg">Create New Style</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Define the colors, typography, and visual elements
            </p>
          </div>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Style Name</Label>
                <Input id="name" placeholder="e.g., Modern Geometric" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Brief description of the style" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Color Palette</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="primaryColor" className="text-xs text-muted-foreground">Primary</Label>
                  <div className="flex gap-2">
                    <Input id="primaryColor" type="color" className="w-10 h-9 p-1 cursor-pointer" />
                    <Input placeholder="#000000" className="flex-1 h-9 font-mono text-xs" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="secondaryColor" className="text-xs text-muted-foreground">Secondary</Label>
                  <div className="flex gap-2">
                    <Input id="secondaryColor" type="color" className="w-10 h-9 p-1 cursor-pointer" />
                    <Input placeholder="#666666" className="flex-1 h-9 font-mono text-xs" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="accentColor" className="text-xs text-muted-foreground">Accent</Label>
                  <div className="flex gap-2">
                    <Input id="accentColor" type="color" className="w-10 h-9 p-1 cursor-pointer" />
                    <Input placeholder="#3b82f6" className="flex-1 h-9 font-mono text-xs" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="bgColor" className="text-xs text-muted-foreground">Background</Label>
                  <div className="flex gap-2">
                    <Input id="bgColor" type="color" className="w-10 h-9 p-1 cursor-pointer" />
                    <Input placeholder="#ffffff" className="flex-1 h-9 font-mono text-xs" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="headingFont">Heading Font</Label>
                <Select defaultValue="inter">
                  <SelectTrigger id="headingFont">
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inter">Inter</SelectItem>
                    <SelectItem value="roboto">Roboto</SelectItem>
                    <SelectItem value="lora">Lora</SelectItem>
                    <SelectItem value="montserrat">Montserrat</SelectItem>
                    <SelectItem value="playfair">Playfair Display</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bodyFont">Body Font</Label>
                <Select defaultValue="inter">
                  <SelectTrigger id="bodyFont">
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inter">Inter</SelectItem>
                    <SelectItem value="roboto">Roboto</SelectItem>
                    <SelectItem value="lora">Lora</SelectItem>
                    <SelectItem value="montserrat">Montserrat</SelectItem>
                    <SelectItem value="open-sans">Open Sans</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="rounded-full">
                Cancel
              </Button>
              <Button type="submit" className="rounded-full">Create Style</Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockStyles.map((style, index) => (
          <div
            key={style._id}
            className="group relative p-5 rounded-xl bg-card border hover:border-primary/50 cursor-pointer transition-all duration-300 hover:shadow-md animate-fade-in overflow-hidden"
            style={{ animationDelay: `${index * 50}ms` }}
          >
             {/* Preview Header */}
            <div className="absolute top-0 left-0 w-full h-1.5 flex">
                <div style={{ backgroundColor: style.colors.primary, flex: 2 }} />
                <div style={{ backgroundColor: style.colors.secondary, flex: 1 }} />
                <div style={{ backgroundColor: style.colors.accent, flex: 1 }} />
            </div>

            <div className="mt-2 space-y-4">
              <div>
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                  {style.name}
                </h3>
                <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{style.description}</p>
              </div>

              {/* Color Preview */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-card" style={{ backgroundColor: style.colors.primary }} title="Primary" />
                  <div className="w-8 h-8 rounded-full border-2 border-card" style={{ backgroundColor: style.colors.secondary }} title="Secondary" />
                  <div className="w-8 h-8 rounded-full border-2 border-card" style={{ backgroundColor: style.colors.accent }} title="Accent" />
                  <div className="w-8 h-8 rounded-full border-2 border-card" style={{ backgroundColor: style.colors.background }} title="Background" />
                </div>
                <div className="text-xs text-muted-foreground pl-1">
                   Palette
                </div>
              </div>

              {/* Typography Preview */}
              <div className="p-3 bg-muted/30 rounded-lg space-y-2 border">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Aa</span>
                    <span className="text-xs font-medium">{style.typography.heading}</span>
                </div>
                <div className="h-px bg-border/50" />
                 <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Aa</span>
                    <span className="text-xs">{style.typography.body}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Add New Card (Optional visual cue) */}
        <button
            onClick={() => setShowForm(true)}
            className="flex flex-col items-center justify-center p-5 rounded-xl border-2 border-dashed border-muted hover:border-primary/50 hover:bg-muted/5 transition-all gap-3 h-full min-h-[220px] group"
        >
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                 <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted-foreground group-hover:text-primary"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
            </div>
            <span className="font-medium text-muted-foreground group-hover:text-primary transition-colors">Create New Style</span>
        </button>
      </div>
    </div>
  );
}

