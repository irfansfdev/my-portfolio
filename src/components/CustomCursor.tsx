import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [hidden, setHidden] = useState(true);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, { damping: 25, stiffness: 250, mass: 0.5 });
  const ringY = useSpring(mouseY, { damping: 25, stiffness: 250, mass: 0.5 });

  const raf = useRef<number | undefined>(undefined);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setHidden(false);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      const target = e.target as HTMLElement;
      setIsPointer(!!target.closest("a, button, [data-cursor-hover], input, textarea"));
    };
    const leave = () => setHidden(true);
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [mouseX, mouseY]);

  return (
    <div className={`pointer-events-none fixed inset-0 z-[100] hidden md:block ${hidden ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}>
      <motion.div
        className="cursor-dot fixed top-0 left-0 h-1.5 w-1.5 rounded-full bg-cyan-400"
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="cursor-ring fixed top-0 left-0 rounded-full border border-cyan-300/60"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: isPointer ? 56 : 32,
          height: isPointer ? 56 : 32,
          backgroundColor: isPointer ? "rgba(124,58,237,0.15)" : "transparent",
          transition: "width .25s ease, height .25s ease, background-color .25s ease",
        }}
      />
    </div>
  );
}
