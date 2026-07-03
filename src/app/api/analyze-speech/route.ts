// import { NextResponse } from "next/server";
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import type {
  AnalyzeSpeechRequest,
  SpeechAnalysis,
} from "@/lib/speech-analysis";

const SYSTEM_PROMPT = `You are a friendly, expert English-speaking coach. Analyze the user's spoken response (provided as a transcript) to a speaking topic.

Respond ONLY with valid JSON matching this exact structure:
{
  "scores": { "grammar": number, "pronunciation": number, "vocabulary": number, "fluency": number, "confidence": number, "overall": number },
  "grammarMistakes": [{ "original": string, "corrected": string, "explanation": string }],
  "pronunciationFeedback": [string],
  "vocabularyLevel": string,
  "vocabularySuggestions": [{ "used": string, "better": string, "reason": string }],
  "fluency": { "summary": string, "confidence": string, "speed": string, "pauses": string, "hesitation": string },
  "fillerWords": { "total": number, "breakdown": { "word": number }, "advice": string },
  "rewrites": [{ "weak": string, "natural": string, "why": string }],
  "additionalPoints": [string],
  "coachSummary": string
}

Rules:
- All scores are 0-100 integers.
- Be encouraging but honest. Explain every mistake clearly with practical tips.
- For pronunciation, infer likely issues from transcript patterns (word choice errors, missing articles, awkward phrasing that suggests L1 interference).
- Use the provided filler word breakdown; merge with your analysis.
- Suggest 2-4 additional points the user could have included for the topic.
- Provide at least 1 grammar fix and 1 rewrite if issues exist; empty arrays only if speech is excellent.
- Keep explanations concise and actionable.`;

function buildFallbackAnalysis(
  body: AnalyzeSpeechRequest
): SpeechAnalysis {
  const words = body.transcript.split(/\s+/).filter(Boolean).length;
  const wpm = body.durationSeconds > 0 ? Math.round((words / body.durationSeconds) * 60) : 0;
  const fillerTotal = Object.values(body.fillerWordBreakdown).reduce(
    (a, b) => a + b,
    0
  );

  const base = Math.min(85, 50 + Math.min(words, 40));
  const fillerPenalty = Math.min(15, fillerTotal * 2);

  return {
    scores: {
      grammar: Math.max(40, base - 5),
      pronunciation: Math.max(45, base),
      vocabulary: Math.max(45, base + 5),
      fluency: Math.max(40, base - fillerPenalty),
      confidence: Math.max(45, base - Math.floor(fillerPenalty / 2)),
      overall: Math.max(40, base - Math.floor(fillerPenalty / 2)),
    },
    grammarMistakes: words < 10
      ? [
          {
            original: body.transcript || "(too short)",
            corrected: "Try speaking for the full timer duration with complete sentences.",
            explanation:
              "Your response was very brief. Aim for at least 4–5 full sentences covering the topic prompt.",
          },
        ]
      : [],
    pronunciationFeedback: [
      "Connect your API key for detailed pronunciation coaching.",
      "Speak clearly and stress important words in each sentence.",
      "Practice minimal pairs (ship/sheep, think/sink) if certain sounds are difficult.",
    ],
    vocabularyLevel:
      words > 80 ? "Intermediate–Advanced" : words > 40 ? "Intermediate" : "Beginner–Intermediate",
    vocabularySuggestions: [
      {
        used: "good",
        better: "beneficial / valuable / rewarding",
        reason: "Use more precise adjectives to sound natural and confident.",
      },
      {
        used: "very",
        better: "extremely / particularly / remarkably",
        reason: "Replace overused intensifiers with stronger vocabulary.",
      },
    ],
    fluency: {
      summary: `You spoke approximately ${words} words in ${body.durationSeconds}s (~${wpm} wpm).`,
      confidence: fillerTotal > 5 ? "Hesitation detected via filler words — keep practicing!" : "Reasonable confidence for practice level.",
      speed: wpm < 90 ? "Pace is slow — try speaking a bit faster." : wpm > 160 ? "Pace is fast — slow down for clarity." : "Pace is comfortable.",
      pauses: "Add brief pauses between ideas instead of mid-sentence fillers.",
      hesitation: fillerTotal > 0 ? `${fillerTotal} filler word(s) detected.` : "Minimal hesitation detected.",
    },
    fillerWords: {
      total: fillerTotal,
      breakdown: body.fillerWordBreakdown,
      advice:
        fillerTotal > 3
          ? "Replace fillers with a silent pause — it sounds more confident."
          : "Good control of filler words. Keep it up!",
    },
    rewrites: words >= 10
      ? [
          {
            weak: "I think this topic is good for me.",
            natural: "This topic resonates with me because it connects to my personal experience.",
            why: "Adds specificity and sounds more natural in spoken English.",
          },
        ]
      : [],
    additionalPoints: [
      `Expand on: ${body.topicPrompt}`,
      "Include a personal example or story.",
      "End with a clear conclusion or opinion.",
    ],
    coachSummary:
      "Great effort! Add your OpenAI API key in .env.local for full AI-powered coaching. Keep practicing daily — consistency builds fluency.",
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AnalyzeSpeechRequest;

    if (!body.transcript?.trim()) {
      return NextResponse.json(
        { error: "Transcript is required. Record your speech first." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(buildFallbackAnalysis(body));
    }

    const userMessage = `Topic: ${body.topicTitle}
Prompt: ${body.topicPrompt}
Speaking duration: ${body.durationSeconds} seconds
Filler word breakdown: ${JSON.stringify(body.fillerWordBreakdown)}

Transcript:
"""
${body.transcript}
"""`;

    // const response = await fetch("https://api.openai.com/v1/chat/completions", {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${apiKey}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    //     response_format: { type: "json_object" },
    //     temperature: 0.4,
    //     messages: [
    //       { role: "system", content: SYSTEM_PROMPT },
    //       { role: "user", content: userMessage },
    //     ],
    //   }),
    // });
    const ai = new GoogleGenAI({
  apiKey,
});

const result = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: `
${SYSTEM_PROMPT}

Topic:
${body.topicTitle}

Prompt:
${body.topicPrompt}

Duration:
${body.durationSeconds}

Fillers:
${JSON.stringify(body.fillerWordBreakdown)}

Transcript:
${body.transcript}
`,
});

const content = result.text;

if (!content) {
  return NextResponse.json(buildFallbackAnalysis(body));
}

const cleanText = content
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

const analysis = JSON.parse(cleanText);

return NextResponse.json(analysis);

  //   if (!response.ok) {
  //     const err = await response.text();
  //     console.error("OpenAI error:", err);
  //     return NextResponse.json(buildFallbackAnalysis(body));
  //   }

  //   const data = await response.json();
  //   const content = data.choices?.[0]?.message?.content;

  //   if (!content) {
  //     return NextResponse.json(buildFallbackAnalysis(body));
  //   }

  //   const analysis = JSON.parse(content) as SpeechAnalysis;
  //   return NextResponse.json(analysis);
  } catch (error) {
    console.error("Analyze speech error:", error);
    return NextResponse.json(
      { error: "Failed to analyze speech. Please try again." },
      { status: 500 }
    );
  }
}
