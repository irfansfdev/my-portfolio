import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Skill {
  name: string;
  category: string;
  proficiency: number;
  experience: string;
}

const skillsData: Skill[] = [
  { name: "React.js", category: "Front-End Frameworks", proficiency: 72, experience: "Core technology for web applications, SPA architectures, component life cycles, and state patterns." },
  { name: "JavaScript (ES6+)", category: "Languages", proficiency: 75, experience: "Advanced DOM scripting, asynchronous event-loop patterns, modular code structures." },
  { name: "Apex", category: "Salesforce Development", proficiency: 85, experience: "Server-side controller engineering, trigger frameworks, asynchronous processing." },
  { name: "HTML5", category: "Web Core Technologies", proficiency: 85, experience: "Semantic content architectures, localized storage protocols, high-accessibility layouts." },
  { name: "CSS3", category: "Web Core Technologies", proficiency: 80, experience: "Custom properties, flexbox/grid layout design, smooth GPU-accelerated transitions." },
  { name: "Next.js", category: "Front-End Frameworks", proficiency: 78, experience: "Server-Side Rendering (SSR), static site generation, performance optimization hooks." },
  { name: "Tailwind CSS", category: "Styling & UI Systems", proficiency: 75, experience: "Utility-first modular styling, responsive breakpoint systems, dark mode config setups." },
  { name: "Bootstrap", category: "Styling & UI Systems", proficiency: 85, experience: "Standard grid layouts, component prototyping, custom configuration overrides." },
  { name: "Chakra UI", category: "Styling & UI Systems", proficiency: 80, experience: "Accessible component configurations, rapid layout speeds, built-in portal helpers." },
  { name: "React Router", category: "Web Architecture", proficiency: 70, experience: "Navigation routing architectures, client-side route guards, query-string states." },
  { name: "DOM Manipulation", category: "Web Core Technologies", proficiency: 62, experience: "High-performance direct page element modifications, event delegate binds." },
  { name: "Event Handling", category: "Web Core Technologies", proficiency: 65, experience: "High-performance event delegation, touchscreen swipe listeners, vector tracking." },
  { name: "Responsive UI", category: "Design & Layout Systems", proficiency: 85, experience: "Adaptive fluid sizing, screen break grids, viewport typography structures." },
  { name: "Salesforce", category: "Salesforce Development", proficiency: 68, experience: "CRM backend systems engineering, custom object data models, flow automated tasks." },
  { name: "LWC", category: "Salesforce Development", proficiency: 65, experience: "Lightning Web Component architecture, shadow DOM encapsulation, secure data transfers." },
  { name: "PHP", category: "Languages", proficiency: 55, experience: "Custom REST APIs, server-rendered layouts, basic database connectivity." },
  { name: "Git", category: "Tools & Version Control", proficiency: 78, experience: "Branching workflows, merge protocols, codebase history management." },
  { name: "GitHub", category: "Tools & Version Control", proficiency: 80, experience: "Workflow scripts, action pipelines, package hosting, team code reviews." },
  { name: "Supabase", category: "Backend & Database", proficiency: 60, experience: "Serverless SQL database integration, realtime listener sockets, Row-Level Security (RLS)." },
];

interface PhysicsNode {
  name: string;
  category: string;
  proficiency: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  isDragging: boolean;
  dragOffsetX: number;
  dragOffsetY: number;
}

