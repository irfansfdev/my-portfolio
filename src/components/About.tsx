import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/* ---------------------------------- data ---------------------------------- */

type Seg = { t: string; cls?: string };

// Statement: scroll karne par word-by-word roshan hoti hai
const statement: Seg[] = [
  { t: "I'm a full stack developer who builds complete products, from the database to the last pixel. I care about fast, clean code and interfaces that feel effortless, where " },
  { t: "performance", cls: "text-gradient" },
  { t: " and " },
  { t: "thoughtful motion", cls: "text-gradient" },
  { t: " work together." },
];

const profile = [
  { label: "Degree", value: "Bachelor in Computer Science" },
  { label: "University", value: "Iqra University" },
  { label: "Graduated", value: "2026" },
  { label: "GPA", value: "3.14" },
  { label: "Status", value: "Internship Completed @ Information Technology Services", live: true },
];

const words = statement.flatMap((seg) =>
  seg.t
    .split(" ")
    .filter(Boolean)
    .map((w) => ({ w, cls: seg.cls })),
);

/* -------------------------------- components ------------------------------- */

function Word({
  text,
  cls,
  range,
  progress,
  reduce,
}: {
  text: string;
  cls?: string;
  range: [number, number];
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const y = useTransform(progress, range, [4, 0]);
  return (
    <motion.span style={reduce ? undefined : { opacity, y }} className={`mr-[0.28em] inline-block ${cls ?? "text-white"}`}>
      {text}
    </motion.span>
  );
}

function ScrollStatement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });

  return (
    <p
      ref={ref}
      className="font-display max-w-4xl text-[1.375rem] font-medium leading-[1.45] tracking-tight sm:text-[1.625rem] lg:text-[2rem] lg:leading-[1.4]"
    >
      {words.map((item, i) => (
        <Word
          key={i}
          text={item.w}
          cls={item.cls}
          reduce={reduce}
          progress={scrollYProgress}
          range={[i / words.length, Math.min(1, (i + 2) / words.length)]}
        />
      ))}
    </p>
  );
}

function ProfileRow({ label, value, live, index }: { label: string; value: string; live?: boolean; index: number }) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.8 }} className="group relative">
      <motion.span
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1, delay: index * 0.07, ease } } }}
        className="absolute left-0 top-0 h-px w-full origin-left bg-white/15"
      />
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 18 },
          show: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.1 + index * 0.07, ease } },
        }}
        className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-8 sm:py-5"
      >
        <span className="w-28 shrink-0 font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500 transition-colors duration-500 group-hover:text-white">
          {label}
        </span>
        <span className="font-display flex items-center gap-3 text-lg font-medium text-slate-200 transition-transform duration-500 group-hover:translate-x-2 group-hover:text-white sm:text-xl">
          {live && (
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
          )}
          {value}
        </span>
      </motion.div>
    </motion.div>
  );
}

/** Do lines jo scroll ke saath ulti directions mein chalti hain */
function ScrollMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // marquee ka apna scroll progress, taaki jab ye screen ke beech mein ho tab text sahi jagah dikhe
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const xLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["-15%", "0%"]);
  const text = "FULL STACK DEVELOPER  /  UI ENGINEER  /  PROBLEM SOLVER  /  ";

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none mt-16 select-none overflow-hidden border-y border-white/10 py-6 sm:mt-24 sm:py-9"
    >
      <motion.div style={reduce ? undefined : { x: xLeft }} className="flex w-max whitespace-nowrap">
        <span
          className="font-display text-[2.25rem] font-extrabold leading-none sm:text-[3.6rem] lg:text-[4.75rem]"
          style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}
        >
          {text.repeat(3)}
        </span>
      </motion.div>
      <motion.div style={reduce ? undefined : { x: xRight }} className="mt-3 flex w-max whitespace-nowrap sm:mt-5">
        <span className="font-display text-gradient text-[2.25rem] font-extrabold leading-none sm:text-[3.6rem] lg:text-[4.75rem]">
          {text.repeat(3)}
        </span>
      </motion.div>
    </div>
  );
}

/* ---------------------------------- section --------------------------------- */

export default function About() {
  return (
    <section id="about" className="relative w-full overflow-hidden px-4 py-16 sm:px-8 sm:py-24 lg:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-white/[0.04] blur-[130px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="mb-8 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] sm:mb-10"
        >
          <span className="text-gradient">/ 03 — About</span>
          <span className="h-px w-16 bg-gradient-to-r from-white/40 to-transparent" />
        </motion.div>

        {/* statement */}
        <ScrollStatement />

        {/* heading + paragraph | profile */}
        <div className="mt-14 grid grid-cols-1 gap-10 sm:mt-20 lg:grid-cols-12 lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease }}
            className="lg:col-span-5"
          >
            <h3 className="font-display text-[1.625rem] font-bold text-white sm:text-3xl">
              Code is my <span className="text-gradient">craft</span>, not just my job.
            </h3>
            <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg">
              My problem-solving approach is rooted in clean, maintainable architecture — componentized systems
              that scale gracefully as products grow. Every project is an opportunity to push a little further
              on speed, accessibility, and delight.
            </p>
          </motion.div>

          <div className="lg:col-span-7">
            {profile.map((item, i) => (
              <ProfileRow key={item.label} label={item.label} value={item.value} live={item.live} index={i} />
            ))}
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5, ease }}
              className="block h-px w-full origin-left bg-white/15"
            />
          </div>
        </div>

        <ScrollMarquee />
      </div>
    </section>
  );
}