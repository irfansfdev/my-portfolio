import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Layers, Gauge, Zap, Route, Palette, Building2, CalendarDays, MapPin, Code2, ServerCog } from "lucide-react";

const roles = [
  {
    id: "internship",
    label: "Front-End Dev Internship",
    eyebrow: "Information Technology Services",
    location: "Karachi, PK",
    period: "01/2026 - 03/2026",
    icon: Building2,
    summary: "A hands-on internship focused on responsive interfaces, performance, component systems, and production-minded front-end delivery.",
    accent: "cyan",
  },
  {
    id: "training",
    label: "Software Development Trainee",
    eyebrow: "Project-based training",
    location: "Full-stack web development",
    period: "Training experience",
    icon: ServerCog,
    summary: "Built and iterated on multiple full-stack web projects while practicing API integration, data modeling, authentication concepts, and responsive product UI.",
    accent: "violet",
  },
] as const;

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
  const [activeRole, setActiveRole] = useState("internship");
  
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
        const maxScroll = scrollW - viewportW + 48; // 48 is right padding
        
        // Agar screen boht badi hai (e.g. Ultra-wide monitor) aur cards already fit hain, tou scroll 0 rakho
        setScrollRange(maxScroll > 0 ? -maxScroll : 0);
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  // YAHAN FIX KIYA HAI: offset lagaya hai taake animation perfectly sync ho jaye
  const { scrollYProgress } = useScroll({ 
    target: targetRef,
    offset: ["start start", "end end"]
  });
  
  const x = useTransform(scrollYProgress, [0, 1], [0, scrollRange]);
  const role = roles.find((item) => item.id === activeRole) || roles[0];

  return (
    <section 
      id="experience" 
      ref={targetRef} 
      // Yahan h-[250vh] kiya hai taake desktop par scroll speed theek rahay
      className={`relative w-full ${isMobile ? "h-auto py-16" : "h-[250vh]"}`}
    >
      <div className={`${isMobile ? "relative block" : "sticky top-0 flex h-screen flex-col justify-center overflow-hidden"}`}>
        
        {/* Header Section */}
          <div className="mb-8 px-4 sm:px-8">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400">/ 04 — Experience</span>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
                Experience <span className="text-gradient">in motion.</span>
              </h2>
              <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-wider text-slate-400">
                {roles.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveRole(item.id)}
                    data-cursor-hover
                    className={`rounded-full border px-3 py-2 transition ${activeRole === item.id ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-200" : "border-white/10 bg-white/5 hover:border-white/25 hover:text-white"}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 grid gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:grid-cols-[1fr_auto] sm:items-center"
            >
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <role.icon size={16} className={role.accent === "cyan" ? "text-cyan-400" : "text-violet-400"} />
                  {role.label}
                </div>
                <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-400">{role.summary}</p>
              </div>
              <div className="flex flex-wrap gap-2 font-mono text-[10px] text-slate-400 sm:justify-end">
                <span className="flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1.5"><Building2 size={11} /> {role.eyebrow}</span>
                <span className="flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1.5"><MapPin size={11} /> {role.location}</span>
                <span className="flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1.5"><CalendarDays size={11} /> {role.period}</span>
              </div>
            </motion.div>
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
          <div 
            style={{ boxShadow: 'inset 0 0 20px color-mix(in srgb, var(--theme-primary) 10%, transparent)' }}
            className="snap-center flex h-[320px] w-[260px] flex-shrink-0 flex-col justify-center rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-violet-600/10 p-6 sm:h-[340px] sm:w-[280px]"
          >
            <span className="font-mono text-5xl font-bold text-white/10">01</span>
            <h3 className="font-display mt-3 text-xl font-bold text-white">Milestones →</h3>
            <p className="mt-2 text-sm text-slate-400">
              {isMobile ? "Swipe to travel through the internship timeline." : "Scroll down to travel through the internship timeline."}
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

          <div
            data-cursor-hover
            className="snap-center glass group relative flex h-[320px] w-[280px] flex-shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-violet-400/20 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-violet-400/50 hover:shadow-2xl hover:shadow-violet-500/20 sm:h-[340px] sm:w-[320px]"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-semibold text-violet-300">[06]</span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300 transition group-hover:rotate-6 group-hover:scale-110">
                <Code2 size={18} />
              </div>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-slate-200 transition group-hover:text-white sm:text-xl">Full-stack project practice</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">Training across React.js, Django, Next.js, Supabase, PHP, SQL, JavaScript, and Tailwind CSS.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["React.js", "Django", "Next.js", "Supabase", "PHP", "SQL", "Tailwind"].map((skill) => (
                  <span key={skill} className="rounded-full border border-violet-400/20 bg-violet-400/10 px-2.5 py-1 font-mono text-[10px] text-violet-200">{skill}</span>
                ))}
              </div>
            </div>
          </div>

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
