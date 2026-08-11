import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Command } from "lucide-react"; 

const links = [
  { id: "home", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Work" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ onCommandOpen }: { onCommandOpen: () => void }) {
  const [time, setTime] = useState("");
  const [active, setActive] = useState("home");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
      const karachi = new Date(utc.getTime() + 5 * 3600000);
      setTime(
        karachi.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })
      );
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const positions = links.map((l) => {
        const el = document.getElementById(l.id);
        if (!el) return { id: l.id, top: Infinity };
        return { id: l.id, top: Math.abs(el.getBoundingClientRect().top - 120) };
      });
      positions.sort((a, b) => a.top - b.top);
      setActive(positions[0].id);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
      className="fixed top-4 left-1/2 z-50 w-[95%] max-w-4xl -translate-x-1/2"
    >
      <div className="glass flex items-center justify-between rounded-full px-4 py-2.5 shadow-lg shadow-black/30 sm:px-6">
        <a href="#home" data-cursor-hover className="font-display text-lg font-bold tracking-tight text-white">
          MI<span className="text-cyan-400">.</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              data-cursor-hover
              className={`relative rounded-full px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors ${
                active === l.id ? "text-slate-950" : "text-slate-300 hover:text-white"
              }`}
            >
              {active === l.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
                  transition={{ type: "spring", damping: 20, stiffness: 260 }}
                />
              )}
              <span className="relative z-10">{l.label}</span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1.5 font-mono text-[11px] text-slate-400 sm:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Karachi, PK · {time}
          </div>

          <button
            onClick={onCommandOpen}
            data-cursor-hover
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] text-slate-300 transition hover:border-cyan-400/50 hover:text-cyan-300"
          >
            <Command size={12} />
            <span className="hidden sm:inline">K</span>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}