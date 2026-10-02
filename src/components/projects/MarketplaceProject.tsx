import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CircleDollarSign, Database, LayoutDashboard, ShieldCheck, Store, ShoppingBag } from "lucide-react";

const stages = [
  { id: "customer", label: "Customer", icon: ShoppingBag, copy: "Browse products, variants, reviews, cart, checkout, and order tracking." },
  { id: "shops", label: "Shop orders", icon: Store, copy: "One checkout can be split into shop-specific orders for independent fulfillment." },
  { id: "admin", label: "Shop admin", icon: LayoutDashboard, copy: "Vendors manage products, variants, inventory, and their own order status." },
  { id: "control", label: "Super admin", icon: ShieldCheck, copy: "Marketplace-level oversight for shops, users, moderation, and payouts." },
];

export default function MarketplaceProject() {
  const [activeStage, setActiveStage] = useState("customer");
  const stage = stages.find((item) => item.id === activeStage) || stages[0];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-cyan-400/25 bg-linear-to-br from-slate-950 via-cyan-950/20 to-violet-950/30 p-4 sm:p-6">
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(34,211,238,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.7) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="relative z-10 grid gap-6 xl:grid-cols-[0.8fr_1.2fr] xl:items-center xl:gap-10">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.28em] text-cyan-300"><CircleDollarSign size={14} /> Next.js commerce build</div>
          <h3 className="font-display mt-3 text-3xl font-bold text-white sm:text-4xl">Multi-Vendor Marketplace</h3>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">A multi-shop commerce architecture where one customer checkout becomes coordinated shop orders, with separate vendor workflows and marketplace oversight.</p>
          <p className="mt-4 text-sm leading-relaxed text-cyan-300/80">Try it — select a role on the right to follow the same order through the marketplace.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Next.js", "React", "Supabase", "PostgreSQL", "RLS", "Role-based access"].map((tech) => <span key={tech} className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 font-mono text-[11px] text-cyan-200">{tech}</span>)}
          </div>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/4 p-4">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-slate-500"><Database size={13} className="text-cyan-400" /> Relational flow</div>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">Customer cart <span className="text-cyan-300">→</span> multiple shops <span className="text-cyan-300">→</span> scoped orders <span className="text-cyan-300">→</span> role-aware dashboards</p>
          </div>
        </div>

        <div className="relative min-w-0 rounded-xl border border-white/10 bg-slate-950/75 p-3 shadow-2xl shadow-cyan-950/30 sm:p-4">
          <div className="mb-5 flex items-center justify-between gap-3 border-b border-white/10 pb-4"><span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">marketplace / order flow</span><span className="flex items-center gap-1.5 text-[10px] text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Select a role</span></div>
          <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 106px), 1fr))" }}>
            {stages.map((item, index) => {
              const Icon = item.icon;
              return <button key={item.id} onClick={() => setActiveStage(item.id)} data-cursor-hover className={`group min-w-0 border p-2.5 text-left transition-all sm:p-3 ${activeStage === item.id ? "border-cyan-400/60 bg-cyan-400/10 shadow-lg shadow-cyan-500/10" : "border-white/10 bg-white/3 hover:border-cyan-400/30"}`}>
                <div className="flex items-center justify-between gap-2"><Icon size={15} className={activeStage === item.id ? "text-cyan-300" : "text-slate-500"} /><span className="font-mono text-[10px] text-slate-600">0{index + 1}</span></div>
                <p className="mt-2.5 text-[11px] font-semibold leading-tight text-slate-200 sm:text-xs">{item.label}</p>
              </button>;
            })}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={stage.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mt-5 rounded-xl border border-cyan-400/15 bg-cyan-400/5 p-3 sm:p-4">
              <div><p className="font-mono text-[9px] uppercase tracking-widest text-cyan-300 sm:text-[10px]">Active layer / {stage.label}</p><p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">{stage.copy}</p></div>
              <div className="mt-3 flex items-center gap-2 text-[10px] text-emerald-300 sm:text-xs"><Check size={13} /> Scoped access</div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-5 grid grid-cols-3 gap-2 text-center font-mono text-[10px] text-slate-500"><span className="rounded-lg bg-white/4 p-3"><strong className="block text-lg text-white">3</strong>roles</span><span className="rounded-lg bg-white/4 p-3"><strong className="block text-lg text-white">RLS</strong>security</span><span className="rounded-lg bg-white/4 p-3"><strong className="block text-lg text-white">1→N</strong>orders</span></div>
        </div>
      </div>
    </div>
  );
}
