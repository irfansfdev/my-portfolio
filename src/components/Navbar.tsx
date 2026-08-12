import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command, Palette, Zap, Leaf, Flame, Sparkles, Sun } from "lucide-react"; 

const links = [
  { id: "home", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Work" },
  { id: "contact", label: "Contact" },
];

const themes = [
  { id: "cyberpunk", label: "Cyberpunk", icon: Zap, color: "#06b6d4" },
  { id: "emerald", label: "Emerald", icon: Leaf, color: "#10b981" },
  { id: "sunset", label: "Sunset", icon: Flame, color: "#f97316" },
  { id: "lavender", label: "Lavender", icon: Sparkles, color: "#d946ef" },
  { id: "light", label: "Light Mode", icon: Sun, color: "#2563eb" },
];

export default function Navbar({
  theme,
  setTheme,
  onCommandOpen,
}: {
  theme: string;
  setTheme: (theme: string) => void;
  onCommandOpen: () => void;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
    if (!dropdownOpen) return;
    const close = () => setDropdownOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [dropdownOpen]);

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
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDropdownOpen(!dropdownOpen);
              }}
              data-cursor-hover
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 font-mono text-[11px] text-slate-300 transition hover:border-cyan-400/50 hover:text-cyan-300"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ backgroundColor: themes.find(t => t.id === theme)?.color || "#06b6d4" }} />
              <span className="hidden sm:inline">{themes.find(t => t.id === theme)?.label || "Theme"}</span>
              <span className="hidden sm:inline text-slate-500">·</span>
              <span className="text-[10px] text-slate-400">{time}</span>
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="glass absolute right-0 mt-2 w-40 rounded-xl border border-white/10 p-1.5 shadow-xl shadow-black/40 z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  {themes.map((t) => {
                    const Icon = t.icon;
                    const isActive = theme === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => {
                          setTheme(t.id);
                          setDropdownOpen(false);
                        }}
                        data-cursor-hover
                        className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left font-mono text-[11px] transition-colors ${
                          isActive
                            ? "bg-white/10 text-white font-semibold border border-white/10"
                            : "text-slate-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <Icon size={12} style={{ color: t.color }} />
                        {t.label}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
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