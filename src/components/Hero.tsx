import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Film, FileText, FolderKanban, Globe, Mail, Phone, ShoppingBag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import LinkedinIcon from "./icons/LinkedinIcon";

function MagneticButton({
  children,
  className,
  href,
  dataAttr,
  target,
  rel,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
  dataAttr?: boolean;
  target?: string;
  rel?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      data-cursor-hover={dataAttr}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={`magnetic-btn transition-transform duration-200 ease-out ${className}`}
    >
      {children}
    </a>
  );
}

const featuredProjects = [
  {
    id: "marketplace",
    name: "Multi-Vendor Marketplace",
    category: "Commerce / Platform",
    headline: "One checkout.\nMany shops.",
    description: "A complete marketplace flow, from storefront to fulfillment.",
    accent: "#35d5e8",
    metric: "1,284",
    metricLabel: "ORDERS THIS MONTH",
    items: ["Customer", "Shop owner", "Admin"],
    technologies: "NEXT.JS  /  SUPABASE",
    icon: ShoppingBag,
    bars: [34, 48, 42, 70, 55, 84, 68, 100],
  },
  {
    id: "education",
    name: "GlobalEd Portal",
    category: "Education / Product",
    headline: "Find your next\nplace to grow.",
    description: "A student portal connecting courses, funding, and opportunity.",
    accent: "#c1ef69",
    metric: "82%",
    metricLabel: "SCHOLARSHIP MATCH",
    items: ["Course finder", "Funding", "Applications"],
    technologies: "REACT  /  POSTGRESQL",
    icon: BookOpen,
    bars: [62, 76, 48, 92, 72, 100, 82, 94],
  },
  {
    id: "movies",
    name: "Movie Recommendation Engine",
    category: "Discovery / Data",
    headline: "A better pick\nfor tonight.",
    description: "A personal discovery feed shaped around your taste.",
    accent: "#f4b55e",
    metric: "96%",
    metricLabel: "TASTE MATCH",
    items: ["Drama", "Sci-fi", "Mystery"],
    technologies: "REACT  /  API",
    icon: Film,
    bars: [48, 84, 62, 100, 72, 90, 55, 78],
  },
];

function ProjectShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const tiltX = useSpring(useMotionValue(0), { stiffness: 120, damping: 18, mass: 0.4 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 120, damping: 18, mass: 0.4 });
  const project = featuredProjects[activeIndex];
  const ProjectIcon = project.icon;

  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % featuredProjects.length);
    }, 3000);
    return () => window.clearInterval(interval);
  }, [shouldReduceMotion]);

  const moveTilt = (event: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    tiltX.set(y * -5);
    tiltY.set(x * 6);
  };

  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const selectProject = (index: number) => setActiveIndex((index + featuredProjects.length) % featuredProjects.length);

  return (
    <div className="relative mx-auto w-full max-w-[560px] perspective-[1400px] lg:max-w-none">
      <motion.div
        style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
        onMouseMove={moveTilt}
        onMouseLeave={resetTilt}
        className="relative border border-white/15 bg-[#080d13] shadow-[0_30px_100px_rgba(0,0,0,0.45)]"
      >
        <div className="flex h-11 items-center justify-between border-b border-white/10 px-4 sm:px-5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-rose-400/80" />
            <span className="h-2 w-2 rounded-full bg-amber-300/80" />
            <span className="h-2 w-2 rounded-full bg-emerald-300/80" />
          </div>
          <div className="flex items-center gap-2 font-mono text-[9px] text-slate-500 sm:text-[10px]">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: project.accent }} />
            irfan.sfdev@gmail.com / work
          </div>
          <span className="font-mono text-[9px] text-slate-600">LIVE</span>
        </div>

        <div className="p-3 sm:p-5">
          <div className="relative isolate min-h-[300px] overflow-hidden border border-white/10 bg-[#0e151d] p-4 sm:min-h-[350px] sm:p-6">
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18]" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
            <motion.div
              key={`wash-${project.id}`}
              initial={shouldReduceMotion ? false : { x: "-100%" }}
              animate={{ x: "150%" }}
              transition={{ duration: shouldReduceMotion ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/2 bg-linear-to-r from-transparent via-white/5 to-transparent"
            />

            <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.16em] text-slate-500 sm:text-[9px]">
              <span>Selected work</span>
              <span aria-live="polite" className="flex items-center gap-1 border border-white/10 px-2 py-1">
                <span style={{ color: project.accent }}>{activeIndex + 1}</span>
                <span className="text-slate-600">/ 3</span>
              </span>
              <span>Interactive preview</span>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={project.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12, filter: "blur(3px)" }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="mt-6 flex items-start justify-between gap-3 sm:mt-8">
                  <div>
                    <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.15em] sm:text-[9px]" style={{ color: project.accent }}>
                      <ProjectIcon size={13} aria-hidden="true" /> {project.category}
                    </div>
                    <h2 className="font-display mt-3 whitespace-pre-line text-2xl font-bold leading-[0.98] text-white sm:text-4xl">{project.headline}</h2>
                    <p className="mt-2 max-w-[230px] text-[9px] leading-relaxed text-slate-400 sm:mt-3 sm:text-[11px]">{project.description}</p>
                  </div>
                  <div className="hidden border border-white/10 bg-black/20 p-2.5 font-mono text-[8px] leading-relaxed text-slate-500 sm:block">
                    <span className="text-slate-300">const</span> experience =<br />
                    <span className="pl-3" style={{ color: project.accent }}>wellDesigned</span>;
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-[1fr_0.8fr] gap-2 sm:mt-7 sm:gap-3">
                  <div className="border border-white/10 bg-[#080d13]/80 p-2.5 sm:p-3">
                    <div className="mb-2 flex items-center justify-between gap-1 font-mono text-[7px] uppercase tracking-widest text-slate-500 sm:text-[8px]">
                      <span>{project.id === "marketplace" ? "Order activity" : project.id === "education" ? "Study planner" : "Your watchlist"}</span>
                      <span style={{ color: project.accent }}>LIVE</span>
                    </div>
                    {project.id === "movies" ? (
                      <div className="grid grid-cols-3 gap-1.5">
                        {project.items.map((item, index) => (
                          <div key={item} className="flex aspect-[0.78] flex-col justify-end border border-white/10 p-1.5" style={{ background: `linear-gradient(160deg, ${project.accent}${index === 1 ? "66" : "28"}, #111820 74%)` }}>
                            <span className="font-mono text-[6px] uppercase text-slate-300 sm:text-[7px]">{item}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        {project.items.map((item, index) => (
                          <div key={item} className="flex items-center gap-2 border border-white/6 bg-white/2.5 px-2 py-1.5">
                            <span className="grid h-5 w-5 shrink-0 place-items-center text-[8px]" style={{ color: project.accent, backgroundColor: `${project.accent}18` }}>{`0${index + 1}`}</span>
                            <span className="min-w-0 flex-1 truncate text-[8px] text-slate-300 sm:text-[9px]">{item}</span>
                            <span className="h-1 w-1 rounded-full" style={{ backgroundColor: project.accent }} />
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="mt-3 flex h-9 items-end gap-1 border-t border-white/6 pt-2 sm:h-11">
                      {project.bars.map((height, index) => (
                        <motion.span
                          key={`${project.id}-${index}`}
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ delay: shouldReduceMotion ? 0 : 0.12 + index * 0.045, duration: shouldReduceMotion ? 0 : 0.42, ease: "easeOut" }}
                          className="flex-1"
                          style={{ backgroundColor: project.accent, opacity: index === project.bars.length - 1 ? 0.9 : 0.34 }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between border border-white/10 bg-[#080d13]/80 p-2.5 sm:p-3">
                    <div>
                      <span className="font-mono text-[7px] uppercase leading-relaxed tracking-widest text-slate-500 sm:text-[8px]">{project.metricLabel}</span>
                      <motion.div
                        key={`metric-${project.id}`}
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.35, delay: 0.1 }}
                        className="font-display mt-1 text-2xl font-bold text-white sm:text-3xl"
                      >
                        {project.metric}
                      </motion.div>
                    </div>
                    <div className="mt-3 space-y-1.5">
                      {project.technologies.split("  /  ").map((technology) => (
                        <span key={technology} className="block border-l pl-2 font-mono text-[7px] uppercase tracking-widest text-slate-400 sm:text-[8px]" style={{ borderColor: project.accent }}>{technology}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-3 right-3 font-mono text-[7px] uppercase tracking-[0.12em] text-slate-600 sm:bottom-4 sm:right-5 sm:text-[8px]">{project.name}</div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 sm:mt-4">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <button type="button" onClick={() => selectProject(activeIndex - 1)} aria-label="Previous project" className="grid h-8 w-8 shrink-0 place-items-center border border-white/10 text-slate-400 transition hover:border-white/30 hover:text-white">
                <ArrowLeft size={13} />
              </button>
              <div className="flex min-w-0 flex-1 items-center gap-1.5">
                {featuredProjects.map((item, index) => (
                  <button key={item.id} type="button" onClick={() => selectProject(index)} aria-label={`Show ${item.name}`} aria-pressed={activeIndex === index} className="group h-8 flex-1" data-cursor-hover>
                    <span className="relative block h-px overflow-hidden bg-white/15">
                      {activeIndex === index && <motion.span layoutId="project-progress" className="absolute inset-y-0 left-0 w-full origin-left" style={{ backgroundColor: item.accent }} />}
                    </span>
                  </button>
                ))}
              </div>
              <button type="button" onClick={() => selectProject(activeIndex + 1)} aria-label="Next project" className="grid h-8 w-8 shrink-0 place-items-center border border-white/10 text-slate-400 transition hover:border-white/30 hover:text-white">
                <ArrowRight size={13} />
              </button>
            </div>
            <a href="#projects" className="flex shrink-0 items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-slate-400 transition-colors hover:text-white sm:text-[9px]">
              All work <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </motion.div>

    </div>
  );
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const firstName = "MUHAMMAD";
  const lastName = "IRFAN";
  const letterVariants = {
    hidden: { opacity: 0, y: "110%", rotate: 8 },
    visible: (index: number) => ({
      opacity: 1,
      y: "0%",
      rotate: 0,
      transition: { delay: shouldReduceMotion ? 0 : 0.24 + index * 0.035, duration: shouldReduceMotion ? 0 : 0.75, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[88svh] w-full items-center overflow-hidden px-5 pb-16 pt-28 sm:px-8 md:min-h-screen md:px-10 md:pb-24 md:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-25" style={{ backgroundImage: "linear-gradient(to right, color-mix(in srgb, var(--theme-primary) 12%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--theme-primary) 12%, transparent) 1px, transparent 1px)", backgroundSize: "72px 72px", maskImage: "linear-gradient(to bottom, black, transparent 92%)" }} />
      <div className="pointer-events-none absolute inset-x-0 top-[28%] -z-10 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1500px] grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(390px,0.9fr)] xl:gap-20">
        <div className="min-w-0">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.12, duration: 0.6 }}
            className="mb-7 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 sm:text-xs"
          >
            <span className="relative flex h-2.5 w-2.5">
              <motion.span
                animate={shouldReduceMotion ? undefined : { scale: [1, 1.8], opacity: [0.75, 0] }}
                transition={{ duration: 1.7, repeat: shouldReduceMotion ? 0 : Infinity, ease: "easeOut" }}
                className="absolute inset-0 rounded-full bg-emerald-400"
              />
              <span className="relative m-auto h-1.5 w-1.5 rounded-full bg-emerald-300" />
            </span>
            Available for Freelance &amp; Full-time
            <span className="text-slate-600">/</span>
            Karachi, Pakistan
          </motion.div>

          <h1 aria-label="Muhammad Irfan" className="font-display select-none font-extrabold leading-[0.82] text-white">
            <span className="block overflow-hidden whitespace-nowrap pb-2 text-3xl max-[374px]:text-2xl sm:text-5xl md:text-6xl lg:text-4xl xl:text-6xl">
              {firstName.split("").map((letter, index) => (
                <motion.span key={`${letter}-${index}`} custom={index} variants={letterVariants} initial="hidden" animate="visible" className="inline-block">
                  {letter}
                </motion.span>
              ))}
            </span>
            <span className="mt-1 block overflow-hidden whitespace-nowrap pb-3 text-3xl max-[374px]:text-2xl text-gradient sm:text-5xl md:text-6xl lg:text-4xl xl:text-5xl">
              {lastName.split("").map((letter, index) => (
                <motion.span key={`${letter}-${index}`} custom={index + firstName.length} variants={letterVariants} initial="hidden" animate="visible" className="inline-block">
                  {letter}
                </motion.span>
              ))}
              <motion.span
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.95, duration: 0.45 }}
                className="ml-1 inline-block origin-bottom text-white"
              >
                .
              </motion.span>
            </span>
          </h1>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 h-px w-24 origin-left sm:mt-8 sm:w-32"
            style={{ backgroundColor: "var(--theme-primary)" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.6 }}
            className="mt-6 max-w-xl sm:mt-7"
          >
            <p className="text-lg font-semibold leading-snug text-white sm:text-2xl">
              Creative Front-End Developer <span style={{ color: "var(--theme-primary)" }}>&amp;</span> UI/UX Specialist
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-400 sm:text-base">
              Engineering high-performance web applications.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.55 }}
            className="mt-7 flex flex-wrap items-center gap-3 sm:mt-9"
          >
            <MagneticButton
              href="#projects"
              dataAttr
              className="group flex min-h-12 items-center gap-3 border border-(--theme-primary) bg-(--theme-primary) px-5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/15 transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-xl sm:px-6"
            >
              <FolderKanban size={16} />
              Projects
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton
              href="/Muhammad_Irfan_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              dataAttr
              className="flex min-h-12 items-center gap-2 border border-white/15 px-5 text-sm font-medium text-slate-200 transition-colors hover:border-white/40 hover:bg-white/5 sm:px-6"
            >
              <FileText size={16} style={{ color: "var(--theme-primary)" }} />
              View Resume
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.15, duration: 0.6 }}
            className="mt-8 flex items-center gap-5 border-t border-white/10 pt-5 sm:mt-10"
          >
            {[
              { icon: LinkedinIcon, href: "https://linkedin.com/in/muhammad-irfan99", label: "LinkedIn" },
              { icon: Globe, href: "https://muhammad-irfan-ivpl2jb.gamma.site", label: "Live Web" },
              { icon: Mail, href: "https://mail.google.com/mail/?view=cm&fs=1&to=irfan.sfdev@gmail.com", label: "Email" },
              { icon: Phone, href: "tel:+923412061108", label: "Phone" },
            ].map((item) => {
              const isExternal = item.href.startsWith("http");
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={isExternal ? "_blank" : "_self"}
                  rel={isExternal ? "noreferrer" : undefined}
                  data-cursor-hover
                  aria-label={item.label}
                  title={item.label}
                  className="text-slate-500 transition-colors hover:text-white"
                >
                  <item.icon size={17} />
                </a>
              );
            })}
            <a href="#skills" className="ml-auto flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500 transition-colors hover:text-white sm:text-[10px]">
              Scroll to explore <ArrowDown size={13} />
            </a>
          </motion.div>
        </div>

        <ProjectShowcase />
      </div>
    </section>
  );
}