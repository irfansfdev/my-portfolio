import { useEffect, useState } from "react";
import CustomCursor from "./components/CustomCursor";
import NoiseOverlay from "./components/NoiseOverlay";
import Navbar from "./components/Navbar";
import CommandMenu from "./components/CommandMenu";
import Hero from "./components/Hero";
import SkillsPlayground from "./components/SkillsPlayground";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

export default function App() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("portfolio-theme") || "cyberpunk";
  });

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
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  return (
    /* YAHAN FIX KIYA HAI: max-w-[100vw] aur overflow-x-hidden add kiya hai taake screen hile nahi */
    <div className="relative min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-[var(--bg)] transition-colors duration-300">
      <NoiseOverlay />
      <CustomCursor />
      <Navbar theme={theme} setTheme={setTheme} onCommandOpen={() => setCommandOpen(true)} />
      <CommandMenu open={commandOpen} onClose={() => setCommandOpen(false)} />

      {/* Yahan bhi safety ke liye overflow hidden lagaya hai */}
      <main className="relative z-10 w-full overflow-x-hidden">
        <Hero />
        <SkillsPlayground />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}