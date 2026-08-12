import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Layers, Gauge, Zap, Route, Palette, Building2, CalendarDays, MapPin } from "lucide-react";

const milestones = [
  {
    tag: "[01]",
    title: "Responsive UI Architecture",
    desc: "Engineered fluid, mobile-first layouts ensuring pixel-perfect consistency across breakpoints.",
    skills: ["Bootstrap", "Tailwind CSS", "HTML5"],
    icon: Layers,
  },
  {
    tag: "[02]",
    title: "Speed & Optimization",
    desc: "Audited and optimized rendering performance, cutting load times through smarter asset delivery.",
    skills: ["Lighthouse", "Web Vitals", "Assets Opt"],
    icon: Gauge,
  },
  {
    tag: "[03]",
    title: "Dynamic Event-Driven UI",
    desc: "Built interactive modules — from event delegation to DOM state syncing — with zero framework overhead.",
    skills: ["Vanilla JS", "DOM API", "ES6+"],
    icon: Zap,
  },
  {
    tag: "[04]",
    title: "SPA Routing Flows",
    desc: "Architected seamless single-page navigation flows, enabling instant view transitions without full reloads.",
    skills: ["React Router", "React.js", "State Mgt"],
    icon: Route,
  },
  {
    tag: "[05]",
    title: "Design System Standard",
    desc: "Unified UI components, establishing a scalable, themeable design language across the product.",
    skills: ["Chakra UI", "Figma", "CSS Vars"],
    icon: Palette,
  },
];

export default function Experience() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-78%"]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <section id="experience" className="relative w-full px-4 py-20">
        {/* Header Section */}
        <div className="mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400">/ 04 — Experience</span>
          <div className="mt-3 flex flex-col gap-4">
            <h2 className="font-display text-4xl font-bold text-white">
              Front-End Dev <span className="text-gradient">Internship</span>
            </h2>
            <div className="flex flex-col gap-2 font-mono text-xs text-slate-400">
              <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 w-fit">
                <Building2 size={13} className="text-cyan-400" /> Information Technology Services
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 w-fit">
                <MapPin size={13} className="text-violet-400" /> Karachi, PK
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 w-fit">
                <CalendarDays size={13} className="text-amber-400" /> 01/2026 – 03/2026
              </span>
            </div>
          </div>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l border-white/10 ml-3 pl-8 flex flex-col gap-8">
          {milestones.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.tag} className="relative">
                {/* Timeline Dot */}
                <div className="absolute -left-[44px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--bg)] border border-cyan-400 text-cyan-400 shadow-md">
                  <Icon size={10} />
                </div>
                
                {/* Card */}
                <div className="glass rounded-2xl border border-white/10 p-5">
                  <span className="font-mono text-xs font-semibold text-cyan-400">
                    {m.tag}
                  </span>
                  <h3 className="font-display mt-2 text-lg font-bold text-white">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                    {m.desc}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {m.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/5 bg-white/5 px-2.5 py-0.5 font-mono text-[9px] text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Outro Milestone */}
          <div className="relative">
            <div className="absolute -left-[44px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--bg)] border border-emerald-400 text-emerald-400 shadow-md">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <div className="glass rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5">
              <p className="font-mono text-sm font-semibold text-emerald-300">Internship Completed</p>
              <p className="mt-1 text-xs text-slate-500">Ready for the next full-time challenge.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" ref={targetRef} className="relative h-[300vh] w-full">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        
        {/* Header Section */}
        <div className="mb-8 px-4 sm:px-8">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400">/ 04 — Experience</span>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
              Front-End Dev <span className="text-gradient">Internship</span>
            </h2>
            <div className="flex flex-wrap gap-3 font-mono text-xs text-slate-400">
              <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 backdrop-blur-sm">
                <Building2 size={13} className="text-cyan-400" /> Information Technology Services
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 backdrop-blur-sm">
                <MapPin size={13} className="text-violet-400" /> Karachi, PK
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 backdrop-blur-sm">
                <CalendarDays size={13} className="text-amber-400" /> 01/2026 – 03/2026
              </span>
            </div>
          </div>
        </div>

        {/* Horizontal Scrolling Cards */}
        <motion.div style={{ x }} className="flex items-center gap-6 px-4 py-8 sm:px-8">
          
          {/* Intro Card */}
          <div className="flex h-[320px] w-[260px] flex-shrink-0 flex-col justify-center rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-violet-600/10 p-6 shadow-[inset_0_0_20px_rgba(34,211,238,0.05)] sm:h-[340px] sm:w-[280px]">
            <span className="font-mono text-5xl font-bold text-white/10">01</span>
            <h3 className="font-display mt-3 text-xl font-bold text-white">Milestones →</h3>
            <p className="mt-2 text-sm text-slate-400">Scroll to travel through the internship timeline.</p>
          </div>

          {/* Experience Cards */}
          {milestones.map((m) => (
            <div
              key={m.tag}
              data-cursor-hover
              className="glass group relative flex h-[320px] w-[280px] flex-shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-white/10 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-500/20 sm:h-[340px] sm:w-[320px]"
            >
              {/* Top Row: Tag & Icon */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-semibold text-slate-500 transition-colors group-hover:text-cyan-400">
                  {m.tag}
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-slate-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-400/10 group-hover:text-cyan-300">
                  <m.icon size={18} />
                </div>
              </div>
              
              {/* Bottom Row: Text & Skills */}
              <div className="relative z-10">
                <h3 className="font-display text-lg font-bold text-slate-200 transition-colors duration-300 group-hover:text-white sm:text-xl">
                  {m.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400 line-clamp-3">
                  {m.desc}
                </p>
                
                {/* Tech Stack Pills */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {m.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="rounded-full border border-white/5 bg-white/5 px-2.5 py-1 font-mono text-[10px] text-slate-300 transition-colors group-hover:border-cyan-400/20 group-hover:bg-cyan-400/10 group-hover:text-cyan-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Subtle background glow on hover */}
              <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-cyan-500/0 blur-2xl transition-colors duration-500 group-hover:bg-cyan-500/10" />
            </div>
          ))}

          {/* Outro Card */}
          <div className="flex h-[320px] w-[260px] flex-shrink-0 flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-6 text-center transition-all duration-300 hover:border-emerald-400/30 hover:bg-emerald-400/5 sm:h-[340px] sm:w-[280px]">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <p className="font-mono text-sm font-semibold text-emerald-300">Internship Completed</p>
            <p className="mt-2 text-xs text-slate-500">Ready for the next full-time challenge.</p>
          </div>

        </motion.div>
      </div>
    </section>
  );
}