import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  Atom,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  Globe,
  Layers,
  Scan,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

// ==========================================
// DATA DEFINITIONS & TELEMETRY
// ==========================================

interface TechNode {
  id: string;
  name: string;
  category: string;
  version: string;
  angle: number; // degrees around core
  radiusPercent: number; // distance from center (0 to 50%)
  icon: typeof Layers;
  highlight: string;
  description: string;
  projectLink: string;
  metrics: string;
  role: string;
  tier: "frontend" | "backend" | "architecture";
}

const TECH_NODES: TechNode[] = [
  {
    id: "nextjs",
    name: "Next.js",
    category: "Full-Stack Framework",
    version: "v15.2 App Router",
    angle: 30,
    radiusPercent: 35,
    icon: Layers,
    highlight: "#fbbf24",
    description: "Server Components, Server Actions, Dynamic OG, Edge Middleware, ISR caching.",
    projectLink: "BabulShop & Hospital System",
    metrics: "100/100 Lighthouse · <0.4s FCP",
    role: "Full-Stack Application Core",
    tier: "architecture",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Type Safety",
    version: "v5.9 Strict",
    angle: 90,
    radiusPercent: 35,
    icon: Code2,
    highlight: "#38bdf8",
    description: "Strict generic schemas, end-to-end typed RPCs, runtime Zod validation.",
    projectLink: "BabulShop & Typing Speed",
    metrics: "0 Runtime Type Faults",
    role: "End-to-End Type Contract",
    tier: "architecture",
  },
  {
    id: "react",
    name: "React",
    category: "UI Engine",
    version: "v19 Concurrent",
    angle: 150,
    radiusPercent: 35,
    icon: Atom,
    highlight: "#67e8f9",
    description: "Concurrent rendering, useActionState, optimistic updates, micro-interactions.",
    projectLink: "ChickBite & All Frontends",
    metrics: "Fluid 60-120 FPS UI",
    role: "Reactive Interface Synthesis",
    tier: "frontend",
  },
  {
    id: "supabase",
    name: "Supabase",
    category: "Cloud Backend & DB",
    version: "PostgreSQL 16",
    angle: 210,
    radiusPercent: 35,
    icon: Database,
    highlight: "#34d399",
    description: "Row Level Security (RLS), multi-tenant auth, Postgres RPCs, real-time channels.",
    projectLink: "BabulShop Flagship",
    metrics: "Sub-12ms Edge Latencies",
    role: "Multi-Tenant Data Persistence",
    tier: "backend",
  },
  {
    id: "tailwind",
    name: "Tailwind",
    category: "Design System",
    version: "v4 Oxide",
    angle: 270,
    radiusPercent: 35,
    icon: Sparkles,
    highlight: "#fbbf24",
    description: "Bespoke design tokens, glassmorphic shaders, hardware-accelerated fluid motion.",
    projectLink: "Portfolio & FoodWeb",
    metrics: "<15KB Zero-Runtime CSS",
    role: "Visual Engineering & Shaders",
    tier: "frontend",
  },
  {
    id: "wordpress",
    name: "WordPress",
    category: "Content Management System",
    version: "Themes & Plugins",
    angle: 330,
    radiusPercent: 35,
    icon: Globe,
    highlight: "#5b9dd0",
    description: "Content-driven websites with customizable themes, reusable pages, and a flexible plugin ecosystem.",
    projectLink: "WordPress Content Sites",
    metrics: "Flexible content publishing",
    role: "CMS & Website Development",
    tier: "frontend",
  },
];

interface ShowcaseProject {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  metrics: { label: string; value: string };
  sparkline: number[];
  technologies: string[];
  link: string;
}

