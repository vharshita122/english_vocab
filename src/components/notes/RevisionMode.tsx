"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/Button";
import type { VocabNote } from "@/lib/data";

interface RevisionModeProps {
  notes: VocabNote[];
}

export function RevisionMode({ notes }: RevisionModeProps) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  if (notes.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-cream-dark bg-card/50 p-12 text-center">
        <p className="text-4xl">📖</p>
        <p className="mt-4 font-semibold text-ink">No words to revise yet</p>
        <p className="mt-2 text-sm text-ink-muted">
          Save words from Learn Vocabulary or add them manually to start revising.
        </p>
      </div>
    );
  }

  const current = notes[index];

  function goNext() {
    setRevealed(false);
    setIndex((i) => (i + 1) % notes.length);
  }

  function goPrev() {
    setRevealed(false);
    setIndex((i) => (i - 1 + notes.length) % notes.length);
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-ink-muted">
          Card <span className="font-semibold text-ink">{index + 1}</span> of{" "}
          {notes.length}
        </p>
        <div className="h-1.5 w-32 overflow-hidden rounded-full bg-cream-dark sm:w-48">
          <motion.div
            className="h-full rounded-full bg-purple"
            animate={{ width: `${((index + 1) / notes.length) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id + (revealed ? "-revealed" : "-hidden")}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <article className="mx-auto max-w-lg rounded-3xl border border-cream-dark bg-card p-8 shadow-lg shadow-purple/5 sm:p-10">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-purple">
                Revision
              </p>
              <h2 className="mt-4 text-4xl font-bold text-ink sm:text-5xl">
                {current.word}
              </h2>
              {!revealed && (
                <p className="mt-6 text-sm text-ink-muted">
                  Try to recall the meaning before revealing
                </p>
              )}
            </div>

            <AnimatePresence>
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-8 space-y-4 overflow-hidden"
                >
                  <div className="rounded-2xl bg-cream p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-green">
                      Meaning
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink">
                      {current.meaning}
                    </p>
                  </div>

                  {current.hindiMeaning && (
                    <div className="rounded-2xl bg-purple-soft/50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-purple">
                        Hindi Meaning
                      </p>
                      <p className="mt-2 text-sm text-ink">{current.hindiMeaning}</p>
                    </div>
                  )}

                  {current.exampleSentence && (
                    <div className="rounded-2xl border border-cream-dark p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                        Example
                      </p>
                      <p className="mt-2 text-sm italic text-ink-muted">
                        &ldquo;{current.exampleSentence}&rdquo;
                      </p>
                    </div>
                  )}

                  {current.personalNote && (
                    <div className="rounded-2xl border border-green/20 bg-green/5 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-green">
                        Personal Note
                      </p>
                      <p className="mt-2 text-sm text-ink-muted">{current.personalNote}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button variant="ghost" onClick={goPrev}>
          ← Previous
        </Button>
        {!revealed ? (
          <Button onClick={() => setRevealed(true)}>Show Meaning</Button>
        ) : (
          <Button onClick={goNext}>Next word →</Button>
        )}
        <Button variant="ghost" onClick={goNext}>
          Skip →
        </Button>
      </div>
    </div>
  );
}
