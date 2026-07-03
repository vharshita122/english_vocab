"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { NoteCard } from "@/components/notes/NoteCard";
import { NoteForm } from "@/components/notes/NoteForm";
import { RevisionMode } from "@/components/notes/RevisionMode";
import type { VocabNote } from "@/lib/data";
import { filterNotes, useVocabNotes, type VocabNoteInput } from "@/lib/notes-store";

type Tab = "notes" | "revision";

function TodaysNotesContent() {
  const searchParams = useSearchParams();
  const initialTab: Tab =
    searchParams.get("mode") === "revision" ? "revision" : "notes";

  const [tab, setTab] = useState<Tab>(initialTab);
  const [search, setSearch] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingNote, setEditingNote] = useState<VocabNote | null>(null);

  const { notes, hydrated, addNote, updateNote, deleteNote, toggleFavorite } =
    useVocabNotes();

  const filtered = filterNotes(notes, search, favoritesOnly);
  const today = new Date().toDateString();
  const todaysCount = notes.filter(
    (n) => new Date(n.createdAt).toDateString() === today
  ).length;

  function handleAdd(data: VocabNoteInput) {
    addNote(data);
    setShowAddForm(false);
  }

  function handleUpdate(data: VocabNoteInput) {
    if (!editingNote) return;
    updateNote(editingNote.id, data);
    setEditingNote(null);
  }

  if (!hydrated) {
    return (
      <div className="flex min-h-[200px] items-center justify-center text-ink-muted">
        Loading notes…
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow="Today's Notes"
        title="Your vocabulary journal"
        description="Add words manually or save them from Learn Vocabulary. Search, favorite, and revise daily."
      />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-soft text-lg">
            📅
          </span>
          <div>
            <p className="font-semibold text-ink">
              {new Intl.DateTimeFormat("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              }).format(new Date())}
            </p>
            <p className="text-sm text-ink-muted">
              {todaysCount} saved today · {notes.length} total
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex rounded-2xl border border-cream-dark bg-card p-1">
        {(
          [
            { id: "notes" as const, label: "All Notes", icon: "📝" },
            { id: "revision" as const, label: "Revision Mode", icon: "📖" },
          ] as const
        ).map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              tab === id
                ? "bg-green text-white shadow-sm"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            <span>{icon}</span>
            {label}
          </button>
        ))}
      </div>

      {tab === "revision" ? (
        <RevisionMode notes={notes} />
      ) : (
        <>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search words, meanings, notes…"
                className="w-full rounded-full border border-cream-dark bg-card py-2.5 pl-10 pr-4 text-sm text-ink outline-none transition focus:border-purple/40 focus:ring-2 focus:ring-purple/20"
              />
            </div>
            <button
              onClick={() => setFavoritesOnly((f) => !f)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                favoritesOnly
                  ? "border-purple/40 bg-purple-soft text-purple"
                  : "border-cream-dark bg-card text-ink-muted hover:text-ink"
              }`}
            >
              {favoritesOnly ? "★ Favorites" : "☆ Favorites"}
            </button>
            <Button onClick={() => { setShowAddForm((s) => !s); setEditingNote(null); }}>
              {showAddForm ? "Cancel" : "+ Add word"}
            </Button>
          </div>

          <AnimatePresence>
            {showAddForm && (
              <div className="mb-6">
                <NoteForm
                  submitLabel="Add to notes"
                  onSubmit={handleAdd}
                  onCancel={() => setShowAddForm(false)}
                />
              </div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {editingNote && (
              <div className="mb-6">
                <h3 className="mb-3 font-semibold text-ink">
                  Edit &ldquo;{editingNote.word}&rdquo;
                </h3>
                <NoteForm
                  initial={editingNote}
                  submitLabel="Save changes"
                  onSubmit={handleUpdate}
                  onCancel={() => setEditingNote(null)}
                />
              </div>
            )}
          </AnimatePresence>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-cream-dark bg-card/50 p-10 text-center">
              <p className="text-3xl">{search || favoritesOnly ? "🔍" : "✨"}</p>
              <p className="mt-3 font-medium text-ink">
                {search || favoritesOnly
                  ? "No matching notes"
                  : "No notes yet"}
              </p>
              <p className="mt-1 text-sm text-ink-muted">
                {search || favoritesOnly
                  ? "Try a different search or clear filters."
                  : "Add a word manually or save one from Learn Vocabulary."}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onEdit={setEditingNote}
                    onDelete={deleteNote}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function TodaysNotesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[200px] items-center justify-center text-ink-muted">
          Loading…
        </div>
      }
    >
      <TodaysNotesContent />
    </Suspense>
  );
}
