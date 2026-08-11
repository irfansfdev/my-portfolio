import { motion } from "framer-motion";
import { GraduationCap, MapPin, CheckCircle2 } from "lucide-react";

const jsonLines = [
  { key: "degree", value: '"Bachelor in Computer Science"' },
  { key: "university", value: '"Iqra University"' },
  { key: "graduation_year", value: "2025" },
  { key: "gpa", value: "3.14" },
  { key: "location", value: '"Karachi, Pakistan"' },
  { key: "status", value: '"Internship Completed @ Information Technology Services"' },
];

export default function About() {
  return (
    <section id="about" className="relative w-full px-4 py-28 sm:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
        {/* Left: Narrative */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-violet-400">/ 03 — About</span>
          <h2 className="font-display mt-3 text-4xl font-bold text-white sm:text-5xl">
            Code is my <span className="text-gradient">craft</span>, not just my job.
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-slate-400 sm:text-base">
            I'm a front-end developer obsessed with the quiet details — the 60fps scroll, the pixel-perfect
            spacing, the interaction that feels inevitable rather than designed. I build interfaces that
            balance <span className="text-cyan-300">performance</span> with{" "}
            <span className="text-violet-300">expressive motion</span>, believing that great UI should feel
            like a conversation between the user and the machine.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
            My problem-solving approach is rooted in clean, maintainable architecture — componentized systems
            that scale gracefully as products grow. Every project is an opportunity to push a little further
            on speed, accessibility, and delight.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300">
              <MapPin size={14} className="text-cyan-400" /> Karachi, Pakistan
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300">
              <GraduationCap size={14} className="text-violet-400" /> BSCS · Iqra University
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300">
              <CheckCircle2 size={14} className="text-emerald-400" /> Internship Completed
            </div>
          </div>
        </motion.div>

        {/* Right: Terminal */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative"
        >
          <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-violet-600/10 blur-2xl" />
          <div className="glass relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40">
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400/70" />
              <span className="h-3 w-3 rounded-full bg-amber-400/70" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
              <span className="ml-3 font-mono text-[11px] text-slate-400">profile.json — muhammad-irfan</span>
            </div>
            <div className="p-6 font-mono text-[13px] leading-relaxed text-slate-300 sm:text-sm">
              <p className="text-violet-400">{"{"}</p>
              {jsonLines.map((line, i) => (
                <motion.p
                  key={line.key}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className="pl-6"
                >
                  <span className="text-cyan-300">"{line.key}"</span>
                  <span className="text-slate-500">: </span>
                  <span className="text-emerald-300">{line.value}</span>
                  {i < jsonLines.length - 1 && <span className="text-slate-500">,</span>}
                </motion.p>
              ))}
              <p className="text-violet-400">{"}"}</p>
              <p className="mt-4 flex items-center gap-1 text-slate-500">
                <span className="text-emerald-400">➜</span> awaiting_next_challenge
                <span className="animate-blink">▍</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
