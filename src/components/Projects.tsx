import { useEffect, useRef, useState, type ComponentType } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "../utils/cn";
import ChickBiteSimulator from "./projects/ChickBiteSimulator";
import EducationProject from "./projects/EducationProject";
import MovieProject from "./projects/MovieProject";
import MarketplaceProject from "./projects/MarketplaceProject";
import HospitalProject from "./projects/HospitalProject";
import PhpStoreProject from "./projects/PhpStoreProject";

const ease = [0.22, 1, 0.36, 1] as const;

const contentVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.28 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const riseVariants = {
  hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease } },
};

const revealVariants = {
  hidden: { opacity: 0, scale: 0.96, clipPath: "inset(0 0 100% 0 round 8px)" },
  show: {
    opacity: 1,
    scale: 1,
    clipPath: "inset(0 0 0% 0 round 8px)",
    transition: { duration: 0.9, ease },
  },
};

function ChickBiteShowcase() {
  return (
    <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_270px] xl:items-center">
      <div className="min-w-0 px-1 py-2 sm:px-3">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-orange-400 sm:text-[10px]">Fast food / ordering</span>
        <h3 className="font-display mt-3 text-3xl font-bold text-white sm:text-4xl">ChickBite</h3>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">Fast Food Web App</p>
        <p className="mt-4 max-w-xl text-xs leading-relaxed text-slate-300 sm:text-sm">
          A blazing-fast food ordering experience built for real appetite. Browse a live menu, build a cart in real time, and check out through a playful, brand-driven interface.
        </p>
        <p className="mt-3 border-l-2 border-orange-400 pl-3 text-[11px] leading-relaxed text-orange-200/80 sm:text-xs">
          Add a menu item in the phone preview to see the cart and checkout update.
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {["React", "Tailwind CSS", "React Router", "Context API"].map((technology) => (
            <span key={technology} className="border border-orange-400/25 bg-orange-400/5 px-2 py-1 font-mono text-[8px] uppercase tracking-widest text-orange-200 sm:text-[9px]">
              {technology}
            </span>
          ))}
        </div>
      </div>
      <div className="min-w-0 overflow-hidden">
        <ChickBiteSimulator />
      </div>
    </div>
  );
}

interface ProjectEntry {
  id: string;
  title: string;
  category: string;
  accent: string;
  Preview: ComponentType;
}

const projects: ProjectEntry[] = [
  { id: "marketplace", title: "Multi-Vendor Marketplace", category: "Commerce / Marketplace", accent: "#06b6d4", Preview: MarketplaceProject },
  { id: "hospital", title: "Hospital Management System", category: "Healthcare / Operations", accent: "#a78bfa", Preview: HospitalProject },
  { id: "chickbite", title: "ChickBite", category: "Food / Commerce", accent: "#fb923c", Preview: ChickBiteShowcase },
  { id: "education", title: "GlobalEd Portal", category: "Education / Platform", accent: "#818cf8", Preview: EducationProject },
  { id: "php-store", title: "PHP E-Commerce Website", category: "Commerce / PHP + SQL", accent: "#fbbf24", Preview: PhpStoreProject },
  { id: "movie-engine", title: "Movie Recommendation Engine", category: "Discovery / Data", accent: "#34d399", Preview: MovieProject },
];

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px) and (hover: hover)");
    const update = () => setDesktop(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return desktop;
}

