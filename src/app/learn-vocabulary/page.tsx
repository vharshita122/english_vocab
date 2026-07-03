"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { WordDisplay } from "@/components/vocabulary/WordDisplay";
import { vocabulary } from "@/lib/vocabulary";
import { useVocabNotes } from "@/lib/notes-store";

export default function LearnVocabularyPage() {
 const [current, setCurrent] = useState(
  vocabulary[Math.floor(Math.random() * vocabulary.length)]
);

  const [spinning, setSpinning] = useState(false);
  const [personalNote, setPersonalNote] = useState("");
  const [savedFlash, setSavedFlash] = useState(false);
  const { addNote, hasWord, hydrated } = useVocabNotes();

  const alreadySaved = hydrated && hasWord(current.word);

  // function spin() {
  //   setSpinning(true);
  //   setPersonalNote("");
  //   setSavedFlash(false);
  //   setTimeout(() => {
  //     setCurrent((prev) => pickRandomWord(vocabulary, prev.id));
  //     setSpinning(false);
  //   }, 500);
  // }
  function spin() {
  setSpinning(true);
  setPersonalNote("");
  setSavedFlash(false);

  setTimeout(() => {
    let next;

    do {
      next =
        vocabulary[Math.floor(Math.random() * vocabulary.length)];
    } while (next.id === current.id);

    setCurrent(next);

    setSpinning(false);
  }, 500);
}
function saveToNotes() {
  if (alreadySaved) return;

  addNote({
    word: current.word,
    meaning: current.meaning,
    hindiMeaning: current.hindiMeaning,
    exampleSentence: current.exampleSentence,
    personalNote: personalNote,
  });

  setSavedFlash(true);

  setTimeout(() => {
    setSavedFlash(false);
  }, 2500);
}

  return (
    <div>
      <PageHeader
        eyebrow="Learn Vocabulary"
        title="Spin & learn a new word"
        description="Hit Spin for a random English word with full details. Save words you want to revise in Today's Notes."
      />

      <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
        {/* <motion.button
          onClick={spin}
          disabled={spinning}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="relative flex h-28 w-28 items-center justify-center rounded-full bg-green text-white shadow-lg shadow-green/30 transition disabled:opacity-70 sm:h-32 sm:w-32"
          aria-label="Spin for a random word"
        > */}
          <motion.button
  onClick={spin}
  disabled={spinning}
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
  animate={spinning ? { scale: [1, 1.05, 1] } : {}}
  transition={{ duration: 0.4 }}
  className="flex h-14 w-52 items-center justify-center rounded-2xl bg-green text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl"
>
  {spinning ? "🔄 Generating..." : "🎲 Spin New Word"}
</motion.button>
          {/* <span className="absolute -bottom-8 text-sm font-semibold text-green">
            Spin
          </span>
        </motion.button> */}

        <div className="flex flex-col gap-2 sm:ml-4">
          <Link
            href="/todays-notes"
            className="inline-flex items-center gap-2 rounded-full border border-purple/25 bg-purple-soft px-4 py-2 text-sm font-semibold text-purple transition hover:bg-purple/15"
          >
            📝 Today&apos;s Notes
          </Link>
          <Link
            href="/todays-notes?mode=revision"
            className="inline-flex items-center gap-2 rounded-full border border-cream-dark bg-card px-4 py-2 text-sm font-medium text-ink-muted transition hover:border-purple/25 hover:text-ink"
          >
            📖 Revision Mode
          </Link>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: spinning ? 0.5 : 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.3 }}
        >
          <WordDisplay word={current} />
        </motion.div>
      </AnimatePresence>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mx-auto mt-8 max-w-lg"
      >
        <label
          htmlFor="personal-note"
          className="mb-2 block text-sm font-medium text-ink-muted"
        >
          Personal note (optional — saved with the word)
        </label>
        <textarea
          id="personal-note"
          value={personalNote}
          onChange={(e) => setPersonalNote(e.target.value)}
          rows={2}
          placeholder="Memory trick, context, or why this word matters to you…"
          className="w-full resize-none rounded-xl border border-cream-dark bg-card px-4 py-3 text-sm text-ink outline-none transition focus:border-purple/40 focus:ring-2 focus:ring-purple/20"
        />

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button
            onClick={saveToNotes}
            disabled={alreadySaved}
            variant={alreadySaved ? "secondary" : "primary"}
          >
            {alreadySaved ? "✓ Already in Notes" : "Save to Today's Notes"}
          </Button>
          <AnimatePresence>
            {savedFlash && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm font-medium text-green"
              >
                Saved successfully!
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.section>
    </div>
  );
}
