"use client";

import { useEffect, useRef, useState } from "react";
import CommandPalette from "@/components/CommandPalette";
import LiquidHero from "@/components/LiquidHero";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import AIMLPlaygroundSection from "@/components/sections/AIMLPlaygroundSection";
import ContactSection from "@/components/sections/ContactSection";

const sectionIds = ["hero","about","experience","projects","ai-ml","contact"];

export default function Home() {
  const [current, setCurrent] = useState("hero");
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 120;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= y) { setCurrent(sectionIds[i]); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll as EventListener);
  }, []);

  const NavBar = () => {
    const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
    const trackRef = useRef<HTMLDivElement | null>(null);

    const labelFor = (id: string) => {
      if (id === "ai-ml") return "Playground";
      if (id === "hero") return "Home";
      return id.charAt(0).toUpperCase() + id.slice(1);
    };

    useEffect(() => {
      const el = linkRefs.current[current ?? ""];
      const container = trackRef.current?.parentElement;
      if (el && container && trackRef.current) {
        const rect = el.getBoundingClientRect();
        const crect = container.getBoundingClientRect();
        const left = rect.left - crect.left - 12; // centered padding
        const width = rect.width + 24;
        trackRef.current.style.transform = `translateX(${left}px)`;
        trackRef.current.style.width = `${width}px`;
        trackRef.current.style.opacity = "1";
      }
    }, [current]);

    useEffect(() => {
      const onResize = () => {
        const el = linkRefs.current[current ?? ""];
        const container = trackRef.current?.parentElement;
        if (el && container && trackRef.current) {
          const rect = el.getBoundingClientRect();
          const crect = container.getBoundingClientRect();
          const left = rect.left - crect.left - 12;
          const width = rect.width + 24;
          trackRef.current.style.transform = `translateX(${left}px)`;
          trackRef.current.style.width = `${width}px`;
          trackRef.current.style.opacity = "1";
        }
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, [current]);

    const currentLabel = labelFor(current);

    return (
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4">
          <div className="h-20 flex items-center justify-center">
            {/* Liquid glass pill container */}
            <nav
              className="relative w-full max-w-5xl mx-auto px-3 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_40px_rgba(0,0,0,0.35)] overflow-hidden"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 10px 40px rgba(0,0,0,0.35)" }}
            >
              {/* gradient overlay */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_200px_at_50%_-200px,rgba(255,255,255,0.08),rgba(255,255,255,0)_60%)]" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-rose-600/10 via-sky-500/10 to-cyan-500/10" />
              <div className="flex items-center justify-between gap-2">
                {/* Left cap shows active section */}
                <div className="hidden md:flex items-center">
                  <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 bg-white/5">
                    <span className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
                    <span className="text-sm text-white/80 font-medium">{currentLabel}</span>
                  </span>
                </div>

                {/* Center links with animated track */}
                <div className="relative flex-1 flex items-center justify-center gap-10">
                  {/* moving track */}
                  <div
                    ref={trackRef}
                    className="pointer-events-none absolute top-1/2 -translate-y-1/2 h-10 rounded-full border border-cyan-300/30 bg-cyan-300/5 transition-all duration-300 ease-out opacity-0"
                    style={{ left: 0, width: 0 }}
                  />
                  {sectionIds.slice(0).map((id) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      ref={(el) => {
                        linkRefs.current[id] = el;
                      }}
                      className={`relative text-[17px] tracking-wide transition-colors ${
                        current === id ? "text-cyan-200" : "text-cyan-200/70 hover:text-cyan-200"
                      }`}
                    >
                      {labelFor(id)}
                    </a>
                  ))}
                </div>

                {/* Right: palette button */}
                <button
                  onClick={() => setPaletteOpen(true)}
                  className="hidden md:inline-flex px-5 py-3 rounded-full border border-white/15 bg-white/5 text-cyan-100/80 hover:text-white"
                  aria-label="Open command palette"
                >
                  ⌘K
                </button>
              </div>

              {/* Outer glow ring like in screenshot */}
              <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/10" />
            </nav>
          </div>
        </div>
      </header>
    );
  };

  const Section = ({ id, title }: { id: string; title: string }) => (
    <section id={id} className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <div className="rounded-xl border border-border/20 bg-card/40 p-6">Placeholder content for {title}</div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main className="pt-16">
         <LiquidHero onOpenPalette={() => setPaletteOpen(true)} />
         <AboutSection />
         <ExperienceSection />
         <ProjectsSection />
         <AIMLPlaygroundSection />
         <ContactSection />
      </main>
      <CommandPalette isOpen={paletteOpen} onClose={()=>setPaletteOpen(false)} />
    </div>
  );
}
