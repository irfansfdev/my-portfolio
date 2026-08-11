import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Film, Sparkles } from "lucide-react";

const genres = ["Action", "Sci-Fi", "Drama", "Comedy", "Thriller", "Romance", "Horror"];

const catalogue: Record<string, { title: string; match: number }[]> = {
  Action: [{ title: "Rogue Velocity", match: 96 }, { title: "Iron Skyline", match: 91 }],
  "Sci-Fi": [{ title: "Neon Parallax", match: 98 }, { title: "Quantum Drift", match: 89 }],
  Drama: [{ title: "Silent Harbor", match: 87 }, { title: "The Long Return", match: 82 }],
  Comedy: [{ title: "Office Chaos", match: 90 }, { title: "Laugh Protocol", match: 85 }],
  Thriller: [{ title: "Midnight Signal", match: 94 }, { title: "The Last Witness", match: 88 }],
  Romance: [{ title: "Paper Constellations", match: 80 }, { title: "Two Timezones", match: 77 }],
  Horror: [{ title: "Hollow House", match: 92 }, { title: "The Static", match: 86 }],
};

export default function MovieProject() {
  const [selected, setSelected] = useState<string[]>(["Sci-Fi", "Thriller"]);

  const toggle = (g: string) =>
    setSelected((s) => (s.includes(g) ? s.filter((x) => x !== g) : [...s, g]));

  const recommendations = useMemo(() => {
    const list = selected.flatMap((g) => catalogue[g] || []);
    return list.sort((a, b) => b.match - a.match).slice(0, 5);
  }, [selected]);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/30 p-6 sm:p-10">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: "linear-gradient(rgba(16,185,129,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.4) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400">Data Stream Dashboard</span>
          <h3 className="font-display mt-3 text-3xl font-bold text-white sm:text-4xl">Movie Recommendation Engine</h3>
          <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
            A Python-powered recommendation system leveraging data algorithms to surface personalized film
            picks. Select genres below to simulate the live inference engine.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Python", "Data Algorithms", "Recommendation Engine"].map((t) => (
              <span key={t} className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 font-mono text-[11px] text-emerald-200">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-slate-500">Select genre preferences</p>
            <div className="flex flex-wrap gap-2">
              {genres.map((g) => (
                <button
                  key={g}
                  onClick={() => toggle(g)}
                  data-cursor-hover
                  className={`rounded-full border px-3.5 py-1.5 font-mono text-xs transition ${
                    selected.includes(g)
                      ? "border-emerald-400 bg-emerald-400/20 text-emerald-200"
                      : "border-white/10 bg-white/5 text-slate-400 hover:border-emerald-400/40"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative rounded-2xl border border-emerald-400/20 bg-slate-950/60 p-5 font-mono">
          <div className="mb-4 flex items-center gap-2 text-emerald-400">
            <Sparkles size={14} />
            <span className="text-xs uppercase tracking-widest">Live Inference Output</span>
          </div>
          <div className="space-y-2.5">
            {recommendations.length === 0 && (
              <p className="text-xs text-slate-500">Select at least one genre to generate recommendations...</p>
            )}
            {recommendations.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-4 py-3"
              >
                <span className="flex items-center gap-2 text-sm text-slate-200">
                  <Film size={14} className="text-emerald-400" />
                  {r.title}
                </span>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${r.match}%` }}
                      transition={{ duration: 0.6 }}
                      className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                    />
                  </div>
                  <span className="text-xs text-emerald-300">{r.match}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
