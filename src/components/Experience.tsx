import { useRef, useState, useEffect } from "react";
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
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  
  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const updateLayout = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      if (!mobile && carouselRef.current) {
        const scrollW = carouselRef.current.scrollWidth;
        const viewportW = window.innerWidth;
        setScrollRange(-(scrollW - viewportW + 48));
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const { scrollYProgress } = useScroll({ target: targetRef });
  
  const x = useTransform(scrollYProgress, [0, 1], [0, scrollRange]);

  return (
    <section 
      id="experience" 
      ref={targetRef} 
      className={`relative w-full ${isMobile ? "h-auto py-16" : "h-[300vh]"}`}
    >
      <div className={`${isMobile ? "relative block" : "sticky top-0 flex h-screen flex-col justify-center overflow-hidden"}`}>
        
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
        <motion.div 
          ref={carouselRef}
          style={isMobile ? {} : { x }} 
          className={`flex items-center gap-6 px-4 py-8 sm:px-8 ${
            isMobile 
              ? "w-full overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" 
              : "w-max"
          }`}
        >
          
          {/* Intro Card */}
          <div className="snap-center flex h-[320px] w-[260px] flex-shrink-0 flex-col justify-center rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-violet-600/10 p-6 shadow-[inset_0_0_20px_rgba(34,211,238,0.05)] sm:h-[340px] sm:w-[280px]">
            <span className="font-mono text-5xl font-bold text-white/10">01</span>
            <h3 className="font-display mt-3 text-xl font-bold text-white">Milestones →</h3>
            <p className="mt-2 text-sm text-slate-400">
              {isMobile ? "Swipe to travel through the internship timeline." : "Scroll to travel through the internship timeline."}
            </p>
          </div>

          {/* Experience Cards */}
          {milestones.map((m) => (
            <div
              key={m.tag}
              data-cursor-hover
              className="snap-center glass group relative flex h-[320px] w-[280px] flex-shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-white/10 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-500/20 sm:h-[340px] sm:w-[320px]"
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
          <div className="snap-center flex h-[320px] w-[260px] flex-shrink-0 flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-6 text-center transition-all duration-300 hover:border-emerald-400/30 hover:bg-emerald-400/5 sm:h-[340px] sm:w-[280px]">
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
