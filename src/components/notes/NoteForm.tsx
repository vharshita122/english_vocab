"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { VocabNoteInput } from "@/lib/notes-store";

const fields: {
  key: keyof VocabNoteInput;
  label: string;
  placeholder: string;
  required?: boolean;
  multiline?: boolean;
}[] = [
  { key: "word", label: "Word", placeholder: "e.g. Perseverance", required: true },
  { key: "meaning", label: "Meaning", placeholder: "English definition", required: true, multiline: true },
  { key: "hindiMeaning", label: "Hindi Meaning", placeholder: "हिंदी में अर्थ", multiline: true },
  {
    key: "exampleSentence",
    label: "Example Sentence",
    placeholder: "Use the word in a sentence",
    multiline: true,
  },
  {
    key: "personalNote",
    label: "Personal Note",
    placeholder: "Your own tip, memory trick, or context…",
    multiline: true,
  },
];

interface NoteFormProps {
  initial?: Partial<VocabNoteInput>;
  submitLabel: string;
  onSubmit: (data: VocabNoteInput) => void;
  onCancel?: () => void;
}

export function NoteForm({ initial, submitLabel, onSubmit, onCancel }: NoteFormProps) {
  const [form, setForm] = useState<VocabNoteInput>({
    word: initial?.word ?? "",
    meaning: initial?.meaning ?? "",
    hindiMeaning: initial?.hindiMeaning ?? "",
    exampleSentence: initial?.exampleSentence ?? "",
    personalNote: initial?.personalNote ?? "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.word.trim() || !form.meaning.trim()) return;
    onSubmit(form);
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="rounded-2xl border border-purple/20 bg-purple-soft/30 p-6"
    >
      <div className="space-y-4">
        {fields.map(({ key, label, placeholder, required, multiline }) => (
          <div key={key}>
            <label
              htmlFor={`note-${key}`}
              className="mb-1 block text-sm font-medium text-ink-muted"
            >
              {label}
              {required && <span className="text-purple"> *</span>}
            </label>
            {multiline ? (
              <textarea
                id={`note-${key}`}
                value={form[key] as string}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                rows={key === "personalNote" ? 3 : 2}
                placeholder={placeholder}
                className="w-full resize-none rounded-xl border border-cream-dark bg-card px-4 py-2.5 text-sm text-ink outline-none transition focus:border-purple/40 focus:ring-2 focus:ring-purple/20"
              />
            ) : (
              <input
                id={`note-${key}`}
                value={form[key] as string}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                placeholder={placeholder}
                required={required}
                className="w-full rounded-xl border border-cream-dark bg-card px-4 py-2.5 text-sm text-ink outline-none transition focus:border-purple/40 focus:ring-2 focus:ring-purple/20"
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="submit"
          className="inline-flex items-center rounded-full bg-green px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-green/25 transition hover:bg-green-light"
        >
          {submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-ink-muted transition hover:bg-cream-dark"
          >
            Cancel
          </button>
        )}
      </div>
    </motion.form>
  );
}
