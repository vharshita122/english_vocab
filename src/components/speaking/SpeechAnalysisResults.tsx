"use client";

import { motion } from "framer-motion";
import type { SpeechAnalysis } from "@/lib/speech-analysis";

function ScoreRing({ label, score }: { label: string; score: number }) {
  const color =
    score >= 80 ? "text-green" : score >= 60 ? "text-purple" : "text-ink-muted";

  return (
    <div className="flex flex-col items-center rounded-xl border border-cream-dark bg-cream/50 p-3">
      <span className={`text-2xl font-bold tabular-nums ${color}`}>{score}</span>
      <span className="mt-1 text-xs font-medium text-ink-muted">{label}</span>
    </div>
  );
}

interface SpeechAnalysisResultsProps {
  analysis: SpeechAnalysis;
}

export function SpeechAnalysisResults({ analysis }: SpeechAnalysisResultsProps) {
  const { scores } = analysis;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="rounded-2xl border border-green/25 bg-green/5 p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-green">
          Coach Summary
        </p>
        <p className="mt-3 text-base leading-relaxed text-ink">
          {analysis.coachSummary}
        </p>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-purple">
          Scores
        </h3>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          <ScoreRing label="Grammar" score={scores.grammar} />
          <ScoreRing label="Pronunciation" score={scores.pronunciation} />
          <ScoreRing label="Vocabulary" score={scores.vocabulary} />
          <ScoreRing label="Fluency" score={scores.fluency} />
          <ScoreRing label="Confidence" score={scores.confidence} />
          <ScoreRing label="Overall" score={scores.overall} />
        </div>
      </div>

      {analysis.grammarMistakes.length > 0 && (
        <section>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-ink-muted">
            Grammar Mistakes
          </h3>
          <div className="space-y-3">
            {analysis.grammarMistakes.map((m, i) => (
              <div
                key={i}
                className="rounded-xl border border-cream-dark bg-card p-4"
              >
                <p className="text-sm text-ink-muted line-through">{m.original}</p>
                <p className="mt-1 text-sm font-medium text-green">{m.corrected}</p>
                <p className="mt-2 text-sm text-ink-muted">{m.explanation}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {analysis.pronunciationFeedback.length > 0 && (
        <section>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-ink-muted">
            Pronunciation Feedback
          </h3>
          <ul className="space-y-2">
            {analysis.pronunciationFeedback.map((tip, i) => (
              <li
                key={i}
                className="flex gap-2 rounded-xl bg-purple-soft/50 px-4 py-3 text-sm text-ink"
              >
                <span className="text-purple">🎯</span>
                {tip}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-ink-muted">
          Vocabulary — {analysis.vocabularyLevel}
        </h3>
        {analysis.vocabularySuggestions.length > 0 && (
          <div className="space-y-2">
            {analysis.vocabularySuggestions.map((s, i) => (
              <div
                key={i}
                className="rounded-xl border border-cream-dark bg-card p-4 text-sm"
              >
                <span className="text-ink-muted">{s.used}</span>
                <span className="mx-2 text-purple">→</span>
                <span className="font-medium text-ink">{s.better}</span>
                <p className="mt-1 text-ink-muted">{s.reason}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-ink-muted">
          Fluency Analysis
        </h3>
        <div className="rounded-xl border border-cream-dark bg-card p-4 text-sm">
          <p className="text-ink">{analysis.fluency.summary}</p>
          <ul className="mt-3 space-y-1.5 text-ink-muted">
            <li><strong className="text-ink">Confidence:</strong> {analysis.fluency.confidence}</li>
            <li><strong className="text-ink">Speed:</strong> {analysis.fluency.speed}</li>
            <li><strong className="text-ink">Pauses:</strong> {analysis.fluency.pauses}</li>
            <li><strong className="text-ink">Hesitation:</strong> {analysis.fluency.hesitation}</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-ink-muted">
          Filler Words ({analysis.fillerWords.total})
        </h3>
        <div className="rounded-xl border border-cream-dark bg-card p-4">
          {Object.keys(analysis.fillerWords.breakdown).length > 0 ? (
            <div className="mb-3 flex flex-wrap gap-2">
              {Object.entries(analysis.fillerWords.breakdown).map(([word, count]) => (
                <span
                  key={word}
                  className="rounded-full bg-purple-soft px-3 py-1 text-xs font-medium text-purple"
                >
                  {word}: {count}
                </span>
              ))}
            </div>
          ) : (
            <p className="mb-3 text-sm text-green">No filler words detected — great job!</p>
          )}
          <p className="text-sm text-ink-muted">{analysis.fillerWords.advice}</p>
        </div>
      </section>

      {analysis.rewrites.length > 0 && (
        <section>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-ink-muted">
            Natural Rewrites
          </h3>
          <div className="space-y-3">
            {analysis.rewrites.map((r, i) => (
              <div
                key={i}
                className="rounded-xl border border-green/20 bg-green/5 p-4 text-sm"
              >
                <p className="text-ink-muted line-through">{r.weak}</p>
                <p className="mt-2 font-medium text-ink">{r.natural}</p>
                <p className="mt-2 text-ink-muted">{r.why}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {analysis.additionalPoints.length > 0 && (
        <section>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-ink-muted">
            Points You Could Add
          </h3>
          <ul className="space-y-2">
            {analysis.additionalPoints.map((point, i) => (
              <li
                key={i}
                className="flex gap-2 rounded-xl border border-cream-dark bg-card px-4 py-3 text-sm text-ink-muted"
              >
                <span className="font-bold text-purple">{i + 1}.</span>
                {point}
              </li>
            ))}
          </ul>
        </section>
      )}
    </motion.div>
  );
}