function AnimatedPercentage({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 700; // ms
    const stepTime = Math.max(Math.floor(duration / value), 6);

    const timer = setInterval(() => {
      start += 1;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}%</span>;
}

function getProficiencyLabel(val: number): string {
  if (val >= 92) return "Expert Specialist";
  if (val >= 85) return "Advanced Practitioner";
  if (val >= 75) return "Competent Developer";
  return "Familiar / Basic";
}

export default function SkillsPlayground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const domRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const physicsNodesRef = useRef<PhysicsNode[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const containerDimRef = useRef({ width: 800, height: 550 });
  const cardRef = useRef<HTMLDivElement>(null);

  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Monitor mobile layout status
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Monitor visibility of section to pause performance-heavy loops
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Manage viewport resizing & boundaries updates
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        containerDimRef.current = { width: w, height: h };
        if (canvasRef.current) {
          canvasRef.current.width = w;
          canvasRef.current.height = h;
        }
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initialized]);

  // Initializing nodes and positions on mount
  useEffect(() => {
    if (!containerRef.current) return;
    const w = containerRef.current.clientWidth || 800;
    const h = containerRef.current.clientHeight || 550;

    // Spread nodes in a relaxed grid cell mapping
    const cols = 5;
    const cellWidth = w / cols;
    const cellHeight = h / 4.2;

    const initialNodes = skillsData.map((s, idx) => {
      const colIdx = idx % cols;
      const rowIdx = Math.floor(idx / cols);

      const initX = colIdx * cellWidth + cellWidth / 2 - 60 + (Math.random() - 0.5) * 20;
      const initY = rowIdx * cellHeight + cellHeight / 2 - 20 + (Math.random() - 0.5) * 15;

      const domEl = domRefs.current[idx];
      const nodeWidth = domEl ? domEl.offsetWidth : 120;
      const nodeHeight = domEl ? domEl.offsetHeight : 42;

      return {
        name: s.name,
        category: s.category,
        proficiency: s.proficiency,
        x: initX,
        y: initY,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        width: nodeWidth,
        height: nodeHeight,
        isDragging: false,
        dragOffsetX: 0,
        dragOffsetY: 0,
      };
    });

    physicsNodesRef.current = initialNodes;
    setInitialized(true);
  }, []);

  // Real-time physics engine loop (Damping, Collisions, Boundaries, Vector Repulsions)
  useEffect(() => {
    if (!initialized || !isVisible) return;
    let rafId: number;

    const tick = () => {
      const nodes = physicsNodesRef.current;
      const { width: containerWidth, height: containerHeight } = containerDimRef.current;
      const mouse = mouseRef.current;

      // 1. Damping & Forces updates
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (node.isDragging) {
          node.x = Math.max(10, Math.min(containerWidth - node.width - 10, node.x));
          node.y = Math.max(10, Math.min(containerHeight - node.height - 10, node.y));

          const domEl = domRefs.current[i];
          if (domEl) {
            domEl.style.transform = `translate3d(${node.x}px, ${node.y}px, 0)`;
          }
          continue;
        }

        // Friction damping
        node.vx *= 0.965;
        node.vy *= 0.965;

        // Soft pull to center clustering
        const targetCenterX = containerWidth / 2 - node.width / 2;
        const targetCenterY = containerHeight / 2 - node.height / 2;
        const dx = targetCenterX - node.x;
        const dy = targetCenterY - node.y;
        node.vx += dx * 0.0002;
        node.vy += dy * 0.0002;

        // Minor brownian drift drift
        node.vx += (Math.random() - 0.5) * 0.04;
        node.vy += (Math.random() - 0.5) * 0.04;

        // Interactive mouse pointer repulsion
        const mdx = node.x + node.width / 2 - mouse.x;
        const mdy = node.y + node.height / 2 - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 130) {
          const force = (130 - mdist) / 130;
          node.vx += (mdx / (mdist || 1)) * force * 0.45;
          node.vy += (mdy / (mdist || 1)) * force * 0.45;
        }

        // Velocity clamping
        const currentSpeed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        const maxSpeed = 3.5;
        if (currentSpeed > maxSpeed) {
          node.vx = (node.vx / currentSpeed) * maxSpeed;
          node.vy = (node.vy / currentSpeed) * maxSpeed;
        }

        node.x += node.vx;
        node.y += node.vy;
      }

      // 2. Node collision constraints checks (Double pass layout)
      for (let pass = 0; pass < 2; pass++) {
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const nI = nodes[i];
            const nJ = nodes[j];

            const cxI = nI.x + nI.width / 2;
            const cyI = nI.y + nI.height / 2;
            const cxJ = nJ.x + nJ.width / 2;
            const cyJ = nJ.y + nJ.height / 2;

            const dx = cxJ - cxI;
            const dy = cyJ - cyI;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const rI = Math.max(nI.width, nI.height) / 2;
            const rJ = Math.max(nJ.width, nJ.height) / 2;
            const targetMinDist = rI + rJ + 12; // safety buffer

            if (dist < targetMinDist) {
              const overlap = targetMinDist - dist;
              const nx = dx / (dist || 1);
              const ny = dy / (dist || 1);

              const pushStrengthX = nx * overlap * 0.12;
              const pushStrengthY = ny * overlap * 0.12;

              if (!nI.isDragging) {
                nI.x -= pushStrengthX;
                nI.y -= pushStrengthY;
                nI.vx -= pushStrengthX * 0.15;
                nI.vy -= pushStrengthY * 0.15;
              }
              if (!nJ.isDragging) {
                nJ.x += pushStrengthX;
                nJ.y += pushStrengthY;
                nJ.vx += pushStrengthX * 0.15;
                nJ.vy += pushStrengthY * 0.15;
              }
            }
          }
        }
      }

      // 3. Wall boundaries checks & DOM updates
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.isDragging) continue;

        const leftBound = 10;
        const rightBound = containerWidth - node.width - 10;
        const topBound = 10;
        const bottomBound = containerHeight - node.height - 10;

        if (node.x < leftBound) {
          node.x = leftBound;
          node.vx = Math.abs(node.vx) * 0.45;
        } else if (node.x > rightBound) {
          node.x = rightBound;
          node.vx = -Math.abs(node.vx) * 0.45;
        }

        if (node.y < topBound) {
          node.y = topBound;
          node.vy = Math.abs(node.vy) * 0.45;
        } else if (node.y > bottomBound) {
          node.y = bottomBound;
          node.vy = -Math.abs(node.vy) * 0.45;
        }

        const domEl = domRefs.current[i];
        if (domEl) {
          domEl.style.transform = `translate3d(${node.x}px, ${node.y}px, 0)`;
        }
      }

      // 4. Background Canvas Constellation drawing
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, containerWidth, containerHeight);
          ctx.strokeStyle = "rgba(250, 204, 21, 0.065)";
          ctx.lineWidth = 1;

          for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
              const nI = nodes[i];
              const nJ = nodes[j];

              const cxI = nI.x + nI.width / 2;
              const cyI = nI.y + nI.height / 2;
              const cxJ = nJ.x + nJ.width / 2;
              const cyJ = nJ.y + nJ.height / 2;

              const dx = cxJ - cxI;
              const dy = cyJ - cyI;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < 145) {
                ctx.beginPath();
                ctx.moveTo(cxI, cyI);
                ctx.lineTo(cxJ, cyJ);
                ctx.stroke();
              }
            }
          }
        }
      }

      // 5. Dynamic Details Card position updates (Desktop/Tablet)
      const detailsCard = cardRef.current;
      if (detailsCard && selectedNodeIndex !== null) {
        const node = nodes[selectedNodeIndex];
        const cardWidth = detailsCard.offsetWidth || 260;
        const cardHeight = detailsCard.offsetHeight || 170;

        let cardX = node.x + node.width / 2 - cardWidth / 2;
        let cardY = node.y - cardHeight - 12;

        // Prevent clipping coordinates
        if (cardX < 10) cardX = 10;
        if (cardX + cardWidth > containerWidth - 10) cardX = containerWidth - cardWidth - 10;

        if (cardY < 10) {
          cardY = node.y + node.height + 12;
        }

        detailsCard.style.transform = `translate3d(${cardX}px, ${cardY}px, 0)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [initialized, isVisible, selectedNodeIndex]);

  // Pointer event mappings for responsive mouse & touch mechanics
  const handlePointerDown = (index: number, e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);

    const nodes = physicsNodesRef.current;
    if (!nodes || !nodes[index]) return;

    const node = nodes[index];
    node.isDragging = true;

    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      node.dragOffsetX = e.clientX - rect.left - node.x;
      node.dragOffsetY = e.clientY - rect.top - node.y;
    }
    node.vx = 0;
    node.vy = 0;
  };

  const handlePointerMove = (index: number, e: React.PointerEvent) => {
    const nodes = physicsNodesRef.current;
    if (!nodes || !nodes[index]) return;

    const node = nodes[index];
    if (!node.isDragging) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const targetX = mouseX - node.dragOffsetX;
      const targetY = mouseY - node.dragOffsetY;

      // Track drag speed delta
      node.vx = (targetX - node.x) * 0.45;
      node.vy = (targetY - node.y) * 0.45;

      node.x = targetX;
      node.y = targetY;
    }
  };

  const handlePointerUp = (index: number, e: React.PointerEvent) => {
    const nodes = physicsNodesRef.current;
    if (!nodes || !nodes[index]) return;

    const node = nodes[index];
    node.isDragging = false;

    // Detect if pointer action represents static select tap or sweep throw
    const dragSpeed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
    if (dragSpeed < 1.3) {
      setSelectedSkill(skillsData[index]);
      setSelectedNodeIndex(index);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelectedSkill(skillsData[index]);
      setSelectedNodeIndex(index);
    }
  };

  // Tracking mouse inside container for active push vector
  const handleMouseMove = (e: React.PointerEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    }
  };

  const handleMouseLeave = () => {
    mouseRef.current.x = -9999;
    mouseRef.current.y = -9999;
  };

  return (
    <section id="skills" className="relative min-h-screen w-full overflow-hidden px-4 py-28 sm:px-8">
      {/* Background yellow theme glows */}
      <div className="pointer-events-none absolute left-10 top-1/3 h-72 w-72 rounded-full bg-yellow-500/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-10 bottom-1/4 h-72 w-72 rounded-full bg-amber-600/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-yellow-400">/ 02 — Toolkit</span>
        <h2 className="font-display mt-3 text-4xl font-bold text-white sm:text-6xl tracking-tight">
          DRAG. THROW. <span className="text-yellow-400">EXPLORE.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-slate-400 sm:text-base leading-relaxed">
          A living skill field, not a boring grid. Grab any node and throw it around — every skill represents a technology I use to build modern digital experiences.
        </p>
      </div>

      {/* Physics Field Box Container */}
      <div className="relative mx-auto mt-14 max-w-6xl">
        <div
          ref={containerRef}
          onPointerMove={handleMouseMove}
          onPointerLeave={handleMouseLeave}
          className="relative w-full h-[400px] sm:h-[480px] md:h-[550px] bg-[#0a0a0a] border border-neutral-900 rounded-3xl overflow-hidden cursor-default select-none shadow-[inset_0_0_40px_rgba(0,0,0,0.9)]"
        >
          {/* Active vector lines connection canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

          {/* Faint status indicator tag */}
          <div className="absolute top-4 right-5 font-mono text-[9px] text-neutral-500 flex items-center gap-1.5 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
            Interactive Physics Space
          </div>

          {/* Skill Nodes render */}
          {skillsData.map((skill, index) => {
            const isSelected = selectedNodeIndex === index;
            const isDimmed = selectedNodeIndex !== null && !isSelected;

            return (
              <button
                key={skill.name}
                ref={(el) => { domRefs.current[index] = el; }}
                onPointerDown={(e) => handlePointerDown(index, e)}
                onPointerMove={(e) => handlePointerMove(index, e)}
                onPointerUp={(e) => handlePointerUp(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                tabIndex={0}
                aria-label={`Skill: ${skill.name}. Select to view proficiency detail.`}
                style={{
                  touchAction: "none",
                  position: "absolute",
                  left: 0,
                  top: 0,
                  willChange: "transform",
                }}
                className={`flex select-none items-center gap-1.5 rounded-xl px-3.5 py-2 font-mono text-[11px] font-medium outline-none transition-all duration-300 cursor-grab active:cursor-grabbing border ${isSelected
                  ? "bg-[#171717] border-yellow-400 text-white shadow-[0_0_20px_rgba(250,204,21,0.25)] scale-110 z-30"
                  : isDimmed
                    ? "bg-[#0b0b0b]/60 border-neutral-900 text-neutral-600 opacity-40 z-10"
                    : "bg-[#111111]/85 hover:bg-[#171717] border-neutral-800 text-neutral-300 hover:text-white hover:border-yellow-400/40 hover:scale-105 hover:shadow-[0_0_12px_rgba(250,204,21,0.05)] z-20"
                  } focus-visible:ring-1 focus-visible:ring-yellow-400`}
              >
                <span className={`w-1.5 h-1.5 rounded-full transition-colors ${isSelected ? "bg-yellow-400 animate-pulse" : "bg-neutral-700"}`} />
                {skill.name}
              </button>
            );
          })}

          {/* Floating Details Overlay Card (Desktop/Tablet Layout) */}
          {!isMobile && (
            <AnimatePresence>
              {selectedSkill && (
                <motion.div
                  ref={cardRef}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="glass absolute z-50 rounded-2xl border border-yellow-400/30 p-4 w-[260px] bg-[#111111]/95 text-left pointer-events-auto shadow-2xl shadow-black/80"
                  style={{ position: "absolute", left: 0, top: 0 }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSkill(null);
                      setSelectedNodeIndex(null);
                    }}
                    className="absolute top-2.5 right-2.5 text-neutral-500 hover:text-white transition-colors p-1 rounded hover:bg-white/5"
                    aria-label="Close details"
                  >
                    <X size={14} />
                  </button>

                  <h4 className="text-[9px] uppercase tracking-wider text-yellow-400 font-mono font-semibold">SKILL PROFILE</h4>
                  <h3 className="text-base font-bold text-white mt-0.5 font-display">{selectedSkill.name}</h3>

                  <div className="flex items-center gap-3.5 mt-3">
                    {/* SVG Radial Meter */}
                    <div className="relative flex items-center justify-center shrink-0">
                      <svg className="w-12 h-12 transform -rotate-90">
                        <circle cx="24" cy="24" r="20" className="stroke-neutral-800" strokeWidth="3" fill="transparent" />
                        <motion.circle
                          cx="24"
                          cy="24"
                          r="20"
                          className="stroke-yellow-400"
                          strokeWidth="3"
                          fill="transparent"
                          initial={{ strokeDasharray: "126", strokeDashoffset: "126" }}
                          animate={{ strokeDashoffset: 126 - (126 * selectedSkill.proficiency) / 100 }}
                          transition={{ duration: 0.7, ease: "easeOut" }}
                        />
                      </svg>
                      <div className="absolute font-mono text-[9px] font-bold text-white">
                        <AnimatedPercentage value={selectedSkill.proficiency} />
                      </div>
                    </div>

                    <div>
                      <p className="text-[9px] uppercase text-neutral-500 tracking-wider font-mono">Proficiency</p>
                      <p className="text-xs font-semibold text-neutral-200 mt-0.5">{getProficiencyLabel(selectedSkill.proficiency)}</p>
                    </div>
                  </div>

                  <div className="mt-3.5 border-t border-neutral-900 pt-3">
                    <p className="text-[9px] uppercase text-neutral-500 tracking-wider font-mono">Category</p>
                    <p className="text-xs text-neutral-300 font-medium mt-0.5">{selectedSkill.category}</p>
                    <p className="text-[10px] text-neutral-400 leading-normal mt-1.5 font-sans font-normal">{selectedSkill.experience}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        {/* Mobile-Responsive Static Bottom Card Details Panel */}
        {isMobile && (
          <AnimatePresence>
            {selectedSkill && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="glass mt-4 rounded-2xl border border-yellow-400/20 p-5 shadow-xl bg-[#111111] text-left w-full relative"
              >
                <button
                  onClick={() => {
                    setSelectedSkill(null);
                    setSelectedNodeIndex(null);
                  }}
                  className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors p-1"
                  aria-label="Close details"
                >
                  <X size={16} />
                </button>

                <h4 className="text-[9px] uppercase tracking-wider text-yellow-400 font-mono font-semibold">SKILL PROFILE</h4>
                <h3 className="text-lg font-bold text-white mt-0.5 font-display">{selectedSkill.name}</h3>

                <div className="flex items-center gap-4 mt-4">
                  <div className="relative flex items-center justify-center shrink-0">
                    <svg className="w-14 h-14 transform -rotate-90">
                      <circle cx="28" cy="28" r="23" className="stroke-neutral-800" strokeWidth="3" fill="transparent" />
                      <motion.circle
                        cx="28"
                        cy="28"
                        r="23"
                        className="stroke-yellow-400"
                        strokeWidth="3"
                        fill="transparent"
                        initial={{ strokeDasharray: "144", strokeDashoffset: "144" }}
                        animate={{ strokeDashoffset: 144 - (144 * selectedSkill.proficiency) / 100 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute font-mono text-xs font-bold text-white">
                      <AnimatedPercentage value={selectedSkill.proficiency} />
                    </div>
                  </div>

                  <div>
                    <p className="text-[9px] uppercase text-neutral-500 tracking-wider font-mono">Proficiency</p>
                    <p className="text-sm font-semibold text-neutral-200 mt-0.5">{getProficiencyLabel(selectedSkill.proficiency)}</p>
                  </div>
                </div>

                <div className="mt-4 border-t border-neutral-900 pt-4">
                  <p className="text-[9px] uppercase text-neutral-500 tracking-wider font-mono">Category</p>
                  <p className="text-xs text-neutral-300 font-medium mt-0.5">{selectedSkill.category}</p>
                  <p className="text-xs text-neutral-400 leading-normal mt-2 font-sans font-normal">{selectedSkill.experience}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      <p className="relative z-10 mt-7 text-center font-mono text-[9px] uppercase tracking-widest text-neutral-600">
        * Pointer Physics Active · Grab & Fling Any Pill *
      </p>
    </section>
  );
}
