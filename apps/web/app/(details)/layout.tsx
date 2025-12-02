"use client";

import { Sidebar } from "@/components/sidebar";
import { useSidebarStore } from "@/stores/sidebar";
import { motion } from "framer-motion";

export default function DetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isCollapsed } = useSidebarStore();
  const marginLeft = isCollapsed ? 72 : 220;

  return (
    <div className="flex min-h-screen">
      <Sidebar defaultCollapsed={true} />
      <motion.main
        initial={false}
        animate={{ marginLeft }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="flex-1"
      >
        {children}
      </motion.main>
    </div>
  );
}
