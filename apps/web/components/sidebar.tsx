"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSidebarStore } from "@/stores/sidebar";

// Mock presentations for now (will be replaced with Convex query)
const mockPresentations = [
  { _id: "1", title: "AI Native Development Workshop", status: "complete" },
  { _id: "2", title: "Q4 Product Roadmap", status: "draft" },
  { _id: "3", title: "Team Onboarding", status: "generating" },
];

// Icons as components for reuse
const PresentationsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 3h20" />
    <path d="M21 3v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
    <path d="m7 21 5-5 5 5" />
  </svg>
);

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const StylesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" />
  </svg>
);

const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

// Chevron-first icon (collapse - two lines pointing left)
const CollapseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m17 18-6-6 6-6" />
    <path d="M7 6v12" />
  </svg>
);

// Chevron-last icon (expand - two lines pointing right)
const ExpandIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m7 18 6-6-6-6" />
    <path d="M17 6v12" />
  </svg>
);

interface SidebarProps {
  defaultCollapsed?: boolean;
}

export function Sidebar({ defaultCollapsed = false }: SidebarProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { isCollapsed, setCollapsed, toggle } = useSidebarStore();

  const currentPresentationId = pathname.startsWith("/presentations/")
    ? pathname.split("/")[2]
    : null;

  // Set initial collapsed state based on prop
  useEffect(() => {
    if (defaultCollapsed) {
      setCollapsed(true);
    }
  }, [defaultCollapsed, setCollapsed]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close search modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
      // Open search with Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const sidebarWidth = isCollapsed ? 72 : 220;

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ width: sidebarWidth }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="fixed left-0 top-0 h-screen p-3 z-40"
      >
        <div className="flex flex-col h-full bg-card rounded-2xl shadow-lg shadow-black/[0.03]">
          {/* Logo / Expand Button */}
          <div className={`py-4 ${isCollapsed ? "flex justify-center items-center px-0" : "flex items-center justify-between px-4"}`}>
            {isCollapsed ? (
              <button
                onClick={toggle}
                className="flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
                title="Expand sidebar"
              >
                <ExpandIcon />
              </button>
            ) : (
              <>
                <Link href="/" className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shrink-0">
                    <span className="text-primary-foreground font-semibold text-xs">H</span>
                  </div>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-medium text-foreground text-sm"
                  >
                    Hipslides
                  </motion.span>
                </Link>
                <button
                  onClick={toggle}
                  className="p-1.5 rounded-lg text-muted-foreground/60 hover:text-foreground hover:bg-muted/50 transition-colors"
                  title="Collapse sidebar"
                >
                  <CollapseIcon />
                </button>
              </>
            )}
          </div>

          {/* Navigation */}
          <div className={`${isCollapsed ? "items-center px-0" : "px-3"} flex flex-col min-h-0 flex-1 mt-1 overflow-hidden`}>
            {/* Presentations Link */}
            <Link
              href="/"
              className={`inline-flex items-center ${isCollapsed ? "justify-center w-8 h-8 px-0" : "w-full px-3 py-2"} gap-2.5 rounded-lg transition-all text-muted-foreground hover:text-foreground hover:bg-muted/50 mb-1`}
              title={isCollapsed ? "Presentations" : undefined}
            >
              <PresentationsIcon />
              {!isCollapsed && <span className="text-sm">Presentations</span>}
            </Link>

            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className={`inline-flex items-center ${isCollapsed ? "justify-center w-8 h-8 px-0" : "w-full justify-between px-3 py-2"} gap-2.5 rounded-lg transition-all text-muted-foreground hover:text-foreground hover:bg-muted/50 mb-1`}
              title={isCollapsed ? "Search (⌘K)" : undefined}
            >
              <div className="flex items-center gap-2.5">
                <SearchIcon />
                {!isCollapsed && <span className="text-sm">Search</span>}
              </div>
              {!isCollapsed && (
                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground bg-muted rounded">
                  ⌘K
                </kbd>
              )}
            </button>

            {/* Presentations List (only when expanded) */}
            {!isCollapsed && mockPresentations.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col gap-1.5 overflow-y-auto min-h-0 scrollbar-hide pl-2"
              >
                {mockPresentations.map((presentation) => {
                  const isActive = currentPresentationId === presentation._id;

                  return (
                    <Link
                      key={presentation._id}
                      href={`/presentations/${presentation._id}`}
                      className={`
                        block px-3 py-1.5 rounded-lg transition-all w-full truncate text-sm
                        ${
                          isActive
                            ? "text-foreground bg-muted/50"
                            : "text-muted-foreground/60 hover:text-foreground hover:bg-muted/50"
                        }
                      `}
                    >
                      {presentation.title}
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </div>

          {/* Bottom Section */}
          <div className={`${isCollapsed ? "items-center px-0" : "px-3"} py-3 mt-auto flex flex-col gap-1`}>
            {/* Styles Link */}
            <Link
              href="/styles"
              className={`inline-flex items-center ${isCollapsed ? "justify-center w-8 h-8 px-0" : "w-full px-3 py-2"} gap-2.5 rounded-lg transition-all ${
                pathname.startsWith("/styles")
                  ? "text-foreground bg-muted/50"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
              title={isCollapsed ? "Styles" : undefined}
            >
              <span className="flex-shrink-0">
                <StylesIcon />
              </span>
              {!isCollapsed && <span className="text-sm">Styles</span>}
            </Link>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={`inline-flex items-center ${isCollapsed ? "justify-center w-8 h-8 px-0" : "w-full px-3 py-2"} gap-2.5 rounded-lg transition-all text-muted-foreground hover:text-foreground hover:bg-muted/50`}
                title={isCollapsed ? (theme === "dark" ? "Light Mode" : "Dark Mode") : undefined}
              >
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
                {!isCollapsed && (
                  <span className="text-sm">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                )}
              </button>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div
              key="search-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setSearchOpen(false)}
            />

            <motion.div
              key="search-modal"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] pointer-events-none"
            >
              <div className="pointer-events-auto relative w-full max-w-lg mx-4 bg-card rounded-xl shadow-2xl border border-border overflow-hidden">
                {/* Search Input */}
              <div className="flex items-center gap-3 px-4 border-b border-border">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search presentations..."
                  autoFocus
                  className="flex-1 h-14 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <kbd className="px-2 py-1 text-xs font-medium text-muted-foreground bg-muted rounded">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-[300px] overflow-y-auto p-2">
                <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Recent
                </div>
                {mockPresentations.map((presentation) => (
                  <Link
                    key={presentation._id}
                    href={`/presentations/${presentation._id}`}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <PresentationsIcon />
                    <span className="text-sm text-foreground">{presentation.title}</span>
                  </Link>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-border bg-muted/30">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">↑↓</kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">↵</kbd>
                    open
                  </span>
                </div>
              </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
