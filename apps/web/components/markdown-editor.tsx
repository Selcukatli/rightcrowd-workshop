"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Editor, { OnMount, OnChange } from "@monaco-editor/react";

interface MarkdownEditorProps {
  defaultValue?: string;
  value?: string;
  onChange?: OnChange;
  onMount?: OnMount;
  className?: string;
}

export function MarkdownEditor({
  defaultValue,
  value,
  onChange,
  onMount,
  className,
}: MarkdownEditorProps) {
  const { theme } = useTheme();
  const [editorTheme, setEditorTheme] = useState("vs-dark");

  useEffect(() => {
    setEditorTheme(theme === "dark" ? "vs-dark" : "vs-light");
  }, [theme]);

  return (
    <div className={`h-full w-full min-h-0 border rounded-md overflow-hidden ${theme === 'dark' ? 'bg-[#1e1e1e]' : 'bg-white'} ${className}`}>
      <Editor
        defaultLanguage="markdown"
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        onMount={onMount}
        theme={editorTheme}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          wordWrap: "on",
          padding: { top: 16, bottom: 16 },
          lineNumbers: "off",
          folding: false,
          overviewRulerLanes: 0,
          hideCursorInOverviewRuler: true,
          scrollbar: {
            vertical: "hidden",
            horizontal: "hidden",
            useShadows: false,
          },
        }}
      />
    </div>
  );
}
