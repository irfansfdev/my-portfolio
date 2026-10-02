import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "../utils/cn";

type SkillGroup = "Core" | "Frameworks" | "Styling" | "Backend & Data" | "Platform" | "Tools";

interface Skill {
  name: string;
  group: SkillGroup;
  weight: 1 | 2 | 3;
}

interface PositionedSkill extends Skill {
  x: number;
  y: number;
}

const skills: Skill[] = [
  { name: "React.js", group: "Frameworks", weight: 2 },
  { name: "JavaScript (ES6+)", group: "Core", weight: 2 },
  { name: "Apex", group: "Platform", weight: 3 },
  { name: "HTML5", group: "Core", weight: 3 },
  { name: "CSS3", group: "Styling", weight: 3 },
  { name: "Next.js", group: "Frameworks", weight: 2 },
  { name: "Tailwind CSS", group: "Styling", weight: 2 },
  { name: "Bootstrap", group: "Styling", weight: 3 },
  { name: "Chakra UI", group: "Styling", weight: 3 },
  { name: "React Router", group: "Frameworks", weight: 2 },
  { name: "DOM Manipulation", group: "Core", weight: 1 },
  { name: "Event Handling", group: "Core", weight: 2 },
  { name: "Responsive UI", group: "Styling", weight: 3 },
  { name: "Salesforce", group: "Platform", weight: 2 },
  { name: "LWC", group: "Platform", weight: 2 },
  { name: "PHP", group: "Backend & Data", weight: 1 },
  { name: "Git", group: "Tools", weight: 2 },
  { name: "GitHub", group: "Tools", weight: 3 },
  { name: "Supabase", group: "Backend & Data", weight: 1 },
  { name: "SQL", group: "Backend & Data", weight: 1 },
];

const groupColor: Record<SkillGroup, string> = {
  Core: "#f5c518",
  Frameworks: "#ffd95a",
  Styling: "#e8c47a",
  "Backend & Data": "#5ad1c4",
  Platform: "#6fa8ff",
  Tools: "#c9c6bd",
};

function layout(): PositionedSkill[] {
  const rings = [
    { weight: 3, radius: 24, offset: -Math.PI / 2 },
    { weight: 2, radius: 42, offset: -Math.PI / 2 + 0.3 },
    { weight: 1, radius: 32, offset: 1.1 },
  ] as const;

  return rings.flatMap(({ weight, radius, offset }) => {
    const ringSkills = skills.filter((skill) => skill.weight === weight);
    return ringSkills.map((skill, index) => {
      const angle = offset + (index / ringSkills.length) * Math.PI * 2;
      return {
        ...skill,
        x: 50 + Math.cos(angle) * radius,
        y: 50 + Math.sin(angle) * radius * 0.78,
      };
    });
  });
}

