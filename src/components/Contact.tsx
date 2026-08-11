import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Copy, Check, Send, ArrowUpRight } from "lucide-react";
import LinkedinIcon from "./icons/LinkedinIcon";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("irfan.sfdev@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("https://formspree.io/f/xnpajkyk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSent(true);
        setTimeout(() => setSent(false), 3000);
        setForm({ name: "", email: "", message: "" });
      } else {
        alert("Oops! Message bhejne mein koi masla aaya. Dobara try karein.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Network error, please internet connection check karein.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative w-full px-4 py-28 sm:px-8">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-br from-cyan-500/10 via-violet-600/10 to-transparent blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="text-center">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-violet-400">/ 06 — Contact</span>
          <h2 className="font-display mt-3 text-4xl font-bold text-white sm:text-6xl">
            Let's build something <span className="text-gradient">unforgettable.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-slate-400 sm:text-base">
            Open to freelance engagements and full-time opportunities. Drop a message or reach out directly.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Direct contact info */}
          <div className="space-y-4">
            <button
              onClick={copyEmail}
              data-cursor-hover
              className="glass group flex w-full items-center justify-between rounded-2xl border border-white/10 px-5 py-4 text-left transition hover:border-cyan-400/40"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                  <Mail size={16} />
                </span>
                <span>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="text-sm font-medium text-slate-200">irfan.sfdev@gmail.com</p>
                </span>
              </span>
              <span className="text-slate-400 transition group-hover:text-cyan-300">
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              </span>
            </button>

            <a
              href="tel:03412061108"
              data-cursor-hover
              className="glass group flex w-full items-center justify-between rounded-2xl border border-white/10 px-5 py-4 transition hover:border-violet-400/40"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300">
                  <Phone size={16} />
                </span>
                <span>
                  <p className="text-xs text-slate-500">Phone</p>
                  <p className="text-sm font-medium text-slate-200">0341 2061108</p>
                </span>
              </span>
              <ArrowUpRight size={16} className="text-slate-400 transition group-hover:text-violet-300" />
            </a>

            <a
              href="https://linkedin.com/in/muhammad-irfan99"
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="glass group flex w-full items-center justify-between rounded-2xl border border-white/10 px-5 py-4 transition hover:border-cyan-400/40"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                  <LinkedinIcon size={16} />
                </span>
                <span>
                  <p className="text-xs text-slate-500">LinkedIn</p>
                  <p className="text-sm font-medium text-slate-200">muhammad-irfan99</p>
                </span>
              </span>
              <ArrowUpRight size={16} className="text-slate-400 transition group-hover:text-cyan-300" />
            </a>

            <AnimatePresence>
              {copied && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-center text-xs text-emerald-300"
                >
                  Copied to clipboard!
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Formspree-enabled Real Form */}
          <form onSubmit={handleSubmit} className="glass relative space-y-5 rounded-2xl border border-white/10 p-6 sm:p-8">
            {["name", "email"].map((field) => (
              <div key={field} className="relative">
                <input
                  required
                  type={field === "email" ? "email" : "text"}
                  placeholder={field === "name" ? "Your Name" : "Your Email"}
                  value={(form as any)[field]}
                  onFocus={() => setFocused(field)}
                  onBlur={() => setFocused(null)}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60"
                />
                {focused === field && (
                  <motion.div
                    layoutId="laser"
                    className="pointer-events-none absolute -inset-px rounded-xl shadow-[0_0_16px_2px_rgba(6,182,212,0.4)]"
                  />
                )}
              </div>
            ))}
            <div className="relative">
              <textarea
                required
                rows={4}
                placeholder="Tell me about your project..."
                value={form.message}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none transition placeholder:text-slate-500 focus:border-violet-400/60"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              data-cursor-hover
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:opacity-90 disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : sent ? "Message Sent!" : "Send Message"}
              <Send size={15} />
            </button>
          </form>
        </div>
      </div>

      <footer className="relative z-10 mx-auto mt-24 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row">
        <p>© {new Date().getFullYear()} Muhammad Irfan. Crafted with React, Framer Motion &amp; Canvas.</p>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          All systems operational
        </div>
      </footer>
    </section>
  );
}