const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: "babulshop",
    tag: "FLAGSHIP / MULTI-VENDOR",
    title: "BabulShop",
    subtitle: "Enterprise Multi-Vendor Commerce",
    description: "Engineered with 4 distinct user tiers, multi-cart unified checkout, and Supabase RLS security policies.",
    badge: "RLS VERIFIED",
    metrics: { label: "ACTIVE CARTS", value: "1,480+" },
    sparkline: [35, 55, 48, 72, 60, 85, 78, 100],
    technologies: ["Next.js 15", "Supabase", "TypeScript", "Tailwind"],
    link: "#projects",
  },
  {
    id: "cinebook",
    tag: "BOOKINGS / COMMERCE",
    title: "CineBook",
    subtitle: "Cinema & Live Ticket Gateway",
    description: "Automated seat selection, secure Stripe checkout webhooks, and cryptographic QR ticket validation.",
    badge: "STRIPE LIVE",
    metrics: { label: "CHECKOUT TIME", value: "<1.8s" },
    sparkline: [40, 62, 50, 78, 65, 92, 80, 96],
    technologies: ["Laravel 12", "Stripe API", "QR Engine", "MySQL"],
    link: "#projects",
  },
  {
    id: "chickbite",
    tag: "INTERACTIVE / ORDERING",
    title: "ChickBite",
    subtitle: "Ultra-Fast Food Ordering Simulator",
    description: "Real-time interactive food ordering with live cart synchronization, dynamic price tally, and playful UX.",
    badge: "60 FPS UI",
    metrics: { label: "STATE LATENCY", value: "0ms" },
    sparkline: [45, 58, 68, 75, 82, 90, 88, 100],
    technologies: ["React 19", "Context API", "Tailwind", "Vite"],
    link: "#projects",
  },
];

const LOG_MESSAGES = [
  { prefix: "INIT", text: "Next.js 15 App Router initialized in 48ms", color: "#fbbf24" },
  { prefix: "AUTH", text: "Supabase RLS active: 4 isolated role policies", color: "#34d399" },
  { prefix: "PERF", text: "Edge cache hit ratio: 99.4% (Karachi -> Global)", color: "#38bdf8" },
  { prefix: "SYNC", text: "State synchronized across concurrent clients", color: "#a78bfa" },
  { prefix: "POSTGRES", text: "Database connection pool nominal: 11ms latency", color: "#34d399" },
  { prefix: "STATUS", text: "Ready for high-impact full-stack challenges", color: "#fbbf24" },
];

const BENCHMARK_METRICS = [
  { label: "LIGHTHOUSE SCORE", value: "100%", sub: "Performance & SEO", color: "#fbbf24" },
  { label: "EDGE LATENCY", value: "12ms", sub: "Global Multi-Region", color: "#34d399" },
  { label: "TYPE COVERAGE", value: "100%", sub: "Strict TypeScript", color: "#38bdf8" },
  { label: "UPTIME SLA", value: "99.98%", sub: "Zero Downtime Deploy", color: "#f97316" },
];

