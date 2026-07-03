"use client";

import { motion } from "framer-motion";
import type { VocabWord } from "@/lib/data";

function ChipList({
  label,
  items,
  variant,
}: {
  label: string;
  items: string[];
  variant: "synonym" | "antonym";
}) {
  if (items.length === 0) return null;
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-muted">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              variant === "synonym"
                ? "bg-green/15 text-green-dark"
                : "bg-purple-soft text-purple"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function WordDisplay({ word }: { word: VocabWord }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl border border-cream-dark bg-card p-6 shadow-lg shadow-purple/5 sm:p-8"
    >
      <div className="mb-6 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          {word.word}
        </h2>
        <p className="mt-2 font-mono text-base text-purple">{word.pronunciation}</p>
        <span className="mt-3 inline-block rounded-full bg-purple-soft px-4 py-1 text-sm font-medium italic text-purple">
          {word.partOfSpeech}
        </span>
      </div>

      <div className="space-y-5">
        <div className="rounded-2xl bg-cream p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-green">
            Meaning
          </p>
          <p className="mt-2 text-base leading-relaxed text-ink">{word.meaning}</p>
        </div>

        <div className="rounded-2xl border border-purple/15 bg-purple-soft/40 p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-purple">
            Hindi Meaning
          </p>
          <p className="mt-2 text-base leading-relaxed text-ink">{word.hindiMeaning}</p>
        </div>

        <div className="rounded-2xl border border-cream-dark bg-card p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
            Example Sentence
          </p>
          <p className="mt-2 text-base italic leading-relaxed text-ink-muted">
            &ldquo;{word.exampleSentence}&rdquo;
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <ChipList label="Synonyms" items={word.synonyms} variant="synonym" />
          <ChipList label="Antonyms" items={word.antonyms} variant="antonym" />
        </div>

        <div className="rounded-2xl border border-green/20 bg-green/5 p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-green">
            Usage Tip
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{word.usageTip}</p>
        </div>
      </div>
    </motion.article>
  );
}