function DesktopPanel({
  project,
  index,
  active,
  onActivate,
}: {
  project: ProjectEntry;
  index: number;
  active: boolean;
  onActivate: () => void;
}) {
  const Preview = project.Preview;
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={false}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      tabIndex={0}
      aria-label={`${project.title} project panel`}
      aria-current={active ? "true" : undefined}
      transition={{ flexGrow: { type: "spring", stiffness: 70, damping: 20, mass: 0.9 } }}
      animate={{ flexGrow: active ? 6 : 1 }}
      className={cn(
        "group relative min-h-[620px] min-w-0 overflow-hidden outline-none",
        "border-b border-white/10 lg:border-b-0 lg:border-r last:border-r-0",
      )}
      style={{
        flexBasis: 0,
        flexShrink: 1,
        borderColor: active ? `${project.accent}55` : undefined,
      }}
    >
      {/* dim overlay (filter se kaafi halka hai) */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-30 bg-[#05070d]"
        initial={false}
        animate={{ opacity: active ? 0 : 0.45 }}
        transition={{ duration: 0.6, ease }}
      />

      {/* accent glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        initial={false}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.9, ease }}
        style={{
          background: `radial-gradient(ellipse 80% 55% at 50% 0%, ${project.accent}26, transparent 70%)`,
        }}
      />

      {/* top line: center se dono taraf failti hai */}
      <motion.span
        className="absolute left-1/2 top-0 z-20 h-0.5 -translate-x-1/2"
        initial={false}
        animate={{ width: active ? "100%" : "0%" }}
        transition={{ duration: 0.7, ease }}
        style={{ backgroundColor: project.accent, boxShadow: `0 0 18px ${project.accent}` }}
      />

      {/* collapsed state */}
      <AnimatePresence initial={false}>
        {!active && (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.4, delay: 0.15, ease }}
            className="absolute inset-0 flex flex-col justify-between p-4 lg:p-5"
          >
            <span className="font-mono text-[10px] tracking-[0.24em]" style={{ color: project.accent }}>
              {number}
            </span>
            <div className="flex min-h-0 items-end justify-between gap-3">
              <h3
                className="font-display whitespace-nowrap text-xl font-bold text-white/80 transition-colors duration-300 group-hover:text-white"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                {project.title}
              </h3>
              <span className="grid h-8 w-8 shrink-0 place-items-center border border-white/15 text-slate-400 transition-all duration-300 group-hover:rotate-90 group-hover:border-white/40 group-hover:text-white">
                <Plus size={13} />
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* expanded state */}
      <AnimatePresence initial={false}>
        {active && (
          <motion.div
            key="expanded"
            variants={contentVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="relative z-10 flex min-h-[620px] flex-col"
          >
            {/* light sweep, ek baar chalta hai */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/3 -skew-x-12"
              initial={{ x: "-120%", opacity: 0 }}
              animate={{ x: "420%", opacity: [0, 1, 0] }}
              transition={{ duration: 1.1, delay: 0.1, ease }}
              style={{
                background: `linear-gradient(90deg, transparent, ${project.accent}30, transparent)`,
              }}
            />

            <motion.div
              variants={riseVariants}
              className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5"
            >
              <div className="flex min-w-0 items-center gap-3 font-mono text-[9px] uppercase tracking-[0.16em] sm:text-[10px]">
                <span style={{ color: project.accent }}>{number}</span>
                <motion.span
                  className="h-px w-6 shrink-0 origin-left bg-white/20"
                  variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.6, ease } } }}
                />
                <span className="truncate text-slate-400">{project.category}</span>
              </div>
              <span className="shrink-0 font-mono text-[8px] uppercase tracking-[0.14em] text-slate-600">
                Selected
              </span>
            </motion.div>

            <motion.div
              variants={revealVariants}
              className="min-h-0 flex-1 overflow-y-auto border-t border-white/10 p-3 sm:p-5"
            >
              <Preview />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

function MobileProject({
  project,
  index,
  open,
  onToggle,
}: {
  project: ProjectEntry;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const Preview = project.Preview;
  const number = String(index + 1).padStart(2, "0");
  const panelId = `project-preview-${project.id}`;

  return (
    <article className="border-b border-white/10 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center gap-4 px-4 py-5 text-left sm:px-5"
      >
        <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: project.accent }}>{number}</span>
        <span className="min-w-0 flex-1">
          <span className="font-display block truncate text-lg font-bold text-white">{project.title}</span>
          <span className="mt-1 block truncate font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500">{project.category}</span>
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0, borderColor: open ? project.accent : "rgba(255,255,255,0.2)" }}
          transition={{ duration: 0.45, ease }}
          className="grid h-9 w-9 shrink-0 place-items-center border text-slate-300"
        >
          <Plus size={15} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.62, ease }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/10 px-3 py-4 sm:px-5 sm:py-5">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease }}
              >
                <Preview />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

export default function Projects() {
  const desktop = useIsDesktop();
  const [active, setActive] = useState(0);
  const [mobileOpen, setMobileOpen] = useState<number | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // hover intent: mouse tez sweep karne pe panels flicker nahi karenge
  const activateWithIntent = (index: number) => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setActive(index), 90);
  };

  useEffect(() => () => clearTimeout(hoverTimer.current), []);

  return (
    <section id="projects" className="relative w-full px-4 py-14 sm:px-8 sm:py-20 lg:py-28">
      <div className="mx-auto mb-9 flex max-w-[1500px] flex-col gap-5 sm:mb-12 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-400 sm:text-xs">/ 05 — Selected Work</span>
          <h2 className="font-display mt-3 text-4xl font-bold text-white sm:text-6xl">
            Projects you can <span className="text-gradient">touch.</span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Interactive product ideas, systems, and the engineering behind them.
          </p>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500 sm:text-[10px]">
          {String(projects.length).padStart(2, "0")} projects / 2025 - 2026
        </span>
      </div>

      {desktop ? (
        <div className="mx-auto max-w-[1500px] border border-white/10 bg-black/10">
          <div className="flex items-stretch">
            {projects.map((project, index) => (
              <DesktopPanel
                key={project.id}
                project={project}
                index={index}
                active={active === index}
                onActivate={() => activateWithIntent(index)}
              />
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 sm:px-5">
            <span className="min-w-0 truncate font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500 sm:text-[10px]">
              <span style={{ color: projects[active].accent }}>{String(active + 1).padStart(2, "0")}</span>
              <span className="mx-2 text-slate-700">/</span>
              {projects[active].title}
            </span>
            <div className="ml-4 flex shrink-0 items-center gap-1.5">
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Open ${project.title}`}
                  aria-pressed={active === index}
                  className={cn("h-1 transition-all duration-300", active === index ? "w-7" : "w-2 bg-white/20")}
                  style={active === index ? { backgroundColor: project.accent } : undefined}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-4xl border-y border-white/10 sm:border">
          {projects.map((project, index) => (
            <MobileProject
              key={project.id}
              project={project}
              index={index}
              open={mobileOpen === index}
              onToggle={() => setMobileOpen(mobileOpen === index ? null : index)}
            />
          ))}
        </div>
      )}
    </section>
  );
}