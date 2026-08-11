import { motion } from "framer-motion";
import { ArrowRight, Globe, Mail, Phone, ChevronDown, FileText } from "lucide-react"; // FileText import add kiya
import { useRef } from "react";
import ParticleField from "./ParticleField";
import LinkedinIcon from "./icons/LinkedinIcon";

// 1. MagneticButton mein target aur rel ko add kiya gaya hai
function MagneticButton({
  children,
  className,
  href,
  dataAttr,
  target,
  rel,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
  dataAttr?: boolean;
  target?: string;
  rel?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  return (
    <a
      ref={ref}
      href={href}
      target={target} // Naya tab open karne ke liye
      rel={rel}       // Security ke liye
      data-cursor-hover={dataAttr}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={`magnetic-btn transition-transform duration-200 ease-out ${className}`}
    >
      {children}
    </a>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-32"
    >
      <ParticleField />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950" />
      <div className="pointer-events-none absolute -top-20 left-1/4 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="relative z-10 mb-6 flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/5 px-4 py-1.5 font-mono text-[11px] text-emerald-300 sm:text-xs"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        Available for Freelance &amp; Full-time · Karachi, Pakistan
      </motion.div>

      <div className="relative z-10 text-center">
        <h1 className="font-display select-none text-[13vw] font-bold leading-[0.85] tracking-tighter text-white sm:text-[10vw] lg:text-[8.5vw]">
          <motion.span
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            MUHAMMAD
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-gradient block"
          >
            IRFAN
          </motion.span>
        </h1>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="relative z-10 mx-auto mt-6 max-w-xl text-center text-sm text-slate-400 sm:text-base"
      >
        Creative Front-End Developer &amp; UI/UX Specialist engineering
        <span className="text-slate-200">
          {" "}
          high-performance web applications.
        </span>
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="relative z-10 mt-10 flex flex-col items-center gap-4 sm:flex-row"
      >
        <MagneticButton
          href="#experience"
          dataAttr
          className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/25"
        >
          Explore Experience
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </MagneticButton>
        
        {/* 2. Yahan Direct Contact ki jagah Resume laga diya gaya hai */}
        <MagneticButton
          href="/Muhammad Irfan Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          dataAttr
          className="glass flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
        >
          <FileText size={16} className="text-cyan-400" />
          View Resume
        </MagneticButton>

      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="relative z-10 mt-12 flex items-center gap-5"
      >
        {[
          {
            icon: LinkedinIcon,
            href: "https://linkedin.com/in/muhammad-irfan99",
            label: "LinkedIn",
          },
          {
            icon: Globe,
            href: "https://muhammad-irfan-ivpl2jb.gamma.site",
            label: "Live Web",
          },
          {
            icon: Mail,
            href: "https://mail.google.com/mail/?view=cm&fs=1&to=irfan.sfdev@gmail.com",
            label: "Email",
          },
          { icon: Phone, href: "tel:+923412061108", label: "Phone" },
        ].map((s) => {
          const isWebLink = s.href.startsWith("http");

          return (
            <a
              key={s.label}
              href={s.href}
              target={isWebLink ? "_blank" : "_self"}
              rel={isWebLink ? "noreferrer" : undefined}
              data-cursor-hover
              aria-label={s.label}
              className="text-slate-500 transition-colors hover:text-cyan-400"
            >
              <s.icon size={18} />
            </a>
          );
        })}
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 z-10 flex flex-col items-center gap-1 text-slate-500"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">
          Scroll
        </span>
        <ChevronDown size={16} />
      </motion.div>
    </section>
  );
}