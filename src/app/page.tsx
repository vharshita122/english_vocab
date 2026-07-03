"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const features = [
  {
    href: "/learn-vocabulary",
    title: "Learn Vocabulary",
    description:
      "Spin for a random word with pronunciation, Hindi meaning, synonyms, and save it to your notes.",
    emoji: "📚",
    accent: "border-purple/30 bg-purple-soft/50",
    cta: "Start learning",
  },
  {
    href: "/todays-notes",
    title: "Today's Notes",
    description:
      "Save vocabulary, search your word list, favorite entries, and revise with daily flashcards.",
    emoji: "📝",
    accent: "border-green/30 bg-green/5",
    cta: "Open notes",
  },
  {
    href: "/speaking-topics",
    title: "Random Speaking Topics",
    description:
      "Spin a topic, practice with a timer, record your speech, and get AI coaching feedback.",
    emoji: "🎙️",
    accent: "border-purple/30 bg-card",
    cta: "Get a topic",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function HomePage() {
  return (
    <div>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center sm:mb-14 sm:text-left"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="mb-4 inline-block text-4xl sm:text-5xl"
        >
          👋
        </motion.div>
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-5xl">
          Practice English,{" "}
          <span className="text-purple">one conversation</span> at a time
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-muted sm:mx-0 sm:text-lg">
          Build confidence with vocabulary drills, daily notes, and random
          speaking prompts — all in one playful space.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
          <Link
            href="/speaking-topics"
            className="inline-flex items-center rounded-full bg-green px-6 py-3 text-sm font-semibold text-white shadow-md shadow-green/25 transition hover:bg-green-light"
          >
            Start speaking now
          </Link>
          <Link
            href="/learn-vocabulary"
            className="inline-flex items-center rounded-full border border-purple/25 bg-purple-soft px-6 py-3 text-sm font-semibold text-purple transition hover:bg-purple/15"
          >
            Browse vocabulary
          </Link>
        </div>
      </motion.section>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature) => (
          <motion.div key={feature.href} variants={item}>
            <Link href={feature.href} className="group block h-full">
              <article
                className={`flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple/10 ${feature.accent}`}
              >
                <span className="mb-4 text-3xl transition-transform group-hover:scale-110">
                  {feature.emoji}
                </span>
                <h2 className="text-lg font-bold text-ink">{feature.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                  {feature.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-green group-hover:gap-2 transition-all">
                  {feature.cta}
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </article>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-10 rounded-2xl border border-cream-dark bg-card p-6 sm:mt-14 sm:p-8"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-purple">Daily streak tip</p>
            <p className="mt-1 text-ink-muted">
              Speak aloud for 5 minutes today — even reading your notes counts!
            </p>
          </div>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((day) => (
              <motion.div
                key={day}
                whileHover={{ scale: 1.15 }}
                className={`h-3 w-3 rounded-full ${
                  day <= 3 ? "bg-green" : "bg-cream-dark"
                }`}
              />
            ))}
            <span className="ml-2 text-sm font-medium text-ink-muted">3 days</span>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
