import type { CSSProperties } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

type OrbitPill = {
  label: string;
  angle: number;
  radiusRatio: number;
  tooltip: string;
  project: "BabulShop" | "CineBook" | null;
};

type OrbitCard = {
  label: string;
  title: string;
  description: string;
  position: "top-right" | "bottom-left";
  entranceDelayMs: number;
};

const PILLS: OrbitPill[] = [
  {
    label: "Next.js",
    angle: 20,
    radiusRatio: 0.34,
    tooltip: "Used in BabulShop and Hospital Management System",
    project: "BabulShop",
  },
  {
    label: "React",
    angle: 80,
    radiusRatio: 0.5,
    tooltip: "Used in the Food Website",
    project: null,
  },
  {
    label: "Supabase",
    angle: 140,
    radiusRatio: 0.34,
    tooltip: "Auth, Row Level Security and RPCs in BabulShop",
    project: "BabulShop",
  },
  {
    label: "TypeScript",
    angle: 200,
    radiusRatio: 0.5,
    tooltip: "Used in BabulShop",
    project: "BabulShop",
  },
  {
    label: "Tailwind",
    angle: 260,
    radiusRatio: 0.34,
    tooltip: "Styling across BabulShop and my projects",
    project: "BabulShop",
  },
  {
    label: "Laravel",
    angle: 320,
    radiusRatio: 0.5,
    tooltip: "Powers CineBook with Stripe payments",
    project: "CineBook",
  },
];

const CARDS: OrbitCard[] = [
  {
    label: "Flagship",
    title: "BabulShop",
    description: "4 roles · multi-vendor checkout · Row Level Security",
    position: "top-right",
    entranceDelayMs: 600,
  },
  {
    label: "Booking & Payments",
    title: "CineBook",
    description: "Laravel 12 · Stripe · QR ticket scanning",
    position: "bottom-left",
    entranceDelayMs: 720,
  },
];

const RINGS = [
  { id: 1, duration: "80s", direction: "clockwise", delay: "0ms" },
  { id: 2, duration: "110s", direction: "counterclockwise", delay: "120ms" },
  { id: 3, duration: "140s", direction: "clockwise", delay: "240ms" },
];

function getPillPosition(pill: OrbitPill): CSSProperties {
  const radians = (pill.angle * Math.PI) / 180;
  const radius = pill.radiusRatio;

  return {
    left: `${50 + Math.cos(radians) * radius * 100}%`,
    top: `${50 + Math.sin(radians) * radius * 100}%`,
  };
}

