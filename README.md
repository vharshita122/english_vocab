# SpeakFlow — AI English Speaking Practice

A minimal, playful web app for practicing English speaking with vocabulary flashcards, daily notes, and random conversation topics.

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion**

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home dashboard with quick links |
| `/learn-vocabulary` | Interactive vocabulary flashcards |
| `/todays-notes` | Daily practice notes journal |
| `/speaking-topics` | Random topics, timer, recording, speech-to-text, AI coaching |

## AI Speech Analysis

Copy `.env.example` to `.env.local` and add your OpenAI API key:

```bash
OPENAI_API_KEY=sk-your-key-here
```

Without a key, the app still works with a basic fallback analysis. For full coaching (grammar, pronunciation, vocabulary, fluency, filler words, rewrites, and scores), add your key and restart the dev server.

**Note:** Speech-to-text uses the browser Web Speech API (best in Chrome/Edge). Microphone permission is required.

## Design

- Cream background (`#faf6ef`)
- Green primary buttons (`#3d9b6e`)
- Purple accents (`#7c5cbf`)
- Responsive layout with mobile bottom navigation
