import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  CalendarDays,
  Check,
  Code2,
  Database,
  Gauge,
  Layers,
  MapPin,
  Palette,
  Route,
  ServerCog,
  ShieldCheck,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "../utils/cn";

const ease = [0.22, 1, 0.36, 1] as const;

interface Milestone {
  title: string;
  description: string;
  points: string[];
  tools: string[];
  icon: LucideIcon;
}

interface ExperienceRole {
  id: string;
  type: string;
  title: string;
  organization: string;
  context: string;
  contextLabel: string;
  period: string;
  status: string;
  summary: string;
  icon: LucideIcon;
  milestones: Milestone[];
}

const roles: ExperienceRole[] = [
  {
    id: "internship",
    type: "Internship",
    title: "Front-End Developer Intern",
    organization: "Information Technology Services",
    context: "Karachi, Pakistan",
    contextLabel: "Location",
    period: "Jan 2026 - Mar 2026",
    status: "Completed",
    summary: "Hands-on front-end experience focused on responsive interfaces, reusable UI, interaction patterns, and delivery quality.",
    icon: Building2,
    milestones: [
      {
        title: "Responsive interface delivery",
        description: "Built mobile-first interfaces designed to stay clear and usable across common screen sizes.",
        points: ["Applied responsive layouts and breakpoints", "Created consistent page structures", "Considered accessible markup and readable content"],
        tools: ["HTML5", "CSS3", "Bootstrap", "Tailwind CSS"],
        icon: Layers,
      },
      {
        title: "Reusable component patterns",
        description: "Organized interface elements into reusable components and kept styling consistent across views.",
        points: ["Separated UI into maintainable pieces", "Used shared styles and design patterns", "Refined components as requirements changed"],
        tools: ["React.js", "Chakra UI", "CSS variables"],
        icon: Code2,
      },
      {
        title: "Interactive UI behavior",
        description: "Added responsive interactions using browser events and front-end state patterns.",
        points: ["Handled user input and interface events", "Connected controls to visible UI state", "Kept interaction behavior predictable"],
        tools: ["JavaScript", "DOM", "React state"],
        icon: Zap,
      },
      {
        title: "Navigation and application flow",
        description: "Worked with client-side navigation patterns to make multi-view experiences feel cohesive.",
        points: ["Structured routes between application views", "Preserved familiar navigation behavior", "Practiced state-aware page transitions"],
        tools: ["React Router", "React.js", "SPA patterns"],
        icon: Route,
      },
      {
        title: "Quality and visual consistency",
        description: "Reviewed interface quality and refined implementation details for a more consistent finish.",
        points: ["Checked layouts across viewport sizes", "Reviewed loading and rendering behavior", "Applied practical asset and styling improvements"],
        tools: ["Lighthouse", "Web Vitals", "CSS"],
        icon: Gauge,
      },
    ],
  },
  {
    id: "training",
    type: "Trainee",
    title: "Software Development Trainee",
    organization: "Information Technology Services",
    context: "Full-stack web development",
    contextLabel: "Focus",
    period: "15 May 2026 - Present",
    status: "Hands-on practice",
    summary: "Developed project experience across front-end, server-side, and data workflows by building and iterating on web applications.",
    icon: ServerCog,
    milestones: [
      {
        title: "Full-stack project builds",
        description: "Practiced connecting interface work with server-side application structure across portfolio projects.",
        points: ["Built project flows with front-end and backend pieces", "Worked across client and server-rendered patterns", "Iterated on working product previews"],
        tools: ["Next.js", "React.js", "PHP", "Django"],
        icon: Code2,
      },
      {
        title: "Data-backed features",
        description: "Explored relational data workflows and database-backed features in project environments.",
        points: ["Practiced SQL and relational data concepts", "Connected Supabase-backed project flows", "Considered access rules and scoped data"],
        tools: ["Supabase", "SQL", "PostgreSQL", "RLS"],
        icon: Database,
      },
      {
        title: "API and access flows",
        description: "Built familiarity with integrating application flows, authentication concepts, and role-aware views.",
        points: ["Worked with API-driven application patterns", "Practiced authentication and authorization concepts", "Designed role-specific views in project prototypes"],
        tools: ["REST APIs", "Authentication", "Role-based UI"],
        icon: ShieldCheck,
      },
      {
        title: "Product workflow and iteration",
        description: "Turned feature ideas into interactive previews, then refined the experience through focused iteration.",
        points: ["Mapped user actions to interface states", "Practiced modular, maintainable implementation", "Used version-control workflows while iterating"],
        tools: ["JavaScript", "Git", "GitHub", "Tailwind CSS"],
        icon: Workflow,
      },
      {
        title: "Consistent visual systems",
        description: "Applied reusable styling decisions to keep multi-page project experiences coherent and responsive.",
        points: ["Used shared tokens and component styles", "Adapted layouts across device sizes", "Balanced clarity with interactive detail"],
        tools: ["CSS variables", "Responsive UI", "Design systems"],
        icon: Palette,
      },
    ],
  },
];

