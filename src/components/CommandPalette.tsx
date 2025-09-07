"use client";

import { useEffect, useMemo, useState } from "react";

type CommandPaletteProps = {
  isOpen: boolean;
  onClose: () => void;
};

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "ai-ml", label: "AI/ML Playground" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      if ((isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else (document.getElementById("palette-root")?.classList.remove("hidden"));
      }
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return sections;
    return sections.filter((s) => s.label.toLowerCase().includes(q) || s.id.includes(q));
  }, [query]);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div id="palette-root" className="fixed inset-0 z-[100] flex items-start justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-background/95 shadow-xl overflow-hidden">
        <div className="p-3 border-b border-white/10">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sections…"
            className="w-full bg-transparent outline-none text-sm px-2 py-2"
          />
        </div>
        <div className="max-h-80 overflow-y-auto">
          {results.map((s) => (
            <button
              key={s.id}
              onClick={() => go(s.id)}
              className="w-full text-left px-4 py-3 hover:bg-white/5 transition-colors text-sm"
            >
              {s.label}
            </button>
          ))}
          {!results.length && (
            <div className="px-4 py-6 text-sm text-muted-foreground">No results</div>
          )}
        </div>
        <div className="p-3 border-t border-white/10 text-xs text-muted-foreground">Press Esc to close</div>
      </div>
    </div>
  );
}


