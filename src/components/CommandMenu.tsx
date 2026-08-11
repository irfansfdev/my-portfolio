import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  ArrowRight,
  Download,
  Mail,
  Home,
  User,
  Code2,
  Briefcase,
  FolderKanban,
} from "lucide-react";

interface CommandMenuProps {
  open: boolean;
  onClose: () => void;
}

const items = [
  { label: "Home / Hero", icon: Home, id: "home" },
  { label: "Skills Playground", icon: Code2, id: "skills" },
  { label: "About & Education", icon: User, id: "about" },
  { label: "Work Experience", icon: Briefcase, id: "experience" },
  { label: "Featured Projects", icon: FolderKanban, id: "projects" },
  { label: "Contact", icon: Mail, id: "contact" },
];

export default function CommandMenu({ open, onClose }: CommandMenuProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const filtered = items.filter((i) =>
    i.label.toLowerCase().includes(query.toLowerCase()),
  );

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center bg-slate-950/70 backdrop-blur-sm pt-28 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="glass w-full max-w-lg rounded-2xl border border-white/10 shadow-2xl shadow-cyan-500/10 overflow-hidden"
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <Search size={16} className="text-cyan-400" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a section..."
                className="w-full bg-transparent font-mono text-sm text-slate-200 outline-none placeholder:text-slate-500"
              />
              <kbd className="rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-slate-500">
                ESC
              </kbd>
            </div>
            <div className="max-h-72 overflow-y-auto p-2">
              {filtered.map((item) => (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className="group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm text-slate-300 transition hover:bg-white/5 hover:text-cyan-300"
                >
                  <span className="flex items-center gap-3">
                    <item.icon size={15} />
                    {item.label}
                  </span>
                  <ArrowRight
                    size={14}
                    className="opacity-0 transition group-hover:opacity-100"
                  />
                </button>
              ))}
              <a
                href="/Muhammad Irfan Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm text-violet-300 transition hover:bg-white/5 hover:text-violet-200"
              >
                <span className="flex items-center gap-3">
                  <Download size={15} />
                  View Full Résumé (PDF){" "}
                  {/* Text change kar diya taake clear ho */}
                </span>
                <ArrowRight
                  size={14}
                  className="opacity-0 transition group-hover:opacity-100"
                />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
