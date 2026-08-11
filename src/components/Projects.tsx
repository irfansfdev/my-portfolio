import { motion } from "framer-motion";
import ChickBiteSimulator from "./projects/ChickBiteSimulator";
import EducationProject from "./projects/EducationProject";
import MovieProject from "./projects/MovieProject";

export default function Projects() {
  return (
    <section id="projects" className="relative w-full px-4 py-28 sm:px-8">
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400">/ 05 — Selected Work</span>
        <h2 className="font-display mt-3 text-4xl font-bold text-white sm:text-6xl">
          Projects you can <span className="text-gradient">touch.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-slate-400 sm:text-base">
          No screenshots pretending to be interfaces — these are live, working simulators.
        </p>
      </div>

      {/* Project 1: ChickBite */}
      <div className="mx-auto mb-32 grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="order-2 lg:order-1"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-orange-400">Project 01</span>
          <h3 className="font-display mt-3 text-3xl font-bold text-white sm:text-4xl">ChickBite</h3>
          <p className="mt-1 text-sm text-slate-500">Fast Food Web App</p>
          <p className="mt-5 text-sm leading-relaxed text-slate-400 sm:text-base">
            A blazing-fast food ordering experience built for real appetite. ChickBite lets customers browse
            a live menu, build their cart in real-time, and check out with zero friction — all wrapped in a
            playful, brand-driven interface.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-cyan-300/80">
            👉 Try it — click a menu item on the phone to add it to the cart and watch the counter update live.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["React", "Tailwind CSS", "React Router", "Context API"].map((t) => (
              <span key={t} className="rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 font-mono text-[11px] text-orange-200">
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="order-1 lg:order-2"
        >
          <ChickBiteSimulator />
        </motion.div>
      </div>

      {/* Project 2: Education */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className="mx-auto mb-32 max-w-6xl"
      >
        <EducationProject />
      </motion.div>

      {/* Project 3: Movie Engine */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-6xl"
      >
        <MovieProject />
      </motion.div>
    </section>
  );
}
