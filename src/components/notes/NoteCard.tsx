"use client";

import { motion } from "framer-motion";
import { formatDate, type VocabNote } from "@/lib/data";

interface NoteCardProps {
  note: VocabNote;
  onEdit: (note: VocabNote) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export function NoteCard({
  note,
  onEdit,
  onDelete,
  onToggleFavorite,
}: NoteCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98, x: -12 }}
      className="rounded-2xl border border-cream-dark bg-card p-5 shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-bold text-ink">{note.word}</h3>
            <time className="text-xs text-ink-muted">{formatDate(note.createdAt)}</time>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-ink">{note.meaning}</p>
          {note.hindiMeaning && (
            <p className="mt-1.5 text-sm text-purple">{note.hindiMeaning}</p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            onClick={() => onToggleFavorite(note.id)}
            className="rounded-lg p-2 transition hover:bg-cream-dark"
            aria-label={note.favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <span className={note.favorite ? "text-purple" : "text-ink-muted/50"}>
              {note.favorite ? "★" : "☆"}
            </span>
          </button>
          <button
            onClick={() => onEdit(note)}
            className="rounded-lg p-2 text-ink-muted transition hover:bg-cream-dark hover:text-ink"
            aria-label={`Edit ${note.word}`}
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.501a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="rounded-lg p-2 text-ink-muted transition hover:bg-cream-dark hover:text-ink"
            aria-label={`Delete ${note.word}`}
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path
                fillRule="evenodd"
                d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {note.exampleSentence && (
        <p className="mt-3 rounded-xl bg-cream px-3 py-2 text-sm italic text-ink-muted">
          &ldquo;{note.exampleSentence}&rdquo;
        </p>
      )}

      {note.personalNote && (
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          <span className="font-semibold text-green">Note: </span>
          {note.personalNote}
        </p>
      )}
    </motion.article>
  );
}
