"use client";

import Link from "next/link";

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
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="header-display text-2xl md:text-3xl mb-2">Your Presentations</h1>
        <p className="text-muted-foreground text-sm">
          Generate AI-powered slides from your outlines
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {mockPresentations.map((presentation, index) => (
          <Link
            key={presentation._id}
            href={`/presentations/${presentation._id}`}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="group p-4 md:p-5 rounded-xl bg-card cursor-pointer transition-all duration-200 shadow-sm shadow-black/[0.03] hover:shadow-xl hover:shadow-black/[0.08] hover:scale-[1.02]">
              {/* Preview thumbnail */}
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                <div className="text-muted-foreground/30">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 3h20" />
                    <path d="M21 3v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
                    <path d="m7 21 5-5 5 5" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-sm leading-tight group-hover:text-primary transition-colors">
                    {presentation.title}
                  </h3>
                  <StatusBadge status={presentation.status} />
                </div>
                <p className="text-muted-foreground text-xs line-clamp-2">
                  {presentation.description}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                  <span className="te-numeric">{presentation.slideCount} slides</span>
                  <span>{new Date(presentation.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: "draft" | "generating" | "complete" }) {
  const config = {
    draft: { bg: "bg-amber-500/10", text: "text-amber-600", label: "Draft" },
    generating: { bg: "bg-blue-500/10", text: "text-blue-600", label: "Generating" },
    complete: { bg: "bg-emerald-500/10", text: "text-emerald-600", label: "Complete" },
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