export default function OrbitStack() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // State
  const [selectedTech, setSelectedTech] = useState<TechNode | null>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activeMode, setActiveMode] = useState<"nexus" | "stack" | "metrics">("stack");
  const [isScanning, setIsScanning] = useState(false);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [fps, setFps] = useState(60);

  // Shockwave trigger ref for canvas
  const shockwavesRef = useRef<{ x: number; y: number; r: number; maxR: number; alpha: number }[]>([]);

  // Mouse coords for canvas interaction
  const mouseCanvasPos = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });

  // Terminal log cycling
  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setCurrentLogIndex((prev) => (prev + 1) % LOG_MESSAGES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  // Project auto-rotation when no tech is selected and not in metrics mode
  useEffect(() => {
    if (shouldReduceMotion || selectedTech || activeMode === "metrics") return;
    const timer = setInterval(() => {
      setActiveProjectIndex((prev) => (prev + 1) % SHOWCASE_PROJECTS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [shouldReduceMotion, selectedTech, activeMode]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (canvasRef.current) {
      const cRect = canvasRef.current.getBoundingClientRect();
      mouseCanvasPos.current = {
        x: e.clientX - cRect.left,
        y: e.clientY - cRect.top,
      };
    }
  };

  const handleMouseLeave = () => {
    mouseCanvasPos.current = { x: -9999, y: -9999 };
  };

  // Trigger Laser Radar Scan & Shockwave
  const triggerScan = () => {
    if (isScanning) return;
    setIsScanning(true);

    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      shockwavesRef.current.push({
        x: rect.width / 2,
        y: rect.height / 2,
        r: 0,
        maxR: Math.max(rect.width, rect.height) * 0.75,
        alpha: 1,
      });
    }

    setTimeout(() => setIsScanning(false), 2400);
  };

  // Click Core triggers Shockwave
  const handleCoreClick = () => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      shockwavesRef.current.push({
        x: rect.width / 2,
        y: rect.height / 2,
        r: 10,
        maxR: Math.max(rect.width, rect.height) * 0.7,
        alpha: 1,
      });
    }
  };

  // 3D Quantum Particle Vortex Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Generate 3D Spherical Particle Cloud
    const PARTICLE_COUNT = 145;
    interface P3D {
      x: number;
      y: number;
      z: number;
      ox: number;
      oy: number;
      oz: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      pulseSpeed: number;
      pulseOffset: number;
    }

    const particles: P3D[] = [];
    const radius = 175;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = radius * (0.35 + 0.65 * Math.cbrt(Math.random()));

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      const isGold = Math.random() > 0.22;
      const color = isGold ? "251, 191, 36" : "254, 240, 138";

      particles.push({
        x,
        y,
        z,
        ox: x,
        oy: y,
        oz: z,
        vx: 0,
        vy: 0,
        size: Math.random() * 2.3 + 0.8,
        color,
        alpha: Math.random() * 0.7 + 0.3,
        pulseSpeed: Math.random() * 0.03 + 0.015,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    let angleX = 0.003;
    let angleY = 0.0055;
    let frameCount = 0;
    let fpsTimer = performance.now();

    const render = (time: number) => {
      frameCount++;
      if (time - fpsTimer >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        fpsTimer = time;
      }

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const fov = 340;

      // Handle shockwaves
      const waves = shockwavesRef.current;
      for (let i = waves.length - 1; i >= 0; i--) {
        const sw = waves[i];
        sw.r += 6.5;
        sw.alpha *= 0.95;

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(251, 191, 36, ${sw.alpha * 0.65})`;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        if (sw.alpha < 0.02 || sw.r > sw.maxR) {
          waves.splice(i, 1);
        }
      }

      // Slight rotation delta
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      // Render projected points
      const projected: { x2d: number; y2d: number; scale: number; p: P3D }[] = [];

      const mx = mouseCanvasPos.current.x;
      const my = mouseCanvasPos.current.y;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 3D rotation
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.z * cosY + p.x * sinY;
        let y1 = p.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.y * sinX;

        p.x = x1;
        p.y = y1;
        p.z = z2;

        const depth = z2 + fov;
        if (depth > 10) {
          const scale = fov / depth;
          let x2d = cx + x1 * scale + p.vx;
          let y2d = cy + y1 * scale + p.vy;

          // Mouse proximity repulsion
          if (mx > -1000) {
            const dx = x2d - mx;
            const dy = y2d - my;
            const dist = Math.hypot(dx, dy);
            const repelRadius = 85;
            if (dist < repelRadius) {
              const force = (repelRadius - dist) / repelRadius;
              p.vx += (dx / (dist || 1)) * force * 1.5;
              p.vy += (dy / (dist || 1)) * force * 1.5;
            }
          }

          // Damping & return to base
          p.vx *= 0.88;
          p.vy *= 0.88;

          projected.push({ x2d, y2d, scale, p });
        }
      }

      // Draw Constellation Filaments between close points
      const maxDist = 48;
      ctx.lineWidth = 0.65;
      for (let i = 0; i < projected.length; i++) {
        const a = projected[i];
        for (let j = i + 1; j < projected.length; j++) {
          const b = projected[j];
          const dx = a.x2d - b.x2d;
          const dy = a.y2d - b.y2d;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.22 * Math.min(a.scale, b.scale);
            ctx.strokeStyle = `rgba(251, 191, 36, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x2d, a.y2d);
            ctx.lineTo(b.x2d, b.y2d);
            ctx.stroke();
          }
        }
      }

      // Draw Particles with soft golden glow
      for (let i = 0; i < projected.length; i++) {
        const { x2d, y2d, scale, p } = projected[i];
        const pulse = Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.3 + 0.7;
        const radius = p.size * scale * pulse;
        const alpha = p.alpha * Math.min(scale, 1.4);

        // Core dot
        ctx.fillStyle = `rgba(${p.color}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x2d, y2d, Math.max(0.5, radius), 0, Math.PI * 2);
        ctx.fill();

        // Extra halo on brighter nodes
        if (p.size > 2) {
          ctx.fillStyle = `rgba(${p.color}, ${alpha * 0.25})`;
          ctx.beginPath();
          ctx.arc(x2d, y2d, radius * 2.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const activeProject = SHOWCASE_PROJECTS[activeProjectIndex];

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handleMouseLeave}
      className="orbit-stack relative mx-auto w-full max-w-[660px] select-none lg:max-w-none"
    >
      <div className="relative flex w-full flex-col items-center justify-center py-2">
        {/* ======================================================== */}
        {/* TOP STATUS & MODE SELECTOR BAR (HUD HEADER) */}
        {/* ======================================================== */}
        <div className="relative z-30 mb-3 flex w-full items-center justify-between gap-2 rounded-2xl border border-amber-500/25 bg-[#060a12]/85 px-3 py-2 backdrop-blur-xl sm:px-5">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]" />
            </span>
            <div className="flex flex-col">
              <span className="font-mono text-[9px] font-bold tracking-wider text-amber-300 sm:text-[10px]">
                NEXUS ENGINE v2.5
              </span>
              <span className="font-mono text-[8px] text-slate-400">
                ACTIVE · {fps} FPS
              </span>
            </div>
          </div>

          {/* Mode Switchers */}
          <div className="flex items-center gap-1 rounded-xl border border-white/5 bg-black/40 p-1">
            {(
              [
                { id: "nexus", label: "NEXUS", icon: Cpu },
                { id: "stack", label: "STACK", icon: Layers },
                { id: "metrics", label: "METRICS", icon: Activity },
              ] as const
            ).map((mode) => {
              const Icon = mode.icon;
              const isActive = activeMode === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setActiveMode(mode.id)}
                  aria-label={mode.label}
                  aria-pressed={isActive}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-mono text-[8px] font-medium tracking-wider transition-all sm:text-[9px] ${
                    isActive
                      ? "border border-amber-400/40 bg-amber-400/20 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.25)]"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Icon size={11} />
                  <span className="max-[389px]:hidden">{mode.label}</span>
                </button>
              );
            })}
          </div>

          {/* Scan Pulse Button */}
          <button
            type="button"
            onClick={triggerScan}
            title="Trigger Radar Scan"
            className="flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-2.5 py-1.5 font-mono text-[8px] text-amber-300 transition-all hover:border-amber-400 hover:bg-amber-500/25 hover:shadow-[0_0_15px_rgba(251,191,36,0.4)] active:scale-95 max-[639px]:relative max-[639px]:right-1.5 sm:text-[9px]"
          >
            <Scan size={12} className={isScanning ? "animate-spin text-amber-200" : ""} />
            <span className="hidden sm:inline">RADAR SCAN</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* MAIN 3D HOLOGRAPHIC STAGE */}
        {/* ======================================================== */}
        <div className="orbit-stage relative isolate flex aspect-square w-full max-w-[540px] items-center justify-center overflow-visible [perspective:1400px]">
          {/* Subtle Cybernetic Grid Base Plate (Receding 3D Plane) */}
          <div
            className="pointer-events-none absolute inset-0 -z-20 rounded-full opacity-25"
            style={{
              background:
                "radial-gradient(circle, rgba(251,191,36,0.22) 0%, rgba(245,158,11,0.06) 45%, transparent 70%)",
              filter: "blur(32px)",
            }}
          />

          {/* Radar Scanline Wave */}
          {isScanning && (
            <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden rounded-full">
              <div className="h-full w-full animate-radar-sweep rounded-full border-b-2 border-amber-400/80 bg-gradient-to-t from-amber-400/15 to-transparent" />
            </div>
          )}

          {/* 3D Interactive Canvas Particle Sphere */}
          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 z-0 h-full w-full"
          />

          {/* ======================================================== */}
          {/* SVG LASER NEURAL DATA BUS (CONNECTS NODES DIRECTLY TO CORE) */}
          {/* ======================================================== */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible"
            style={{
              transformOrigin: "50% 50%",
              animation: shouldReduceMotion ? "none" : "orbit-tech-spin 64s linear infinite",
            }}
          >
            {TECH_NODES.map((node) => {
              const radians = (node.angle * Math.PI) / 180;
              const left = 50 + Math.cos(radians) * node.radiusPercent;
              const top = 50 + Math.sin(radians) * node.radiusPercent;
              const isSelected = selectedTech?.id === node.id;
              const isStackMode = activeMode === "stack";

              if (!isSelected && !isStackMode) return null;

              return (
                <line
                  key={`line-${node.id}`}
                  x1={50}
                  y1={50}
                  x2={left}
                  y2={top}
                  stroke={isSelected ? "#fbbf24" : "rgba(251,191,36,0.4)"}
                  strokeWidth={isSelected ? "0.6" : "0.35"}
                  strokeDasharray="1.2 0.8"
                  className="animate-laser-flow"
                />
              );
            })}
          </svg>

          {/* ======================================================== */}
          {/* MULTI-AXIS GYROSCOPE RINGS (CSS 3D HARDWARE ACCELERATED) */}
          {/* ======================================================== */}

          {/* Outer Calibration Ring */}
          <div
            className="pointer-events-none absolute inset-[6%] z-1 rounded-full border border-amber-500/25 shadow-[0_0_24px_rgba(251,191,36,0.08)]"
            style={{
              transform: "rotateZ(12deg)",
              animation: shouldReduceMotion ? "none" : "orbit-spin-slow 60s linear infinite",
            }}
          >
            {/* Compass degree ticks */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <span
                key={deg}
                className="absolute top-1/2 left-1/2 block h-2 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-amber-400/40"
                style={{
                  transform: `rotate(${deg}deg) translateY(-210px)`,
                }}
              />
            ))}
            {/* Glowing orbital diamond spark */}
            <span className="absolute top-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-amber-300 bg-amber-400 shadow-[0_0_12px_#fbbf24]" />
          </div>

          {/* Mid Gimbal Ring (Tilted 3D Hex/Ellipse) */}
          <div
            className="pointer-events-none absolute inset-[15%] z-2 rounded-full border border-dashed border-amber-400/35"
            style={{
              transform: "rotateX(58deg) rotateY(18deg)",
              animation: shouldReduceMotion ? "none" : "orbit-spin-reverse 40s linear infinite",
            }}
          >
            <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-amber-300 shadow-[0_0_10px_#fde047]" />
            <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-amber-300 shadow-[0_0_10px_#fde047]" />
          </div>

          {/* Inner High-Speed Laser Ring */}
          <div
            className="pointer-events-none absolute inset-[25%] z-3 rounded-full border border-amber-300/40 shadow-[0_0_16px_rgba(251,191,36,0.18)]"
            style={{
              transform: "rotateX(-52deg) rotateY(28deg)",
              animation: shouldReduceMotion ? "none" : "orbit-spin-slow 22s linear infinite",
            }}
          >
            <span className="absolute top-1/2 -right-1 h-2 w-2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_14px_#ffffff]" />
          </div>

          {/* ======================================================== */}
          {/* CENTRAL HYPER-REACTOR CORE (INTERACTIVE CLICK/TAP) */}
          {/* ======================================================== */}
          <button
            type="button"
            onClick={handleCoreClick}
            title="Click to trigger quantum ripple"
            className="group relative z-10 flex h-[135px] w-[135px] cursor-pointer items-center justify-center rounded-full border border-amber-400/60 bg-gradient-to-br from-[#121c2c] via-[#090f19] to-[#04060b] shadow-[0_0_60px_rgba(251,191,36,0.35),inset_0_0_30px_rgba(251,191,36,0.25)] transition-transform duration-300 hover:scale-105 active:scale-95 sm:h-[160px] sm:w-[160px]"
            style={{ transform: "translateZ(45px)" }}
          >
            {/* Concentric Energy Pulse Rings */}
            <span className="pointer-events-none absolute inset-[-14px] animate-ping-slow rounded-full border border-amber-400/20" />
            <span className="pointer-events-none absolute inset-[-30px] animate-pulse-slow rounded-full border border-amber-500/10" />

            {/* Specular Inner Highlight */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-t from-transparent via-amber-400/5 to-white/10" />

            {/* Center Monogram & Cyber Data */}
            <div className="relative flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                <span className="font-mono text-[7px] tracking-widest text-amber-200/80 sm:text-[8px]">
                  FULL-STACK
                </span>
              </div>
              <h2 className="font-display my-0.5 text-3xl font-extrabold tracking-tight text-white drop-shadow-[0_0_20px_rgba(251,191,36,0.7)] sm:text-4xl">
                MI<span className="text-amber-400">.</span>
              </h2>
              <span className="font-mono text-[8px] font-semibold tracking-[0.2em] text-amber-400 sm:text-[9px]">
                ARCHITECT
              </span>
              <div className="mt-1 flex items-center gap-1 rounded-full border border-amber-400/30 bg-black/40 px-2 py-0.5 font-mono text-[7px] text-slate-300">
                <ShieldCheck size={9} className="text-emerald-400" />
                <span>ONLINE</span>
              </div>
            </div>
          </button>

          {/* ======================================================== */}
          {/* SATELLITE TECH NODES (INTERACTIVE 3D ORBIT CONSTELLATION) */}
          {/* ======================================================== */}
          <div className="orbit-tech-rotation pointer-events-none">
            {TECH_NODES.map((node) => {
              const radians = (node.angle * Math.PI) / 180;
              // Radius relative to stage size - tuned so it never clips on any viewport
              const left = 50 + Math.cos(radians) * node.radiusPercent;
              const top = 50 + Math.sin(radians) * node.radiusPercent;
              const isSelected = selectedTech?.id === node.id;
              const Icon = node.icon;

              return (
                <div
                  key={node.id}
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    transform: `translate(-50%, -50%) translateZ(${isSelected ? 70 : 35}px)`,
                  }}
                  className="pointer-events-auto absolute z-20 transition-transform duration-300"
                >
                  <div className="orbit-tech-counter-rotation">
                    <button
                      type="button"
                      onClick={() => setSelectedTech(isSelected ? null : node)}
                      className={`group relative flex min-h-7 items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 font-mono leading-none backdrop-blur-md transition-all duration-300 active:scale-95 sm:min-h-8 sm:gap-2 sm:px-3 sm:py-1.5 ${
                        isSelected
                          ? "border-amber-400 bg-amber-400/25 text-white shadow-[0_0_24px_rgba(251,191,36,0.6)]"
                          : "border-white/15 bg-[#080d17]/85 text-slate-200 hover:border-amber-400/60 hover:bg-[#0e1626] hover:text-white hover:shadow-[0_0_18px_rgba(251,191,36,0.3)]"
                      }`}
                    >
                      <span
                        className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-white/10 sm:h-5 sm:w-5"
                        style={{ backgroundColor: `${node.highlight}20` }}
                      >
                        <Icon size={11} style={{ color: node.highlight }} />
                      </span>
                      <span className="text-[9px] font-semibold tracking-wide sm:text-[10px]">
                        {node.name}
                      </span>
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{
                          backgroundColor: node.highlight,
                          boxShadow: `0 0 6px ${node.highlight}`,
                        }}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ======================================================== */}
          {/* HOLOGRAPHIC TECH INSPECTOR (POPOVER WHEN NODE IS CLICKED) */}
          {/* ======================================================== */}
          <AnimatePresence>
            {selectedTech && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ duration: 0.22 }}
                className="absolute z-50 w-[min(340px,90vw)] rounded-2xl border border-amber-400/60 bg-[#060a12]/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(251,191,36,0.25)] backdrop-blur-2xl"
                style={{
                  transform: "translateZ(85px)",
                }}
              >
                <div className="flex items-start justify-between border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10"
                      style={{ backgroundColor: `${selectedTech.highlight}25` }}
                    >
                      <selectedTech.icon size={16} style={{ color: selectedTech.highlight }} />
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-bold text-white">
                        {selectedTech.name}
                      </h4>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-amber-300">
                        {selectedTech.category} · {selectedTech.version}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedTech(null)}
                    className="rounded-lg border border-white/10 p-1 text-slate-400 hover:border-white/30 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <div className="mt-3 space-y-2 text-[11px] leading-relaxed text-slate-300">
                  <p>{selectedTech.description}</p>
                  <div className="rounded-xl border border-white/5 bg-black/40 p-2 font-mono text-[9px]">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>ROLE</span>
                      <span className="text-amber-300">{selectedTech.role}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-slate-400">
                      <span>METRIC</span>
                      <span className="text-emerald-400">{selectedTech.metrics}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-slate-400">
                      <span>PROJECTS</span>
                      <span className="text-sky-300">{selectedTech.projectLink}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ======================================================== */}
        {/* LOWER FLOATING HUD CARDS (PROJECT & TERMINAL TELEMETRY) */}
        {/* ======================================================== */}
        {activeMode === "metrics" ? (
          /* METRICS OVERLAY MODE */
          <div
            className="relative z-30 mt-4 grid w-full grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {BENCHMARK_METRICS.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-amber-500/25 bg-[#060a12]/85 p-3 text-center backdrop-blur-xl transition-all hover:border-amber-400/50"
              >
                <span className="font-mono text-[7px] font-bold uppercase tracking-wider text-slate-400 sm:text-[8px]">
                  {item.label}
                </span>
                <div
                  className="font-display my-1 text-xl font-bold sm:text-2xl"
                  style={{ color: item.color }}
                >
                  {item.value}
                </div>
                <span className="block font-mono text-[7px] text-slate-500">
                  {item.sub}
                </span>
              </div>
            ))}
          </div>
        ) : (
          /* STANDARD TELEMETRY & PROJECT CARDS */
          <div className="relative z-30 mt-4 grid w-full grid-cols-1 gap-3.5 sm:grid-cols-2">
            {/* ---------------------------------------------------- */}
            {/* CARD 1: LIVE PROJECT SHOWCASE HUD (TOP/LEFT CARD) */}
            {/* ---------------------------------------------------- */}
            <div
              className="group relative overflow-hidden rounded-2xl border border-amber-500/25 bg-[#060a12]/85 p-3.5 shadow-[0_12px_36px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 hover:border-amber-400/50 hover:shadow-[0_0_24px_rgba(251,191,36,0.15)] sm:p-4"
            >
              {/* Cyber Corner Decals */}
              <span className="absolute top-1.5 left-1.5 font-mono text-[8px] text-amber-500/40">
                [ + ]
              </span>
              <span className="absolute top-1.5 right-1.5 font-mono text-[8px] text-amber-500/40">
                [ + ]
              </span>

              {/* Header with Project Switcher Tabs */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <span className="font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-amber-400">
                  {activeProject.tag}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveProjectIndex(
                        (prev) => (prev - 1 + SHOWCASE_PROJECTS.length) % SHOWCASE_PROJECTS.length
                      )
                    }
                    className="flex h-5 w-5 items-center justify-center rounded border border-white/10 text-slate-400 hover:border-white/30 hover:text-white"
                    title="Previous Project"
                  >
                    <ChevronLeft size={11} />
                  </button>
                  <div className="flex items-center gap-1">
                    {SHOWCASE_PROJECTS.map((p, idx) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setActiveProjectIndex(idx)}
                        className={`h-1.5 rounded-full transition-all ${
                          activeProjectIndex === idx
                            ? "w-4 bg-amber-400 shadow-[0_0_8px_#fbbf24]"
                            : "w-1.5 bg-white/20 hover:bg-white/40"
                        }`}
                        title={`View ${p.title}`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveProjectIndex((prev) => (prev + 1) % SHOWCASE_PROJECTS.length)
                    }
                    className="flex h-5 w-5 items-center justify-center rounded border border-white/10 text-slate-400 hover:border-white/30 hover:text-white"
                    title="Next Project"
                  >
                    <ChevronRight size={11} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="mt-2.5 flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-display text-lg font-bold text-white sm:text-xl">
                    {activeProject.title}
                  </h3>
                  <p className="mt-0.5 text-[10px] leading-relaxed text-slate-400 sm:text-[11px]">
                    {activeProject.subtitle}
                  </p>
                </div>

                {/* Status Badge */}
                <span className="shrink-0 rounded-md border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 font-mono text-[8px] font-semibold text-emerald-300">
                  {activeProject.badge}
                </span>
              </div>

              {/* Live Sparkline Graph & Real-Time Metric */}
              <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-black/40 p-2.5">
                <div>
                  <span className="font-mono text-[7px] uppercase tracking-wider text-slate-500 sm:text-[8px]">
                    {activeProject.metrics.label}
                  </span>
                  <div className="font-display text-sm font-bold text-amber-300 sm:text-base">
                    {activeProject.metrics.value}
                  </div>
                </div>

                {/* Mini SVG Sparkline */}
                <div className="flex h-7 w-28 items-end gap-1">
                  {activeProject.sparkline.map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-gradient-to-t from-amber-500/30 to-amber-400 transition-all duration-500"
                      style={{
                        height: `${h}%`,
                        opacity: i === activeProject.sparkline.length - 1 ? 1 : 0.45 + i * 0.08,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Tech Stack Pills & Direct Link */}
              <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2.5">
                <div className="flex flex-wrap gap-1">
                  {activeProject.technologies.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[7px] text-slate-300 sm:text-[8px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={activeProject.link}
                  className="flex items-center gap-1 font-mono text-[8px] font-medium tracking-wider text-amber-300 transition-colors hover:text-white sm:text-[9px]"
                >
                  DETAILS <ArrowUpRight size={11} />
                </a>
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* CARD 2: CYBER ARCHITECTURE TERMINAL CONSOLE (BOTTOM) */}
            {/* ---------------------------------------------------- */}
            <div
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-amber-500/25 bg-[#060a12]/85 p-3.5 shadow-[0_12px_36px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 hover:border-amber-400/50 hover:shadow-[0_0_24px_rgba(251,191,36,0.15)] sm:p-4"
            >
              {/* Terminal Window Header */}
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-rose-400/80" />
                    <span className="h-2 w-2 rounded-full bg-amber-300/80" />
                    <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                    <span className="ml-1.5 font-mono text-[8px] text-slate-500">
                      bash — irfan@nexus
                    </span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[8px] text-emerald-400">
                    <span className="h-1.5 w-1.5 animate-ping rounded-full bg-emerald-400" />
                    LIVE LOG
                  </div>
                </div>

                {/* Streaming Terminal Log Lines */}
                <div className="mt-2.5 min-h-[72px] space-y-1.5 font-mono text-[9px] leading-relaxed sm:text-[10px]">
                  <div className="flex items-start gap-1.5 text-slate-400">
                    <span className="text-amber-400">&gt;</span>
                    <span
                      className="font-semibold"
                      style={{ color: LOG_MESSAGES[currentLogIndex].color }}
                    >
                      [{LOG_MESSAGES[currentLogIndex].prefix}]
                    </span>
                    <span className="text-slate-200">
                      {LOG_MESSAGES[currentLogIndex].text}
                    </span>
                  </div>

                  <div className="flex items-start gap-1.5 text-slate-500">
                    <span className="text-amber-400/60">&gt;</span>
                    <span className="text-slate-400">
                      [EDGE] Latency: 12ms · RLS verified
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[8px] text-amber-300/80">
                    <span>irfan.sfdev@gmail.com:~$</span>
                    <span className="h-3 w-1.5 animate-pulse bg-amber-400" />
                  </div>
                </div>
              </div>

              {/* Quick Metrics Bar at Terminal Footer */}
              <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2.5 font-mono text-[8px] text-slate-400">
                <span className="flex items-center gap-1">
                  <CheckCircle2 size={10} className="text-emerald-400" />
                  Next.js 15 + TypeScript
                </span>
                <a
                  href="#contact"
                  className="flex items-center gap-1 text-amber-300 hover:text-white"
                >
                  HIRE DEVELOPER <ExternalLink size={10} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* SCOPED CUSTOM ANIMATION STYLES */}
      {/* ======================================================== */}
      <style>{`
        @keyframes orbit-spin-slow {
          from {
            transform: rotateZ(0deg);
          }
          to {
            transform: rotateZ(360deg);
          }
        }

        @keyframes orbit-spin-reverse {
          from {
            transform: rotateX(58deg) rotateY(18deg) rotateZ(360deg);
          }
          to {
            transform: rotateX(58deg) rotateY(18deg) rotateZ(0deg);
          }
        }

        @keyframes orbit-tech-spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes orbit-tech-counterspin {
          to {
            transform: rotate(-360deg);
          }
        }

        .orbit-tech-rotation {
          position: absolute;
          z-index: 20;
          inset: 0;
          transform-origin: 50% 50%;
          animation: orbit-tech-spin 64s linear infinite;
          will-change: transform;
        }

        .orbit-tech-counter-rotation {
          animation: orbit-tech-counterspin 64s linear infinite;
        }

        @keyframes radar-sweep {
          0% {
            transform: rotate(0deg);
            opacity: 0.9;
          }
          100% {
            transform: rotate(360deg);
            opacity: 0.2;
          }
        }

        @keyframes laser-flow {
          to {
            stroke-dashoffset: -24;
          }
        }

        .animate-radar-sweep {
          animation: radar-sweep 2.4s ease-out infinite;
        }

        .animate-laser-flow {
          animation: laser-flow 1.2s linear infinite;
        }

        .animate-ping-slow {
          animation: ping 3.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @media (max-width: 640px) {
          .orbit-stage {
            perspective: 800px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .orbit-stack *,
          .orbit-tech-rotation,
          .orbit-tech-counter-rotation,
          .animate-radar-sweep,
          .animate-laser-flow,
          .animate-ping-slow,
          .animate-pulse-slow {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
