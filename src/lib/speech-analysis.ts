export interface GrammarMistake {
  original: string;
  corrected: string;
  explanation: string;
}

export interface VocabSuggestion {
  used: string;
  better: string;
  reason: string;
}

export interface SentenceRewrite {
  weak: string;
  natural: string;
  why: string;
}

export interface SpeechAnalysisScores {
  grammar: number;
  pronunciation: number;
  vocabulary: number;
  fluency: number;
  confidence: number;
  overall: number;
}

export interface SpeechAnalysis {
  scores: SpeechAnalysisScores;
  grammarMistakes: GrammarMistake[];
  pronunciationFeedback: string[];
  vocabularyLevel: string;
  vocabularySuggestions: VocabSuggestion[];
  fluency: {
    summary: string;
    confidence: string;
    speed: string;
    pauses: string;
    hesitation: string;
  };
  fillerWords: {
    total: number;
    breakdown: Record<string, number>;
    advice: string;
  };
  rewrites: SentenceRewrite[];
  additionalPoints: string[];
  coachSummary: string;
}

export interface AnalyzeSpeechRequest {
  transcript: string;
  topicTitle: string;
  topicPrompt: string;
  durationSeconds: number;
  fillerWordBreakdown: Record<string, number>;
}

const FILLER_PATTERNS = [
  "um",
  "uh",
  "uhh",
  "umm",
  "like",
  "actually",
  "basically",
  "you know",
  "i mean",
  "sort of",
  "kind of",
  "literally",
  "so",
  "well",
  "right",
];

export function countFillerWords(transcript: string): Record<string, number> {
  const lower = transcript.toLowerCase();
  const breakdown: Record<string, number> = {};

  for (const filler of FILLER_PATTERNS) {
    const regex = new RegExp(
      `(?:^|\\s|[,.])${filler.replace(/ /g, "\\s+")}(?:\\s|[,.!?]|$)`,
      "gi"
    );
    const matches = lower.match(regex);
    if (matches && matches.length > 0) {
      breakdown[filler] = matches.length;
    }
  }

  return breakdown;
}

export function totalFillers(breakdown: Record<string, number>): number {
  return Object.values(breakdown).reduce((sum, n) => sum + n, 0);
}
