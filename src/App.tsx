import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomCursor from "./components/CustomCursor";
import NoiseOverlay from "./components/NoiseOverlay";
import Navbar from "./components/Navbar";
import CommandMenu from "./components/CommandMenu";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

export default function App() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    return savedTheme === "light" ? "cyberpunk" : savedTheme || "cyberpunk";
  });
  const [triggerPulse, setTriggerPulse] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((v) => !v);
      }
      if (e.key === "Escape") setCommandOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const activeTheme = theme === "light" ? "cyberpunk" : theme;
    document.documentElement.setAttribute("data-theme", activeTheme);
    localStorage.setItem("portfolio-theme", activeTheme);

    // Trigger transition pulse
    setTriggerPulse(true);
    const t = setTimeout(() => setTriggerPulse(false), 800);
    return () => clearTimeout(t);
  }, [theme]);

  return (
    /* YAHAN FIX KIYA HAI: max-w-[100vw] aur overflow-x-clip add kiya hai taake screen hile nahi aur sticky scroll work kare */
    <div className="relative min-h-screen w-full max-w-[100vw] overflow-x-clip bg-[var(--bg)] transition-colors duration-300">
      <AnimatePresence>
        {triggerPulse && (
          <motion.div
            key={theme}
            initial={{ opacity: 0.9, scale: 0.1 }}
            animate={{ opacity: 0, scale: 2.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="pointer-events-none fixed inset-0 z-[100] bg-[radial-gradient(circle,var(--theme-primary)_0%,transparent_70%)]"
          />
        )}
      </AnimatePresence>

      <NoiseOverlay />
      <CustomCursor />
      <Navbar theme={theme} setTheme={setTheme} onCommandOpen={() => setCommandOpen(true)} />
      <CommandMenu open={commandOpen} onClose={() => setCommandOpen(false)} />

      {/* Yahan bhi safety ke liye overflow clip lagaya hai taake sticky scroll blocks glitch na kare */}
      <main className="relative z-10 w-full overflow-x-clip">
        <Hero />
        <Skills />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}