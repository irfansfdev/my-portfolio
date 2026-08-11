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

  return (
    <div className="relative min-h-screen w-full bg-[#020617]">
      <NoiseOverlay />
      <CustomCursor />
      <Navbar onCommandOpen={() => setCommandOpen(true)} />
      <CommandMenu open={commandOpen} onClose={() => setCommandOpen(false)} />

      <main className="relative z-10">
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
