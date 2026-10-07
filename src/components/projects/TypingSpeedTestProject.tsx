import { useEffect, useState } from "react";
import { Clock3, RotateCcw, Target, Zap } from "lucide-react";

const duration = 30;
const passage = "Great things are done by a series of small things brought together. Focus on every keystroke, find your rhythm, and let your speed grow one word at a time.";

export default function TypingSpeedTestProject() {
  const [typedText, setTypedText] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (startedAt === null || finished) return;

    const timer = window.setInterval(() => {
      const elapsed = (Date.now() - startedAt) / 1000;
      setElapsedSeconds(Math.min(elapsed, duration));
      if (elapsed >= duration) setFinished(true);
    }, 100);

    return () => window.clearInterval(timer);
  }, [startedAt, finished]);

  const correctCharacters = [...typedText].filter((character, index) => character === passage[index]).length;
  const accuracy = typedText.length ? Math.round((correctCharacters / typedText.length) * 100) : 100;
  const wpm = elapsedSeconds > 0
    ? Math.round(correctCharacters / 5 / (elapsedSeconds / 60))
    : 0;
  const timeLeft = Math.max(0, Math.ceil(duration - elapsedSeconds));
  const progress = Math.min((typedText.length / passage.length) * 100, 100);

  const handleChange = (value: string) => {
    const nextText = value.slice(0, passage.length);
    if (startedAt === null && nextText.length > 0) setStartedAt(Date.now());
    setTypedText(nextText);
    if (nextText.length === passage.length) setFinished(true);
  };

  const restart = () => {
    setTypedText("");
    setStartedAt(null);
    setElapsedSeconds(0);
    setFinished(false);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950/30 p-5 sm:p-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "linear-gradient(rgba(167,139,250,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.45) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-violet-300 sm:text-xs">Keyboard performance</span>
            <h3 className="font-display mt-2 text-2xl font-bold text-white sm:text-3xl">Typing Speed Test</h3>
            <p className="mt-2 max-w-xl text-xs leading-relaxed text-slate-400 sm:text-sm">
              A focused typing challenge built with Next.js. Start typing to track your speed and accuracy in real time.
            </p>
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-slate-400">
            Next.js
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <div className="rounded-xl border border-violet-300/15 bg-slate-950/70 p-3 sm:p-4">
            <div className="flex items-center gap-1.5 text-violet-300">
              <Zap size={14} />
              <span className="font-mono text-[9px] uppercase tracking-widest sm:text-[10px]">Speed</span>
            </div>
            <p className="mt-2 font-mono text-2xl font-semibold text-white sm:text-3xl">{wpm}<span className="ml-1 text-xs text-slate-500">WPM</span></p>
          </div>
          <div className="rounded-xl border border-cyan-300/15 bg-slate-950/70 p-3 sm:p-4">
            <div className="flex items-center gap-1.5 text-cyan-300">
              <Target size={14} />
              <span className="font-mono text-[9px] uppercase tracking-widest sm:text-[10px]">Accuracy</span>
            </div>
            <p className="mt-2 font-mono text-2xl font-semibold text-white sm:text-3xl">{accuracy}<span className="ml-1 text-xs text-slate-500">%</span></p>
          </div>
          <div className="rounded-xl border border-fuchsia-300/15 bg-slate-950/70 p-3 sm:p-4">
            <div className="flex items-center gap-1.5 text-fuchsia-300">
              <Clock3 size={14} />
              <span className="font-mono text-[9px] uppercase tracking-widest sm:text-[10px]">Time</span>
            </div>
            <p className="mt-2 font-mono text-2xl font-semibold text-white sm:text-3xl">{timeLeft}<span className="ml-1 text-xs text-slate-500">SEC</span></p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/70 p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500 sm:text-[10px]">
              {finished ? "Test complete" : startedAt === null ? "Type the passage below" : "Keep your rhythm"}
            </span>
            <button
              type="button"
              onClick={restart}
              className="inline-flex items-center gap-1.5 rounded-lg border border-violet-300/25 bg-violet-400/10 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-wider text-violet-200 transition hover:border-violet-300/50 hover:bg-violet-400/20"
            >
              <RotateCcw size={12} />
              Restart
            </button>
          </div>

          <div className="min-h-[108px] font-mono text-sm leading-7 sm:text-base sm:leading-8" aria-label="Typing passage">
            {[...passage].map((character, index) => {
              const isTyped = index < typedText.length;
              const isCorrect = typedText[index] === character;
              const isCurrent = index === typedText.length && !finished;
              return (
                <span
                  key={index}
                  className={
                    isTyped
                      ? isCorrect ? "text-violet-200" : "rounded-sm bg-rose-500/20 text-rose-300"
                      : isCurrent ? "border-b-2 border-violet-300 text-slate-300" : "text-slate-600"
                  }
                >
                  {character}
                </span>
              );
            })}
          </div>

          <label className="sr-only" htmlFor="typing-speed-input">Type the passage to start the test</label>
          <textarea
            id="typing-speed-input"
            value={typedText}
            onChange={(event) => handleChange(event.target.value)}
            disabled={finished}
            rows={2}
            maxLength={passage.length}
            placeholder={finished ? "Test complete — restart to try again." : "Click here and start typing..."}
            className="mt-3 w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 font-mono text-xs text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-violet-300/40 focus:bg-white/[0.05] disabled:opacity-60 sm:text-sm"
          />

          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-300 transition-[width] duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-slate-600">
            <span>{typedText.length} / {passage.length} characters</span>
            <span>{finished ? "Nice work" : "30 second challenge"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