export default function Skills() {
  const nodes = useMemo(layout, []);
  const [hover, setHover] = useState<string | null>(null);
  const [isTouch, setIsTouch] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });
  const rotX = useTransform(sy, (value) => value * -6);
  const rotY = useTransform(sx, (value) => value * 6);

  useEffect(() => {
    setIsTouch(!window.matchMedia("(hover: hover)").matches);
  }, []);

  const hovered = nodes.find((node) => node.name === hover);
  const groups = Array.from(new Set(skills.map((skill) => skill.group)));
  const isRelated = (node: PositionedSkill) => Boolean(hovered && node.group === hovered.group);

  return (
    <section id="skills" className="relative overflow-hidden py-14 sm:py-20 md:py-40">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="mb-8 max-w-3xl md:mb-16">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-yellow-400">/ 02 — Toolkit</div>
          <h2 className="font-display mt-4 text-[2.5rem] font-bold tracking-tight text-white sm:text-[4rem]">
            My full-stack toolkit.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Technologies I use to build across the front end, back end, and data layer.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:gap-12">
          <motion.div
            ref={ref}
            onMouseMove={(event) => {
              const bounds = ref.current?.getBoundingClientRect();
              if (!bounds) return;
              mx.set((event.clientX - bounds.left) / bounds.width - 0.5);
              my.set((event.clientY - bounds.top) / bounds.height - 0.5);
            }}
            onMouseLeave={() => {
              mx.set(0);
              my.set(0);
              setHover(null);
            }}
            style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1200 }}
            className="relative hidden aspect-4/3 w-full overflow-hidden border border-white/10 bg-slate-950/60 sm:block sm:aspect-16/10"
          >
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <ellipse cx="50" cy="50" rx="24" ry="18.7" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.15" />
              <ellipse cx="50" cy="50" rx="42" ry="32.8" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.15" />
              {nodes.map((node) => {
                const lit = hovered && (node.name === hovered.name || isRelated(node));
                return (
                  <line
                    key={node.name}
                    x1="50"
                    y1="50"
                    x2={node.x}
                    y2={node.y}
                    stroke={lit ? groupColor[node.group] : "rgba(255,255,255,0.07)"}
                    strokeWidth={lit ? 0.25 : 0.12}
                    style={{ transition: "stroke 0.5s, stroke-width 0.5s" }}
                  />
                );
              })}
              {hovered && nodes.filter((node) => isRelated(node) && node.name !== hovered.name).map((node) => (
                <motion.line
                  key={`related-${node.name}`}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  x1={hovered.x}
                  y1={hovered.y}
                  x2={node.x}
                  y2={node.y}
                  stroke={groupColor[node.group]}
                  strokeWidth={0.18}
                  strokeDasharray="1 0.6"
                />
              ))}
            </svg>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <motion.div
                animate={{ boxShadow: hover ? "0 0 60px rgba(245,197,24,0.35)" : "0 0 30px rgba(245,197,24,0.15)" }}
                className="font-display mx-auto grid h-16 w-16 place-items-center rounded-full bg-yellow-400 text-xl font-extrabold text-slate-950 sm:h-20 sm:w-20 sm:text-2xl"
              >
                FS
              </motion.div>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 sm:tracking-[0.3em]">
                {hovered ? hovered.group : "Full-Stack"}
              </div>
            </div>

            {nodes.map((node, index) => {
              const lit = hovered?.name === node.name;
              const kin = isRelated(node) && !lit;
              const dim = Boolean(hovered && !lit && !kin);
              return (
                <motion.button
                  key={node.name}
                  type="button"
                  onMouseEnter={() => setHover(node.name)}
                  onFocus={() => setHover(node.name)}
                  onBlur={() => setHover(null)}
                  onClick={() => isTouch && setHover(node.name)}
                  aria-label={`${node.name} — ${node.group}`}
                  aria-pressed={hover === node.name}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  animate={{
                    scale: lit ? 1.15 : kin ? 1.03 : 1,
                    opacity: dim ? 0.3 : 1,
                    y: [0, -4, 0],
                  }}
                  transition={{
                    scale: { duration: 0.4 },
                    opacity: { duration: 0.4 },
                    y: { duration: 4 + (index % 4), repeat: Infinity, ease: "easeInOut", delay: index * 0.15 },
                  }}
                  className={cn(
                    "absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.08em] backdrop-blur-sm transition-colors duration-300 sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-[0.15em]",
                    lit
                      ? "border-yellow-400 bg-yellow-400 text-slate-950"
                      : kin
                        ? "border-white/40 bg-slate-950/90 text-slate-100"
                        : "border-white/15 bg-slate-950/80 text-slate-200/80 hover:border-white/40",
                  )}
                >
                  <span
                    className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle"
                    style={{ background: lit ? "#050505" : groupColor[node.group] }}
                  />
                  {node.name}
                </motion.button>
              );
            })}
          </motion.div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-5 min-[380px]:grid-cols-2 sm:hidden">
            {groups.map((group) => (
              <div key={group} className="min-w-0 border-b border-white/10 pb-4">
                <div className="mb-3 flex items-center justify-between gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-400">
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: groupColor[group] }} />
                    <span className="wrap-break-word">{group}</span>
                  </span>
                  <span className="shrink-0 text-slate-500">{skills.filter((skill) => skill.group === group).length}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skills.filter((skill) => skill.group === group).map((skill) => {
                    const selected = hover === skill.name;
                    return (
                      <button
                        key={skill.name}
                        type="button"
                        onClick={() => setHover(skill.name)}
                        onFocus={() => setHover(skill.name)}
                        aria-pressed={selected}
                        className={cn(
                          "max-w-full wrap-break-word rounded-sm border px-2 py-1.5 text-left font-mono text-[9px] leading-tight transition-colors",
                          selected ? "text-slate-950" : "border-white/10 bg-white/[0.03] text-slate-300 active:bg-white/10",
                        )}
                        style={selected ? { borderColor: groupColor[group], backgroundColor: groupColor[group] } : undefined}
                      >
                        {skill.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-8">
            <div className="border border-white/10 p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">Focused node</div>
              <div className="font-display mt-3 min-h-10 wrap-break-word text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {hovered ? hovered.name : "—"}
              </div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-yellow-400">
                {hovered ? hovered.group : isTouch ? "Tap a skill" : "Hover a node"}
              </div>
              <div className="mt-5 flex gap-1" aria-label={hovered ? `Usage depth: ${hovered.weight} out of 3` : "Usage depth"}>
                {[1, 2, 3].map((weight) => (
                  <span
                    key={weight}
                    className={cn("h-1 flex-1 transition-colors duration-500", hovered && weight <= hovered.weight ? "bg-yellow-400" : "bg-white/10")}
                  />
                ))}
              </div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
                {hovered ? (hovered.weight === 3 ? "Daily driver" : hovered.weight === 2 ? "Production use" : "Working knowledge") : "Usage depth"}
              </div>
            </div>

            <ul className="hidden space-y-3 lg:block">
              {groups.map((group) => {
                const firstSkill = nodes.find((node) => node.group === group);
                return (
                  <li key={group}>
                    <button
                      type="button"
                      onMouseEnter={() => firstSkill && setHover(firstSkill.name)}
                      onFocus={() => firstSkill && setHover(firstSkill.name)}
                      onClick={() => firstSkill && setHover(firstSkill.name)}
                      className="flex w-full items-center justify-between border-b border-white/10 pb-3 text-left font-mono text-[11px] uppercase tracking-[0.2em]"
                    >
                      <span className="flex items-center gap-3 text-slate-200/80">
                        <span className="h-2 w-2 rounded-full" style={{ background: groupColor[group] }} />
                        {group}
                      </span>
                      <span className="text-slate-500">{skills.filter((skill) => skill.group === group).length}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}