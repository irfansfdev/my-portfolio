import { useRef } from "react";
import { motion } from "framer-motion";

const coreSkills = ["React.js", "JavaScript (ES6+)", "Apex", "HTML5", "CSS3", "Next.js"];
const stylingSkills = ["Tailwind CSS", "Bootstrap", "Chakra UI"];
const archSkills = ["React Router", "DOM Manipulation", "Event Handling", "Responsive UI"];
const interests = [
  { label: "Cricket", emoji: "🏏" },
  { label: "MMA", emoji: "🥋" },
  { label: "Football", emoji: "⚽" },
  { label: "Video Games", emoji: "🎮" },
];

function Pill({
  label,
  emoji,
  colorClass,
  index,
}: {
  label: string;
  emoji?: string;
  colorClass: string;
  index: number;
}) {
  const constraintsRef = useRef(null);
  return (
    <motion.div
      drag
      dragElastic={0.6}
      dragTransition={{ bounceStiffness: 400, bounceDamping: 12 }}
      whileDrag={{ scale: 1.15, zIndex: 20, cursor: "grabbing" }}
      whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, scale: 0.5, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, type: "spring", stiffness: 200, damping: 15 }}
      data-cursor-hover
      className={`m-1.5 inline-flex cursor-grab select-none items-center gap-2 rounded-full border px-4 py-2.5 font-mono text-xs font-medium sm:text-sm ${colorClass} active:cursor-grabbing`}
      ref={constraintsRef}
    >
      {emoji && <span>{emoji}</span>}
      {label}
    </motion.div>
  );
}

export default function SkillsPlayground() {
  return (
    <section id="skills" className="relative min-h-screen w-full overflow-hidden px-4 py-28 sm:px-8">
      <div className="pointer-events-none absolute left-10 top-1/3 h-72 w-72 rounded-full bg-cyan-500/10 blur-[110px]" />
      <div className="pointer-events-none absolute right-10 bottom-1/4 h-72 w-72 rounded-full bg-violet-600/10 blur-[110px]" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400">/ 02 — Toolkit</span>
        <h2 className="font-display mt-3 text-4xl font-bold text-white sm:text-6xl">
          Drag. Throw. <span className="text-gradient">Explore.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-slate-400 sm:text-base">
          A living skill field, not a boring grid. Grab any node and fling it around — every pill here
          represents a technology I use to craft interfaces that feel alive.
        </p>
      </div>

      <div className="relative z-10 mx-auto mt-16 max-w-6xl">
        <div className="mb-6 text-center font-mono text-[11px] uppercase tracking-widest text-slate-500">Core Development</div>
        <div className="flex flex-wrap justify-center">
          {coreSkills.map((s, i) => (
            <Pill key={s} label={s} index={i} colorClass="border-cyan-400/40 bg-cyan-400/10 text-cyan-200 shadow-md shadow-cyan-500/10" />
          ))}
        </div>

        <div className="mb-6 mt-12 text-center font-mono text-[11px] uppercase tracking-widest text-slate-500">Styling &amp; UI Systems</div>
        <div className="flex flex-wrap justify-center">
          {stylingSkills.map((s, i) => (
            <Pill key={s} label={s} index={i} colorClass="border-violet-400/40 bg-violet-400/10 text-violet-200 shadow-md shadow-violet-500/10" />
          ))}
        </div>

        <div className="mb-6 mt-12 text-center font-mono text-[11px] uppercase tracking-widest text-slate-500">Architecture &amp; Interaction</div>
        <div className="flex flex-wrap justify-center">
          {archSkills.map((s, i) => (
            <Pill key={s} label={s} index={i} colorClass="border-fuchsia-400/40 bg-fuchsia-400/10 text-fuchsia-200 shadow-md shadow-fuchsia-500/10" />
          ))}
        </div>

        <div className="mb-6 mt-12 text-center font-mono text-[11px] uppercase tracking-widest text-slate-500">Beyond The Screen</div>
        <div className="flex flex-wrap justify-center">
          {interests.map((s, i) => (
            <Pill key={s.label} label={s.label} emoji={s.emoji} index={i} colorClass="border-amber-400/40 bg-amber-400/10 text-amber-200 shadow-md shadow-amber-500/10" />
          ))}
        </div>
      </div>

      <p className="relative z-10 mt-14 text-center font-mono text-[10px] uppercase tracking-widest text-slate-600">
        * physics-enabled — try dragging a pill *
      </p>
    </section>
  );
}
