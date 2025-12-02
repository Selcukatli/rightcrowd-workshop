"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

// Static mock data for checkpoint 1 (no backend hooks yet)
const mockPresentations = [
  {
    _id: "1",
    title: "AI Native Development Workshop",
    description: "Building with Multi-Agent Systems",
    status: "complete" as const,
    slideCount: 12,
    createdAt: Date.now() - 86400000,
  },
  {
    _id: "2",
    title: "Q4 Product Roadmap",
    description: "Strategic initiatives for next quarter",
    status: "draft" as const,
    slideCount: 8,
    createdAt: Date.now() - 172800000,
  },
  {
    _id: "3",
    title: "Team Onboarding",
    description: "Introduction and process overview",
    status: "generating" as const,
    slideCount: 5,
    createdAt: Date.now() - 259200000,
  },
];

export default function Dashboard() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="header-display text-2xl md:text-3xl mb-2">Your Presentations</h1>
          <p className="text-muted-foreground text-sm">
            Generate AI-powered slides from your outlines
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" className="rounded-full gap-2" size="lg">
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
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" x2="12" y1="3" y2="15" />
            </svg>
            Import Presentation
          </Button>
          <Link href="/presentations/new">
            <Button className="rounded-full" size="lg">New Presentation</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockPresentations.map((presentation, index) => (
          <Link
            key={presentation._id}
            href={`/presentations/${presentation._id}`}
            className="group relative p-5 rounded-xl bg-card border hover:border-primary/50 transition-all duration-300 hover:shadow-md animate-fade-in overflow-hidden block h-full"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Status Line */}
            <div className={`absolute top-0 left-0 w-full h-1 ${getStatusColor(presentation.status)}`} />

            <div className="flex flex-col h-full">
               {/* Preview thumbnail placeholder */}
               <div className="aspect-video bg-muted/30 rounded-lg flex items-center justify-center mb-4 border border-dashed border-border group-hover:border-primary/20 transition-colors">
                <div className="text-muted-foreground/30 group-hover:text-primary/40 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
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
                </div>
              </div>

              <div className="space-y-2 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                    {presentation.title}
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {presentation.description}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t flex items-center justify-between text-xs text-muted-foreground">
                 <div className="flex items-center gap-2">
                    <StatusBadge status={presentation.status} />
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span className="te-numeric">{presentation.slideCount} slides</span>
                 </div>
                 <span>{new Date(presentation.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </Link>
        ))}

        {/* Create New Card */}
        <Link
            href="/presentations/new"
            className="flex flex-col items-center justify-center p-5 rounded-xl border-2 border-dashed border-muted hover:border-primary/50 hover:bg-muted/5 transition-all gap-3 h-full min-h-[280px] group"
        >
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                 <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
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
            <span className="font-medium text-muted-foreground group-hover:text-primary transition-colors">Create New Presentation</span>
        </Link>
      </div>
    </div>
  );
}

function getStatusColor(status: string) {
    switch (status) {
        case 'complete': return 'bg-emerald-500';
        case 'generating': return 'bg-blue-500';
        case 'draft': return 'bg-amber-500';
        default: return 'bg-muted';
    }
}

function StatusBadge({ status }: { status: "draft" | "generating" | "complete" }) {
  const config = {
    draft: { text: "text-amber-600", label: "Draft" },
    generating: { text: "text-blue-600", label: "Generating" },
    complete: { text: "text-emerald-600", label: "Complete" },
  };

  const { text, label } = config[status];

  return (
    <span className={`font-medium ${text} uppercase tracking-wide text-[10px]`}>
      {label}
    </span>
  );
}
