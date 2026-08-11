import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe2, Search, Calculator, MapPin, GraduationCap, ChevronRight } from "lucide-react";

const features = [
  {
    id: "finder",
    title: "Global University Finder",
    icon: Globe2,
    desc: "Compare thousands of universities worldwide with dynamic filtering and global rankings.",
  },
  {
    id: "courses",
    title: "Smart Course Search",
    icon: Search,
    desc: "Discover specialized programs matched to your interests and future career goals.",
  },
  {
    id: "scholarship",
    title: "Scholarship Calculator",
    icon: Calculator,
    desc: "Estimate financial aid and calculate real tuition costs based on your profile.",
  },
];

export default function EducationProject() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-slate-950 via-indigo-950/20 to-slate-950 p-6 sm:p-10">
      {/* Subtle Background Effects */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute -left-10 bottom-0 h-56 w-56 rounded-full bg-cyan-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }} />

      {/* Top Description */}
      <div className="relative z-10 mb-10 lg:w-4/5">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-indigo-400">Platform Simulation</span>
        <h3 className="font-display mt-3 text-3xl font-bold text-white sm:text-4xl">GlobalEd Portal</h3>
        <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
          A full-stack platform empowering students to navigate international education. Select a module below to explore the dashboard's interactive capabilities in real-time.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {["React", "Node.js", "PostgreSQL", "Interactive UI"].map((t) => (
            <span key={t} className="rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1 font-mono text-[11px] text-indigo-200">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Interactive Dashboard Area */}
      <div className="relative z-10 grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        
        {/* Left: Tab Menu */}
        <div className="space-y-3">
          {features.map((f, i) => (
            <button
              key={f.id}
              onClick={() => setActiveFeature(i)}
              data-cursor-hover
              className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300 ${
                activeFeature === i
                  ? "border-indigo-500/40 bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.1)]"
                  : "border-white/5 bg-white/5 hover:border-indigo-400/20 hover:bg-white/10"
              }`}
            >
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                activeFeature === i ? "bg-indigo-500 text-white" : "bg-white/10 text-slate-400 group-hover:text-indigo-300"
              }`}>
                <f.icon size={18} />
              </span>
              <div>
                <h4 className={`text-sm font-semibold sm:text-base ${
                  activeFeature === i ? "text-white" : "text-slate-300"
                }`}>
                  {f.title}
                </h4>
                <p className="mt-1 text-xs text-slate-500 line-clamp-1">{f.desc}</p>
              </div>
              <ChevronRight size={16} className={`ml-auto shrink-0 transition-transform ${
                activeFeature === i ? "translate-x-0 text-indigo-400 opacity-100" : "-translate-x-2 text-slate-600 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
              }`} />
            </button>
          ))}
        </div>

        {/* Right: Live Preview Window Screen */}
        <div className="relative h-[280px] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">
          {/* Browser / App Header */}
          <div className="flex h-9 items-center gap-1.5 border-b border-white/5 bg-slate-950 px-4">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
            <span className="ml-3 font-mono text-[10px] text-slate-500">global-ed.app / {features[activeFeature].id}</span>
          </div>

          {/* Dynamic Mock UI Content */}
          <div className="p-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {activeFeature === 0 && <FinderMockUI />}
                {activeFeature === 1 && <CourseMockUI />}
                {activeFeature === 2 && <CalculatorMockUI />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Mock UI Components for the "Screen" ---

const FinderMockUI = () => (
  <div className="space-y-3">
    <div className="mb-4 flex items-center justify-between">
      <span className="text-xs font-semibold text-slate-300">Top University Matches</span>
      <span className="flex items-center gap-1 rounded-full bg-indigo-500/20 px-2 py-1 text-[10px] text-indigo-300">
        <MapPin size={10} /> Global Scope
      </span>
    </div>
    {[
      { name: "Massachusetts Institute of Tech", loc: "Cambridge, USA", rank: "#1", match: "98%" },
      { name: "Oxford University", loc: "Oxford, UK", rank: "#3", match: "94%" }
    ].map((u, i) => (
      <motion.div 
        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
        key={u.name} 
        className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-3"
      >
        <div>
          <p className="text-sm font-semibold text-slate-200">{u.name}</p>
          <p className="mt-1 flex gap-2 font-mono text-[10px] text-slate-500">
            <span>{u.loc}</span> • <span className="text-amber-400/80">Rank {u.rank}</span>
          </p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-500/10 text-[10px] font-bold text-indigo-300">
          {u.match}
        </div>
      </motion.div>
    ))}
  </div>
);

const CourseMockUI = () => (
  <div className="space-y-4">
    <div className="flex items-center gap-2 rounded-xl border border-indigo-500/30 bg-slate-950 px-3 py-2.5 shadow-inner">
      <Search size={14} className="text-indigo-400" />
      <span className="text-xs text-slate-300">"Master's in Data Science"</span>
      <span className="ml-auto rounded bg-indigo-500/20 px-2 py-1 text-[10px] text-indigo-300">Searching...</span>
    </div>
    <div className="flex gap-2">
      {["STEM", "2 Years", "On-Campus"].map((t, i) => (
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.05 }} key={t} className="rounded-md bg-white/5 px-2.5 py-1 text-[10px] text-slate-400">
          {t}
        </motion.div>
      ))}
    </div>
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-xl border border-white/5 bg-white/5 p-4">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-indigo-500/20 p-2"><GraduationCap size={16} className="text-indigo-400" /></div>
        <div>
          <span className="block text-sm font-bold text-slate-200">MSc Data Science & AI</span>
          <span className="mt-0.5 block text-xs text-slate-500">Stanford University • Fall 2026</span>
        </div>
      </div>
    </motion.div>
  </div>
);

const CalculatorMockUI = () => (
  <div className="space-y-4 pt-2">
    <div className="text-center">
      <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Your Estimated Annual Cost</p>
      <motion.p initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-1 font-display text-3xl font-bold text-white">
        $14,500
      </motion.p>
    </div>
    <div className="space-y-2.5 pt-2">
      <div className="flex justify-between text-xs">
        <span className="text-slate-400">Base Tuition Fee</span>
        <span className="font-mono text-slate-300">$45,000</span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-emerald-400">Merit Scholarship (67%)</span>
        <span className="font-mono text-emerald-400">-$30,500</span>
      </div>
    </div>
    <div className="mt-3 flex h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
      <motion.div initial={{ width: 0 }} animate={{ width: "33%" }} transition={{ duration: 0.8, delay: 0.1 }} className="h-full bg-indigo-500" />
      <motion.div initial={{ width: 0 }} animate={{ width: "67%" }} transition={{ duration: 0.8, delay: 0.1 }} className="h-full bg-emerald-400" />
    </div>
    <div className="flex justify-between px-1 text-[10px] font-semibold text-slate-500">
      <span className="text-indigo-400">You Pay</span>
      <span className="text-emerald-400">Covered by Aid</span>
    </div>
  </div>
);