export default function OrbitStack() {
  const stackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef(new Map<string, HTMLButtonElement>());
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [activePill, setActivePill] = useState<string | null>(null);
  const [hoveredPill, setHoveredPill] = useState(false);
  const [tooltipPlacement, setTooltipPlacement] = useState("right");
  const [tooltipOffsetX, setTooltipOffsetX] = useState(0);

  useEffect(() => {
    if (!activePill) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!stackRef.current?.contains(event.target as Node)) setActivePill(null);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActivePill(null);
    };
    const timeout = window.setTimeout(() => setActivePill(null), 5000);

    document.addEventListener("pointerdown", closeOnOutsideClick);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.clearTimeout(timeout);
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activePill]);

  useLayoutEffect(() => {
    if (!activePill || !tooltipRef.current || !pillRefs.current.has(activePill)) return;
    const stage = stageRef.current;
    const button = pillRefs.current.get(activePill);
    if (!stage || !button) return;

    const stageBounds = stage.getBoundingClientRect();
    const pillBounds = button.getBoundingClientRect();
    const parentBounds = button.parentElement?.getBoundingClientRect();
    const tooltip = tooltipRef.current;
    const tooltipWidth = tooltip.getBoundingClientRect().width;
    const tooltipHeight = tooltip.getBoundingClientRect().height;
    const gap = 10;

    const right = stageBounds.right - pillBounds.right;
    const left = pillBounds.left - stageBounds.left;
    const below = stageBounds.bottom - pillBounds.bottom;
    const above = pillBounds.top - stageBounds.top;

    if (right >= tooltipWidth + gap) {
      setTooltipPlacement("right");
    } else if (left >= tooltipWidth + gap) {
      setTooltipPlacement("left");
    } else {
      const placement = below >= tooltipHeight + gap ? "bottom" : "top";
      const parentLeft = parentBounds?.left ?? pillBounds.left;
      const minLeft = stageBounds.left + 8;
      const maxLeft = stageBounds.right - tooltipWidth - 8;
      const centeredLeft = (pillBounds.left + pillBounds.right - tooltipWidth) / 2;
      setTooltipPlacement(placement);
      setTooltipOffsetX(Math.max(minLeft, Math.min(maxLeft, centeredLeft)) - parentLeft);
    }
  }, [activePill]);

  useEffect(() => {
    if (!import.meta.env.DEV) return;

    const checkGeometry = () => {
      const buttons = Array.from(
        stackRef.current?.querySelectorAll<HTMLButtonElement>(".orbit-pill") ?? [],
      ).filter((button) => button.getClientRects().length > 0);
      const core = stageRef.current?.querySelector(".orbit-core");
      if (!core || buttons.length < 2) return;

      const coreBounds = core.getBoundingClientRect();
      const coreCenter = {
        x: coreBounds.left + coreBounds.width / 2,
        y: coreBounds.top + coreBounds.height / 2,
      };
      let collision = false;
      let coreOverlap = false;

      buttons.forEach((button, index) => {
        const bounds = button.getBoundingClientRect();
        const center = { x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2 };
        const distance = Math.hypot(center.x - coreCenter.x, center.y - coreCenter.y);
        const coreRadius = coreBounds.width / 2;
        if (distance < coreRadius + bounds.width / 2 + 16) coreOverlap = true;

        buttons.slice(index + 1).forEach((other) => {
          const otherBounds = other.getBoundingClientRect();
          const otherCenter = {
            x: otherBounds.left + otherBounds.width / 2,
            y: otherBounds.top + otherBounds.height / 2,
          };
          const minimumDistance = Math.max(bounds.width, otherBounds.width) + 24;
          if (Math.hypot(center.x - otherCenter.x, center.y - otherCenter.y) < minimumDistance) {
            collision = true;
          }
        });
      });

      if (collision) console.warn("Orbit pill centers are closer than a pill width plus 24px.");
      if (coreOverlap) console.warn("An orbit pill is too close to the core.");
    };

    const frame = window.requestAnimationFrame(checkGeometry);
    const observer = stageRef.current ? new ResizeObserver(checkGeometry) : null;
    if (stageRef.current && observer) observer.observe(stageRef.current);
    document.fonts?.ready.then(checkGeometry);
    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, []);

  const togglePill = (label: string) => {
    setActivePill((current) => (current === label ? null : label));
  };
  const isPaused = activePill !== null || hoveredPill;

  return (
    <div
      ref={stackRef}
      className="orbit-stack"
      data-paused={isPaused ? "true" : "false"}
      onMouseLeave={() => setHoveredPill(false)}
    >
      <div className="orbit-viewport">
        <div ref={stageRef} className="orbit-stage">
          {RINGS.map((ring) => (
            <div
              key={ring.id}
              className={`orbit-ring-group orbit-ring-group--${ring.id}`}
              style={{ animationDelay: ring.delay }}
            >
              <div
                className={`orbit-rotating-layer orbit-rotation--${ring.id}`}
                style={{ animationDuration: ring.duration }}
              >
                <div className="orbit-geometry">
                  <div className={`orbit-circle orbit-circle--${ring.id}`} aria-hidden="true" />
                </div>
              </div>
            </div>
          ))}

          <div className="orbit-constellation">
            <div className="orbit-constellation-geometry">
              {PILLS.map((pill) => (
                <div
                  key={pill.label}
                  className={`orbit-pill-position${pill.label === "Laravel" ? " orbit-pill-position--narrow-hidden" : ""}`}
                  data-label={pill.label}
                  style={getPillPosition(pill)}
                  onMouseEnter={() => setHoveredPill(true)}
                  onMouseLeave={() => setHoveredPill(false)}
                >
                  <div className="orbit-pill-counter">
                    <button
                      ref={(element) => {
                        if (element) pillRefs.current.set(pill.label, element);
                        else pillRefs.current.delete(pill.label);
                      }}
                      type="button"
                      className={`orbit-pill${pill.label === "Next.js" ? " orbit-pill--highlighted" : ""}${activePill === pill.label ? " is-active" : ""}`}
                      aria-expanded={activePill === pill.label}
                      aria-describedby={activePill === pill.label ? "orbit-pill-tooltip" : undefined}
                      onClick={() => togglePill(pill.label)}
                    >
                      {pill.label}
                    </button>
                    {activePill === pill.label && (
                      <div
                        ref={tooltipRef}
                        id="orbit-pill-tooltip"
                        className="orbit-tooltip"
                        data-placement={tooltipPlacement}
                        style={{ "--orbit-tooltip-offset-x": `${tooltipOffsetX}px` } as CSSProperties}
                        role="status"
                      >
                        {pill.tooltip}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="orbit-core-position">
            <div className="orbit-core font-display">MI.</div>
          </div>
        </div>

        <div className="orbit-card-list">
          {CARDS.map((card) => {
            const highlighted =
              activePill !== null &&
              PILLS.find((pill) => pill.label === activePill)?.project === card.title;

            return (
              <article
                key={card.title}
                className={`orbit-card-position orbit-card-position--${card.position}`}
                data-highlighted={highlighted ? "true" : "false"}
                style={{ animationDelay: `${card.entranceDelayMs}ms` }}
              >
                <div className="orbit-card-float">
                  <p className="orbit-card-label font-mono">{card.label}</p>
                  <h3 className="orbit-card-title font-display">{card.title}</h3>
                  <p className="orbit-card-description">{card.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <style>{`
        .orbit-stack {
          --orbit-accent: var(--theme-primary);
          --orbit-background: var(--theme-bg-darkest);
          --orbit-surface: var(--theme-bg-darker);
          --orbit-muted: var(--text-tertiary);
          --orbit-border: var(--glass-border);
          color: var(--text-white);
          min-width: 0;
          width: 100%;
        }

        .orbit-viewport {
          position: relative;
          container-type: inline-size;
          width: min(100%, 600px);
          aspect-ratio: 1;
          margin-inline: auto;
        }

        .orbit-stage {
          position: relative;
          isolation: isolate;
          --orbit-size: min(75cqi, 480px);
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .orbit-ring-group {
          position: absolute;
          z-index: 1;
          inset: 0;
          pointer-events: none;
          animation: orbit-arrive 700ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .orbit-rotating-layer {
          position: absolute;
          inset: 0;
          will-change: transform;
        }

        .orbit-geometry,
        .orbit-constellation-geometry {
          position: absolute;
          top: 50%;
          left: 50%;
          width: var(--orbit-size);
          aspect-ratio: 1;
          transform: translate(-50%, -50%);
        }

        .orbit-rotation--1 {
          animation: orbit-clockwise 80s linear infinite;
        }

        .orbit-rotation--2 {
          animation: orbit-counterclockwise 110s linear infinite;
        }

        .orbit-rotation--3 {
          animation: orbit-clockwise 140s linear infinite;
        }

        .orbit-circle {
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }

        .orbit-circle--1 {
          width: 40%;
          height: 40%;
          border: 1px solid color-mix(in srgb, var(--orbit-accent) 55%, transparent);
          box-shadow: 0 0 32px color-mix(in srgb, var(--orbit-accent) 14%, transparent);
        }

        .orbit-circle--2 {
          width: 68%;
          height: 68%;
          border: 1px dashed color-mix(in srgb, var(--orbit-accent) 35%, transparent);
        }

        .orbit-circle--3 {
          width: 100%;
          height: 100%;
          border: 1px dotted color-mix(in srgb, var(--orbit-accent) 20%, transparent);
        }

        .orbit-constellation {
          position: absolute;
          z-index: 20;
          inset: 0;
          pointer-events: none;
          animation: orbit-clockwise 120s linear infinite;
        }

        .orbit-constellation-geometry {
          overflow: visible;
        }

        .orbit-pill-position {
          position: absolute;
          z-index: 20;
          pointer-events: auto;
          transform: translate(-50%, -50%);
        }

        .orbit-pill-counter {
          position: relative;
          animation: orbit-counterclockwise 120s linear infinite;
        }

        .orbit-pill {
          position: relative;
          display: inline-flex;
          min-width: 44px;
          min-height: 44px;
          align-items: center;
          justify-content: center;
          padding: 0.55em 1em;
          border: 1px solid color-mix(in srgb, var(--orbit-accent) 50%, transparent);
          border-radius: 9999px;
          background: var(--orbit-surface);
          color: var(--text-white);
          font-family: var(--font-mono);
          font-size: clamp(10px, 2cqi, 12px);
          line-height: 1;
          white-space: nowrap;
          cursor: pointer;
          transition: transform 200ms ease;
        }

        .orbit-pill--highlighted {
          background: var(--orbit-accent);
          color: var(--orbit-background);
        }

        .orbit-pill:focus-visible {
          outline: 2px solid var(--orbit-accent);
          outline-offset: 3px;
        }

        .orbit-pill::after {
          position: absolute;
          inset: -2px;
          border: 1px solid var(--orbit-accent);
          border-radius: inherit;
          content: "";
          opacity: 0;
          pointer-events: none;
        }

        .orbit-pill.is-active {
          animation: orbit-pill-pop 350ms ease-out both;
        }

        .orbit-pill.is-active::after {
          animation: orbit-pill-ripple 600ms ease-out both;
        }

        .orbit-tooltip {
          position: absolute;
          z-index: 30;
          width: min(220px, calc(100vw - 32px));
          padding: 10px 12px;
          border: 1px solid var(--orbit-border);
          border-radius: 10px;
          background: var(--orbit-surface);
          color: var(--text-white);
          font-family: var(--font-sans);
          font-size: 12px;
          line-height: 1.45;
          opacity: 0;
        }

        .orbit-tooltip[data-placement="right"] {
          top: 50%;
          left: calc(100% + 10px);
          animation: orbit-tooltip-horizontal-in 200ms ease-out forwards;
        }

        .orbit-tooltip[data-placement="left"] {
          top: 50%;
          right: calc(100% + 10px);
          animation: orbit-tooltip-horizontal-in 200ms ease-out forwards;
        }

        .orbit-tooltip[data-placement="top"] {
          bottom: calc(100% + 10px);
          left: var(--orbit-tooltip-offset-x);
          animation: orbit-tooltip-vertical-in 200ms ease-out forwards;
        }

        .orbit-tooltip[data-placement="bottom"] {
          top: calc(100% + 10px);
          left: var(--orbit-tooltip-offset-x);
          animation: orbit-tooltip-vertical-in 200ms ease-out forwards;
        }

        .orbit-core-position {
          position: absolute;
          z-index: 5;
          top: 50%;
          left: 50%;
          width: var(--orbit-size);
          aspect-ratio: 1;
          pointer-events: none;
          transform: translate(-50%, -50%);
        }

        .orbit-core {
          position: absolute;
          top: 50%;
          left: 50%;
          display: grid;
          width: 26%;
          aspect-ratio: 1;
          place-items: center;
          border-radius: 50%;
          background: var(--orbit-accent);
          box-shadow: 0 0 42px color-mix(in srgb, var(--orbit-accent) 30%, transparent);
          color: var(--orbit-background);
          font-size: clamp(22px, 5.4cqi, 33px);
          font-weight: 800;
          transform: translate(-50%, -50%);
          animation: orbit-core-pulse 4s ease-in-out 1.06s infinite;
        }

        .orbit-card-list {
          position: absolute;
          z-index: 10;
          inset: 0;
          pointer-events: none;
        }

        .orbit-card-position {
          position: absolute;
          width: min(220px, 42cqi);
          pointer-events: auto;
          animation: orbit-arrive 700ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .orbit-card-position--top-right {
          top: 4%;
          right: 0;
        }

        .orbit-card-position--bottom-left {
          bottom: 4%;
          left: 0;
        }

        .orbit-card-float {
          position: relative;
          min-height: 90px;
          padding: 10px;
          border: 1px solid var(--orbit-border);
          border-radius: 14px;
          background: var(--orbit-surface);
          animation: orbit-float 6s ease-in-out infinite alternate;
          isolation: isolate;
        }

        .orbit-card-float::before {
          position: absolute;
          z-index: -1;
          inset: -8px;
          border-radius: inherit;
          background: color-mix(in srgb, var(--orbit-accent) 28%, transparent);
          content: "";
          opacity: 0;
          transition: opacity 200ms ease;
        }

        .orbit-card-position[data-highlighted="true"] .orbit-card-float {
          border-color: var(--orbit-accent);
        }

        .orbit-card-position[data-highlighted="true"] .orbit-card-float::before {
          opacity: 0.45;
        }

        .orbit-card-label {
          margin: 0;
          color: var(--orbit-accent);
          font-size: 10px;
          letter-spacing: 0.18em;
          line-height: 1.5;
          text-transform: uppercase;
        }

        .orbit-card-title {
          margin: 0.35em 0;
          color: var(--text-white);
          font-size: 18px;
          font-weight: 700;
          line-height: 1.15;
        }

        .orbit-card-description {
          margin: 0;
          color: var(--orbit-muted);
          font-size: 11px;
          line-height: 1.45;
        }

        .orbit-stack[data-paused="true"] .orbit-constellation,
        .orbit-stack[data-paused="true"] .orbit-pill-counter {
          animation-play-state: paused;
        }

        @media (hover: hover) {
          .orbit-pill:hover {
            border-color: var(--orbit-accent);
            transform: scale(1.04);
          }
        }

        @keyframes orbit-arrive {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes orbit-clockwise {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes orbit-counterclockwise {
          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes orbit-core-pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.04);
          }
        }

        @keyframes orbit-float {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-6px);
          }
        }

        @keyframes orbit-pill-pop {
          0% {
            transform: scale(1);
          }
          65% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1.06);
          }
        }

        @keyframes orbit-pill-ripple {
          from {
            opacity: 0.65;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(1.8);
          }
        }

        @keyframes orbit-tooltip-horizontal-in {
          from {
            opacity: 0;
            transform: translateY(calc(-50% + 6px));
          }
          to {
            opacity: 1;
            transform: translateY(-50%);
          }
        }

        @keyframes orbit-tooltip-vertical-in {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .orbit-stack {
            --orbit-size: min(70vw, 480px);
          }

          .orbit-viewport {
            aspect-ratio: auto;
          }

          .orbit-stage {
            --orbit-size: min(70vw, 480px);
            width: min(100%, 600px);
            aspect-ratio: 1;
            margin-inline: auto;
          }

          .orbit-card-list {
            position: static;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
            margin-top: 20px;
          }

          .orbit-card-position {
            position: relative;
            inset: auto;
            width: 100%;
          }
        }

        @media (max-width: 767px) {
          .orbit-viewport {
            width: min(100%, 432px);
            aspect-ratio: auto;
          }

          .orbit-stage {
            --orbit-size: min(92vw, 400px);
            width: min(calc(92vw + 32px), 432px);
            max-width: 100%;
            aspect-ratio: 1;
            margin-inline: auto;
            padding-inline: 16px;
          }

          .orbit-geometry,
          .orbit-constellation-geometry,
          .orbit-core-position {
            left: 50%;
          }

          .orbit-pill {
            min-width: 44px;
            min-height: 44px;
            padding: 6px 10px;
            font-size: 11px;
          }

          .orbit-pill-position--narrow-hidden {
            display: block;
          }

          .orbit-card-list {
            position: static;
            display: grid;
            grid-template-columns: minmax(0, 1fr);
            gap: 12px;
            margin-top: 20px;
          }

          .orbit-card-position {
            position: relative;
            inset: auto;
            width: 100%;
          }

          .orbit-card-float {
            min-height: 0;
          }
        }

        @media (max-width: 326px) {
          .orbit-pill-position[data-label="Laravel"],
          .orbit-pill-position[data-label="TypeScript"] {
            display: none;
          }

          .orbit-pill-position[data-label="Next.js"] {
            left: 84%;
            top: 50%;
          }

          .orbit-pill-position[data-label="React"] {
            left: 50%;
            top: 0%;
          }

          .orbit-pill-position[data-label="Supabase"] {
            left: 16%;
            top: 50%;
          }

          .orbit-pill-position[data-label="Tailwind"] {
            left: 50%;
            top: 16%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .orbit-rotating-layer,
          .orbit-constellation,
          .orbit-pill-counter,
          .orbit-core,
          .orbit-card-float {
            animation: none !important;
          }

          .orbit-ring-group,
          .orbit-card-position {
            animation: orbit-reduced-fade 450ms ease-out both !important;
            animation-delay: 0ms !important;
          }

          .orbit-pill.is-active {
            animation: none !important;
          }

          .orbit-pill.is-active::after {
            animation: none !important;
          }

          .orbit-tooltip {
            animation: orbit-reduced-fade 200ms ease-out forwards;
          }

          .orbit-pill {
            transition: none;
          }
        }

        @keyframes orbit-reduced-fade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
