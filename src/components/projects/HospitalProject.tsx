import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, CalendarDays, ClipboardList, HeartPulse, ShieldCheck, Users } from "lucide-react";

const views = ["Overview", "Patients", "Appointments"];
const patients = [
  { name: "Ayesha Khan", type: "Cardiology", status: "In review" },
  { name: "Hamza Raza", type: "General medicine", status: "Checked in" },
  { name: "Sara Ahmed", type: "Orthopedics", status: "Confirmed" },
];

export default function HospitalProject() {
  const [activeView, setActiveView] = useState("Overview");

  return (
    <div className="relative overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-br from-slate-950 via-violet-950/25 to-slate-950 p-6 sm:p-10">
      <div className="relative z-10 grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-violet-300">Next.js care operations</span>
          <h3 className="font-display mt-3 text-3xl font-bold text-white sm:text-4xl">Hospital Management System</h3>
          <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">A role-aware management system concept for coordinating patients, doctors, appointments, and operational data through a focused Next.js dashboard.</p>
          <p className="mt-4 text-sm leading-relaxed text-violet-300/80">Try it — switch between overview, patient records, and the appointment queue.</p>
          <div className="mt-6 flex flex-wrap gap-2">{["Next.js", "App Router", "Supabase", "Authentication", "Role-based dashboards"].map((tech) => <span key={tech} className="rounded-full border border-violet-400/25 bg-violet-400/10 px-3 py-1 font-mono text-[11px] text-violet-200">{tech}</span>)}</div>
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-4 text-xs leading-relaxed text-amber-100/70"><ShieldCheck size={16} className="mt-0.5 shrink-0 text-amber-300" /> Showcase preview only: the dashboard communicates the product structure without pretending to connect to a deployed clinical database.</div>
        </div>

        <div className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#111020] shadow-2xl shadow-violet-950/30">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3"><div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-violet-400" /><span className="font-mono text-[10px] text-slate-400">careboard / secure workspace</span></div><Activity size={15} className="text-emerald-400" /></div>
          <div className="flex gap-1 overflow-x-auto border-b border-white/10 px-3 pt-3 hide-scrollbar">{views.map((view) => <button key={view} onClick={() => setActiveView(view)} data-cursor-hover className={`shrink-0 rounded-t-lg px-3 py-2 text-xs transition ${activeView === view ? "bg-violet-500/15 text-violet-200" : "text-slate-500 hover:text-slate-200"}`}>{view}</button>)}</div>
          <div className="p-4 sm:p-5">
            <AnimatePresence mode="wait"><motion.div key={activeView} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              {activeView === "Overview" && <div className="space-y-4"><div className="grid grid-cols-3 gap-2">{[["128", "Patients", Users], ["24", "Today", CalendarDays], ["06", "Doctors", HeartPulse]].map(([value, label, Icon]) => <div key={label as string} className="rounded-xl border border-white/10 bg-white/[0.04] p-3"><Icon size={14} className="text-violet-300" /><strong className="mt-2 block text-xl text-white">{value as string}</strong><span className="text-[10px] text-slate-500">{label as string}</span></div>)}</div><div className="rounded-xl border border-white/10 bg-white/[0.04] p-4"><div className="flex items-center justify-between text-xs"><span className="text-slate-300">Appointment load</span><span className="text-emerald-300">72%</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"><motion.div initial={{ width: 0 }} animate={{ width: "72%" }} transition={{ duration: 0.8 }} className="h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" /></div><div className="mt-3 flex justify-between text-[10px] text-slate-500"><span>Morning rounds</span><span>Evening rounds</span></div></div></div>}
              {activeView === "Patients" && <div className="space-y-2"><div className="mb-3 flex items-center gap-2 text-xs text-slate-400"><Users size={14} className="text-violet-300" /> Recent patient records</div>{patients.map((patient) => <div key={patient.name} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3"><div><p className="text-xs font-semibold text-slate-200">{patient.name}</p><p className="mt-1 text-[10px] text-slate-500">{patient.type}</p></div><span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[10px] text-emerald-300">{patient.status}</span></div>)}</div>}
              {activeView === "Appointments" && <div className="space-y-3"><div className="flex items-center gap-2 text-xs text-slate-400"><ClipboardList size={14} className="text-violet-300" /> Appointment queue</div>{["09:30  Dr. Malik / Cardiology", "11:00  Dr. Sana / Pediatrics", "14:15  Dr. Omar / Orthopedics"].map((item, index) => <div key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3"><span className="font-mono text-[10px] text-violet-300">0{index + 1}</span><span className="text-xs text-slate-300">{item}</span><span className="ml-auto h-2 w-2 rounded-full bg-amber-300" /></div>)}</div>}
            </motion.div></AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
