import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Database, Package, Plus, ShoppingCart } from "lucide-react";

const products = [
  { name: "Canvas utility tote", category: "Bags", price: 24, stock: 12, color: "#f0b35b" },
  { name: "Everyday field watch", category: "Accessories", price: 48, stock: 7, color: "#7a8fc5" },
  { name: "Ceramic coffee set", category: "Home", price: 32, stock: 18, color: "#9bc7b3" },
  { name: "Travel notebook", category: "Stationery", price: 12, stock: 31, color: "#df8f9d" },
];
const categories = ["All", "Bags", "Accessories", "Home", "Stationery"];

export default function PhpStoreProject() {
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState(0);
  const visibleProducts = useMemo(() => category === "All" ? products : products.filter((item) => item.category === category), [category]);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-amber-400/20 bg-gradient-to-br from-stone-950 via-amber-950/20 to-slate-950 p-6 sm:p-10">
      <div className="relative z-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-amber-300">PHP + SQL store build</span>
          <h3 className="font-display mt-3 text-3xl font-bold text-white sm:text-4xl">PHP E-Commerce Website</h3>
          <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">A database-driven store built around PHP backend logic and SQL persistence, with product browsing, categories, stock visibility, and cart-oriented interactions.</p>
          <p className="mt-4 text-sm leading-relaxed text-amber-300/80">Try it — filter the catalog, then add a product to the cart counter.</p>
          <div className="mt-6 flex flex-wrap gap-2">{["PHP", "SQL", "Product listing", "Cart flow", "Database-driven"].map((tech) => <span key={tech} className="rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-1 font-mono text-[11px] text-amber-200">{tech}</span>)}</div>
          <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4"><Database size={17} className="text-amber-300" /><span className="text-xs leading-relaxed text-slate-400">The preview illustrates the store workflow and data relationships; it does not claim a live database connection in this portfolio build.</span></div>
        </div>
        <div className="min-w-0 overflow-hidden rounded-2xl border border-amber-200/15 bg-[#15120f] shadow-2xl shadow-amber-950/20">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3"><span className="font-mono text-[10px] text-slate-500">catalog.php / products</span><button onClick={() => setCart((value) => value + 1)} className="relative text-amber-300"><ShoppingCart size={16} />{cart > 0 && <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[9px] text-slate-950">{cart}</span>}</button></div>
          <div className="flex gap-2 overflow-x-auto border-b border-white/10 px-4 py-3 hide-scrollbar">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} data-cursor-hover className={`shrink-0 rounded-md px-2.5 py-1.5 font-mono text-[10px] transition ${category === item ? "bg-amber-400 text-slate-950" : "bg-white/5 text-slate-500 hover:text-white"}`}>{item}</button>)}</div>
          <div className="grid gap-3 p-4 sm:grid-cols-2">{visibleProducts.map((product) => <motion.div layout key={product.name} className="group rounded-xl border border-white/10 bg-white/[0.04] p-3 transition hover:-translate-y-1 hover:border-amber-300/40"><div className="flex h-24 items-end justify-between rounded-lg p-3" style={{ background: `linear-gradient(135deg, ${product.color}, #201a16)` }}><Package size={19} className="text-white/80" /><span className="rounded-full bg-black/20 px-2 py-1 font-mono text-[9px] text-white/80">In stock</span></div><div className="mt-3 flex items-end justify-between gap-2"><div><p className="text-xs font-semibold text-slate-200">{product.name}</p><p className="mt-1 text-[10px] text-slate-500">{product.stock} available</p><p className="mt-2 font-mono text-sm text-amber-300">${product.price}</p></div><button onClick={() => setCart((value) => value + 1)} className="rounded-full bg-amber-400/15 p-2 text-amber-300 transition hover:bg-amber-400 hover:text-slate-950"><Plus size={13} /></button></div></motion.div>)}</div>
        </div>
      </div>
    </div>
  );
}
