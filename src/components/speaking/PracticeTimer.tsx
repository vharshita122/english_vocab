"use client";

import { Button } from "@/components/Button";
import { usePracticeTimer, type TimerPreset } from "@/hooks/usePracticeTimer";

const PRESETS: { label: string; value: TimerPreset; seconds?: number }[] = [
  { label: "30 sec", value: 30, seconds: 30 },
  { label: "1 min", value: 60, seconds: 60 },
  { label: "2 min", value: 120, seconds: 120 },
  { label: "Custom", value: "custom" },
];

interface PracticeTimerProps {
  timer: ReturnType<typeof usePracticeTimer>;
  preset: TimerPreset;
  customSeconds: number;
  onPresetChange: (preset: TimerPreset) => void;
  onCustomChange: (seconds: number) => void;
  disabled?: boolean;
}

export function PracticeTimer({
  timer,
  preset,
  customSeconds,
  onPresetChange,
  onCustomChange,
  disabled,
}: PracticeTimerProps) {
  const progress =
    timer.duration > 0
      ? ((timer.duration - timer.remaining) / timer.duration) * 100
      : 0;

  function selectPreset(p: (typeof PRESETS)[number]) {
    onPresetChange(p.value);
    if (p.seconds) timer.setDurationAndReset(p.seconds);
  }

  return (
    <div className="rounded-2xl border border-cream-dark bg-card p-5 sm:p-6">
      <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-purple">
        Practice Timer
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            disabled={disabled || timer.running}
            onClick={() => selectPreset(p)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition disabled:opacity-50 ${
              preset === p.value
                ? "bg-purple-soft text-purple"
                : "border border-cream-dark text-ink-muted hover:text-ink"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {preset === "custom" && (
        <div className="mb-4 flex items-center gap-2">
          <input
            type="number"
            min={10}
            max={600}
            value={customSeconds}
            disabled={disabled || timer.running}
            onChange={(e) => {
              const val = Math.max(10, Math.min(600, Number(e.target.value) || 60));
              onCustomChange(val);
              timer.setDurationAndReset(val);
            }}
            className="w-24 rounded-xl border border-cream-dark bg-cream px-3 py-2 text-sm text-ink outline-none focus:border-purple/40"
          />
          <span className="text-sm text-ink-muted">seconds</span>
        </div>
      )}

      <div className="mb-4">
        <div className="mb-2 h-2 overflow-hidden rounded-full bg-cream-dark">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              timer.remaining <= 10 && timer.running ? "bg-purple" : "bg-green"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <p
          className={`text-center text-3xl font-bold tabular-nums ${
            timer.remaining <= 10 && timer.running ? "text-purple" : "text-ink"
          }`}
        >
          {timer.formatTime(timer.remaining)}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {!timer.running ? (
          <Button onClick={timer.start} disabled={disabled}>
            ▶ Start
          </Button>
        ) : (
          <Button variant="secondary" onClick={timer.pause}>
            ⏸ Pause
          </Button>
        )}
        <Button variant="ghost" onClick={timer.reset} disabled={disabled}>
          ↺ Reset
        </Button>
      </div>

      {timer.isFinished && (
        <p className="mt-3 text-center text-sm font-medium text-purple">
          Time&apos;s up! You can stop recording and get analysis.
        </p>
      )}
    </div>
  );
}
