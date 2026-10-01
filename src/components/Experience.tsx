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
  location: string;
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
    location: "Karachi, Pakistan",
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
    organization: "Project-based training",
    location: "Full-stack web development",
    period: "Project-based learning",
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

function MilestoneDetails({ milestone, index }: { milestone: Milestone; index: number }) {
  const Icon = milestone.icon;

  return (
    <motion.div
      key={`${index}-${milestone.title}`}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">Milestone / 0{index + 1}</span>
        <span className="grid h-10 w-10 shrink-0 place-items-center border border-white/10 bg-white/[0.04]" style={{ color: "var(--theme-primary)" }}>
          <Icon size={18} aria-hidden="true" />
        </span>
      </div>
      <h4 className="font-display mt-7 text-2xl font-bold leading-tight text-white sm:text-3xl">{milestone.title}</h4>
      <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">{milestone.description}</p>
      <ul className="mt-6 space-y-3">
        {milestone.points.map((point) => (
          <li key={point} className="flex gap-3 text-sm leading-relaxed text-slate-300">
            <Check size={15} className="mt-0.5 shrink-0" style={{ color: "var(--theme-primary)" }} aria-hidden="true" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <div className="mt-7 flex flex-wrap gap-2">
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
    <section id="experience" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--theme-primary)" }}>/ 04 — Experience</div>
            <h2 className="font-display mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">Experience in motion.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
              Internship experience and hands-on trainee projects, organized by the work and skills behind them.
            </p>
          </div>
          <div className="flex w-full gap-2 md:w-auto" aria-label="Choose an experience">
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
                    "min-h-11 flex-1 border px-4 py-2 text-left font-mono text-[10px] uppercase tracking-[0.12em] transition-colors md:flex-none md:text-xs",
                    selected ? "text-white" : "border-white/10 bg-white/[0.03] text-slate-400 hover:text-white",
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
            transition={{ duration: 0.25 }}
            className="border-y border-white/10 py-6 md:py-8"
          >
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <RoleIcon size={18} style={{ color: "var(--theme-primary)" }} aria-hidden="true" />
                  <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">{role.title}</h3>
                  <span
                    className="border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em]"
                    style={{
                      color: "var(--theme-primary)",
                      borderColor: "color-mix(in srgb, var(--theme-primary) 35%, transparent)",
                      backgroundColor: "color-mix(in srgb, var(--theme-primary) 8%, transparent)",
                    }}
                  >
                    {role.status}
                  </span>
                </div>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">{role.summary}</p>
              </div>
              <dl className="grid grid-cols-1 gap-4 border-t border-white/10 pt-4 text-xs sm:grid-cols-3 sm:gap-6 lg:border-0 lg:pt-0">
                <div>
                  <dt className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500"><Building2 size={12} /> Organization</dt>
                  <dd className="mt-1.5 text-slate-200">{role.organization}</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500"><MapPin size={12} /> Context</dt>
                  <dd className="mt-1.5 text-slate-200">{role.location}</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500"><CalendarDays size={12} /> Period</dt>
                  <dd className="mt-1.5 text-slate-200">{role.period}</dd>
                </div>
              </dl>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div>
            <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">Milestones / Select to explore</div>
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
                      className={cn("group flex min-h-16 w-full items-center gap-4 py-4 text-left sm:gap-5 sm:py-5", selected ? "text-white" : "text-slate-400 hover:text-white")}
                    >
                      <span className="w-8 shrink-0 font-mono text-xs" style={selected ? { color: "var(--theme-primary)" } : undefined}>0{index + 1}</span>
                      <span className="font-display min-w-0 flex-1 text-lg font-semibold leading-snug sm:text-xl">{item.title}</span>
                      <motion.span
                        animate={{ width: selected ? 40 : 16, backgroundColor: selected ? "var(--theme-primary)" : "rgba(255,255,255,0.22)" }}
                        transition={{ duration: 0.25 }}
                        className="h-px shrink-0"
                        aria-hidden="true"
                      />
                    </button>
                    {selected && (
                      <div className="pb-6 pl-12 lg:hidden" aria-live="polite">
                        <MilestoneDetails milestone={item} index={index} />
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-28 border border-white/10 bg-white/[0.025] p-8 xl:p-10">
              <AnimatePresence mode="wait">
                <MilestoneDetails key={`${role.id}-${activeMilestone}`} milestone={milestone} index={activeMilestone} />
              </AnimatePresence>
              <div className="mt-10 flex gap-1.5" aria-label={`Milestone ${activeMilestone + 1} of ${role.milestones.length}`}>
                {role.milestones.map((item, index) => (
                  <span
                    key={item.title}
                    className={cn("h-1 transition-all duration-300", index === activeMilestone ? "w-10" : "w-4 bg-white/15")}
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
