"use client";

import { useCallback, useEffect, useState } from "react";
import type { VocabNote } from "@/lib/data";

const STORAGE_KEY = "speakflow-vocab-notes";

function loadNotes(): VocabNote[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as VocabNote[]) : [];
  } catch {
    return [];
  }
}

function persistNotes(notes: VocabNote[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export type VocabNoteInput = Omit<
  VocabNote,
  "id" | "createdAt" | "updatedAt" | "favorite"
> & { favorite?: boolean };

export function useVocabNotes() {
  const [notes, setNotes] = useState<VocabNote[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setNotes(loadNotes());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) persistNotes(notes);
  }, [notes, hydrated]);

  const addNote = useCallback((input: VocabNoteInput) => {
    const now = new Date().toISOString();
    const note: VocabNote = {
      id: crypto.randomUUID(),
      favorite: input.favorite ?? false,
      createdAt: now,
      updatedAt: now,
      word: input.word.trim(),
      meaning: input.meaning.trim(),
      hindiMeaning: input.hindiMeaning.trim(),
      exampleSentence: input.exampleSentence.trim(),
      personalNote: input.personalNote.trim(),
    };
    setNotes((prev) => [note, ...prev]);
    return note;
  }, []);

  const updateNote = useCallback(
    (id: string, input: Partial<VocabNoteInput>) => {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === id
            ? {
                ...n,
                ...input,
                word: input.word?.trim() ?? n.word,
                meaning: input.meaning?.trim() ?? n.meaning,
                hindiMeaning: input.hindiMeaning?.trim() ?? n.hindiMeaning,
                exampleSentence:
                  input.exampleSentence?.trim() ?? n.exampleSentence,
                personalNote: input.personalNote?.trim() ?? n.personalNote,
                updatedAt: new Date().toISOString(),
              }
            : n
        )
      );
    },
    []
  );

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id
          ? { ...n, favorite: !n.favorite, updatedAt: new Date().toISOString() }
          : n
      )
    );
  }, []);

  const hasWord = useCallback(
    (word: string) =>
      notes.some((n) => n.word.toLowerCase() === word.toLowerCase()),
    [notes]
  );

  return {
    notes,
    hydrated,
    addNote,
    updateNote,
    deleteNote,
    toggleFavorite,
    hasWord,
  };
}

export function filterNotes(
  notes: VocabNote[],
  query: string,
  favoritesOnly: boolean
): VocabNote[] {
  const q = query.trim().toLowerCase();
  return notes.filter((n) => {
    if (favoritesOnly && !n.favorite) return false;
    if (!q) return true;
    return (
      n.word.toLowerCase().includes(q) ||
      n.meaning.toLowerCase().includes(q) ||
      n.hindiMeaning.toLowerCase().includes(q) ||
      n.exampleSentence.toLowerCase().includes(q) ||
      n.personalNote.toLowerCase().includes(q)
    );
  });
}