function MilestoneDetails({ milestone, index, showLargeNumber = false }: { milestone: Milestone; index: number; showLargeNumber?: boolean }) {
  return (
    <motion.div
      key={`${index}-${milestone.title}`}
      initial={{ opacity: 0, y: 18, filter: "blur(5px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -14, filter: "blur(5px)" }}
      transition={{ duration: 0.45, ease }}
      className="relative"
    >
      {showLargeNumber && <div className="font-display text-[7rem] font-extrabold leading-none text-white/6">0{index + 1}</div>}
      <h4 className={cn("font-display mt-7 text-2xl font-bold leading-tight text-white sm:text-3xl", showLargeNumber && "-mt-8")}>{milestone.title}</h4>
      <p className={cn("text-base leading-relaxed text-slate-300 sm:text-[1.1875rem]", showLargeNumber ? "mt-3" : "mt-5")}>{milestone.description}</p>
      <ul className={cn("space-y-2.5", showLargeNumber ? "mt-4" : "mt-6")}>
        {milestone.points.map((point) => (
          <li key={point} className="flex gap-3 text-sm leading-relaxed text-slate-300 sm:text-base">
            <Check size={15} className="mt-0.5 shrink-0" style={{ color: "var(--theme-primary)" }} aria-hidden="true" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <div className={cn("flex flex-wrap gap-2", showLargeNumber ? "mt-5" : "mt-7")}>
        {milestone.tools.map((tool) => (
          <span
            key={tool}
            className="border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-300"
            style={{
              borderColor: "color-mix(in srgb, var(--theme-primary) 30%, transparent)",
              backgroundColor: "color-mix(in srgb, var(--theme-primary) 7%, transparent)",
            }}
          >
            {tool}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const [activeRoleId, setActiveRoleId] = useState(roles[0].id);
  const [activeMilestone, setActiveMilestone] = useState(0);
  const role = roles.find((item) => item.id === activeRoleId) ?? roles[0];
  const milestone = role.milestones[activeMilestone];
  const RoleIcon = role.icon;

  return (
    <section id="experience" className="relative py-14 sm:py-20 md:py-40">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--theme-primary)" }}>/ 04 — Experience</div>
            <h2 className="font-display mt-4 text-[2.5rem] font-bold tracking-tight text-white sm:text-[3.25rem] md:text-[4rem]">Experience in motion.</h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl">
              Internship experience and hands-on trainee projects, organized by the work and skills behind them.
            </p>
          </div>
          <div className="flex w-full gap-2 md:w-auto" role="group" aria-label="Choose an experience">
            {roles.map((item) => {
              const selected = item.id === role.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveRoleId(item.id);
                    setActiveMilestone(0);
                  }}
                  aria-pressed={selected}
                  data-cursor-hover
                  className={cn(
                    "min-h-11 flex-1 border px-4 py-2 text-left font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-300 md:flex-none md:text-xs",
                    selected ? "text-white" : "border-white/10 bg-white/3 text-slate-400 hover:text-white",
                  )}
                  style={selected ? {
                    borderColor: "color-mix(in srgb, var(--theme-primary) 60%, transparent)",
                    backgroundColor: "color-mix(in srgb, var(--theme-primary) 12%, transparent)",
                  } : undefined}
                >
                  {item.type}
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease }}
            className="border-y border-white/10 py-8"
          >
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <RoleIcon size={18} style={{ color: "var(--theme-primary)" }} aria-hidden="true" />
                  <h3 className="font-display text-[1.625rem] font-bold tracking-tight text-white md:text-[2.5rem]">{role.title}</h3>
                  <span
                    className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em]"
                    style={{
                      color: "var(--theme-primary)",
                      borderColor: "color-mix(in srgb, var(--theme-primary) 35%, transparent)",
                      backgroundColor: "color-mix(in srgb, var(--theme-primary) 8%, transparent)",
                    }}
                  >
                    {role.status}
                  </span>
                </div>
                <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-400 md:text-xl">{role.summary}</p>
              </div>
              <dl className="grid grid-cols-1 gap-4 border-t border-white/10 pt-5 sm:grid-cols-3 sm:gap-6 lg:w-64 lg:grid-cols-1 lg:border-0 lg:pt-0 lg:text-right">
                <div>
                  <dt className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500 lg:justify-end"><Building2 size={12} /> Organization</dt>
                  <dd className="mt-1.5 wrap-break-word font-sans text-xs text-slate-200 sm:text-sm">{role.organization}</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500 lg:justify-end"><MapPin size={12} /> {role.contextLabel}</dt>
                  <dd className="mt-1.5 wrap-break-word font-sans text-xs text-slate-200 sm:text-sm">{role.context}</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500 lg:justify-end"><CalendarDays size={12} /> Period</dt>
                  <dd className="mt-1.5 wrap-break-word font-sans text-xs text-slate-200 sm:text-sm">{role.period}</dd>
                </div>
              </dl>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-slate-500">Milestones / Select to explore</div>
            <ol>
              {role.milestones.map((item, index) => {
                const selected = index === activeMilestone;
                return (
                  <li key={item.title} className="border-b border-white/10">
                    <button
                      type="button"
                      onMouseEnter={() => setActiveMilestone(index)}
                      onFocus={() => setActiveMilestone(index)}
                      onClick={() => setActiveMilestone(index)}
                      aria-pressed={selected}
                      data-cursor-hover
                      className={cn("group flex min-h-16 w-full items-center gap-5 border-b border-white/10 py-5 text-left transition-colors md:py-6", selected ? "text-white" : "text-slate-400 hover:text-white")}
                    >
                      <span className="shrink-0 font-mono text-xs tracking-[0.3em]" style={selected ? { color: "var(--theme-primary)" } : undefined}>0{index + 1}</span>
                      <span className="font-display min-w-0 flex-1 text-2xl font-bold tracking-tight leading-snug md:text-3xl">
                        <motion.span animate={{ x: selected ? 12 : 0 }} transition={{ duration: 0.5, ease }} className="inline-block">{item.title}</motion.span>
                      </span>
                      <motion.span
                        animate={{ width: selected ? 48 : 16, backgroundColor: selected ? "var(--theme-primary)" : "rgba(255,255,255,0.22)" }}
                        transition={{ duration: 0.5, ease }}
                        className="h-px shrink-0"
                        aria-hidden="true"
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {selected && (
                        <motion.div
                          key={`${role.id}-${index}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease }}
                          className="overflow-hidden lg:hidden"
                        >
                          <div className="pb-6 pl-10" aria-live="polite">
                            <MilestoneDetails milestone={item} index={index} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-32 h-fit overflow-hidden border border-white/10 bg-white/2.5 p-6 xl:p-8">
              <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--theme-primary) 14%, transparent), transparent 65%)" }} />
              <AnimatePresence mode="wait">
                <MilestoneDetails key={`${role.id}-${activeMilestone}`} milestone={milestone} index={activeMilestone} showLargeNumber />
              </AnimatePresence>
              <div className="relative mt-6 flex items-center gap-2" aria-label={`Milestone ${activeMilestone + 1} of ${role.milestones.length}`}>
                {role.milestones.map((item, index) => (
                  <span
                    key={item.title}
                    className={cn("h-1 transition-all duration-500", index === activeMilestone ? "w-10" : "w-4 bg-white/15")}
                    style={index === activeMilestone ? { backgroundColor: "var(--theme-primary)" } : undefined}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
