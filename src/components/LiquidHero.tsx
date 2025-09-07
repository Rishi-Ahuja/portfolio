"use client";

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

type LiquidHeroProps = {
  onOpenPalette: () => void;
};

export default function LiquidHero({ onOpenPalette }: LiquidHeroProps) {
  const blobRef = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let t = 0;
    const el1 = blobRef.current;
    const el2 = blob2Ref.current;
    const loop = () => {
      t += 0.006;
      if (el1) {
        const x = Math.sin(t) * 40;
        const y = Math.cos(t * 0.8) * 30;
        el1.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.05)`;
      }
      if (el2) {
        const x2 = Math.cos(t * 0.7) * 50;
        const y2 = Math.sin(t * 0.9) * 35;
        el2.style.transform = `translate3d(${x2}px, ${y2}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="hero" className="relative h-[78vh] md:h-[84vh] overflow-hidden">
      {/* Kinetic background dots */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-16 w-[44rem] h-[44rem] rounded-full bg-gradient-to-tr from-rose-600/20 to-red-400/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 w-[38rem] h-[38rem] rounded-full bg-gradient-to-tr from-indigo-600/20 to-cyan-400/10 blur-3xl" />
      </div>

      {/* Liquid glass core */}
      <div className="relative h-full flex items-center justify-center">
        <div className="relative w-full max-w-5xl px-4">
          <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden">
            {/* Gooey blobs */}
            <div className="absolute inset-0">
              <div ref={blobRef} className="absolute left-8 top-8 w-40 h-40 rounded-full bg-rose-500/25 blur-2xl" />
              <div ref={blob2Ref} className="absolute right-10 bottom-10 w-56 h-56 rounded-full bg-indigo-500/25 blur-3xl" />
              <div className="absolute left-1/2 -translate-x-1/2 top-6 w-80 h-24 rounded-full bg-white/10 blur-2xl" />
            </div>

            {/* Subtle 3D orb */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.85]">
              <Canvas camera={{ position: [0, 0, 2.6], fov: 45 }}>
                <ambientLight intensity={0.55} />
                <pointLight position={[2, 3, 4]} intensity={1.2} />
                <Orb />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
              </Canvas>
            </div>

            {/* Content grid, intentionally minimal */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
              <div className="p-6 md:p-8">
                <div className="text-xs uppercase tracking-widest text-white/60">Focus</div>
                <div className="mt-2 text-lg md:text-xl font-medium">AI/ML • Systems • UX</div>
                <div className="mt-3 text-sm text-white/70">Hands-on builds and research-grade rigor. No fluff.</div>
              </div>
              <div className="p-6 md:p-8">
                <div className="text-xs uppercase tracking-widest text-white/60">Now</div>
                <div className="mt-2 text-lg md:text-xl font-medium">Waterloo • BCS '29</div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-1 rounded-md border border-white/10 bg-white/5">FinBERT</span>
                  <span className="px-2 py-1 rounded-md border border-white/10 bg-white/5">R3F</span>
                  <span className="px-2 py-1 rounded-md border border-white/10 bg-white/5">D3</span>
                  <span className="px-2 py-1 rounded-md border border-white/10 bg-white/5">LangChain</span>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <div className="text-xs uppercase tracking-widest text-white/60">Navigate</div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  {[
                    { id: "projects", label: "Projects" },
                    { id: "ai-ml", label: "Playground" },
                    { id: "blog", label: "Blog" },
                    { id: "contact", label: "Contact" },
                  ].map((s) => (
                    <a key={s.id} href={`#${s.id}`} className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                      {s.label}
                    </a>
                  ))}
                </div>
                <div className="mt-3 text-xs text-white/60">Or press <button onClick={onOpenPalette} className="underline decoration-dotted underline-offset-4">⌘K</button></div>
              </div>
            </div>

            {/* Watermark signature */}
            <div className="pointer-events-none absolute top-3 right-4 z-10 text-[11px] tracking-wide text-white/55">
              Rishi Ahuja — Portfolio
            </div>
          </div>

          {/* Below-card micro marquee */}
          <div className="mt-5 overflow-hidden rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">
            <div className="animate-[marquee_24s_linear_infinite] whitespace-nowrap text-white/70 text-xs">
              <span className="px-6 py-3 inline-block">Vedantu • SWE Intern</span>
              <span className="px-6 py-3 inline-block">Founder • Tinker Zoo</span>
              <span className="px-6 py-3 inline-block">Tech Ops • Wadhwa</span>
              <span className="px-6 py-3 inline-block">Magnificent Seven Sentiment</span>
              <span className="px-6 py-3 inline-block">ManuQuill</span>
              <span className="px-6 py-3 inline-block">MarmoUI 2.0</span>
              <span className="px-6 py-3 inline-block">Teacher Buddy</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </section>
  );
}

function Orb() {
  return (
    <mesh rotation={[0.4, 0.2, 0]}>
      <icosahedronGeometry args={[1.08, 2]} />
      <meshStandardMaterial color="#ffffff" wireframe opacity={0.25} transparent />
    </mesh>
  );
}


