"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { PracticeTimer } from "@/components/speaking/PracticeTimer";
import { SpeechAnalysisResults } from "@/components/speaking/SpeechAnalysisResults";
import { usePracticeTimer, type TimerPreset } from "@/hooks/usePracticeTimer";
import { useSpeechRecorder } from "@/hooks/useSpeechRecorder";
import { speakingTopics } from "@/lib/speakingTopics";
import type { SpeakingTopic } from "@/lib/speakingTopics";
import {
  countFillerWords,
  type SpeechAnalysis,
} from "@/lib/speech-analysis";

const difficultyStyles = {
  easy: "bg-green/15 text-green-dark",
  medium: "bg-purple-soft text-purple",
  hard: "bg-ink/10 text-ink",
};

const categories = [...new Set(speakingTopics.map((t) => t.category))];

export default function SpeakingTopicsPage() {
  const [topic, setTopic] = useState(
  speakingTopics[Math.floor(Math.random() * speakingTopics.length)]
);

//   const [visibleTopics, setVisibleTopics] = useState([
//     getRandomTopic(),
//     getRandomTopic(),
//     getRandomTopic()
// ]);
  const [spinning, setSpinning] = useState(false);
  const [preset, setPreset] = useState<TimerPreset>(60);
  const [customSeconds, setCustomSeconds] = useState(90);

  const timer = usePracticeTimer(60);
  const recorder = useSpeechRecorder();

  const [analysis, setAnalysis] = useState<SpeechAnalysis | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

//   const spin = useCallback(() => {
//     setSpinning(true);
//     setAnalysis(null);
//     setAnalysisError(null);
//     recorder.resetRecording();
//     timer.reset();
//     // setTimeout(() => {
//     //   setTopic((prev) => pickRandomTopic(speakingTopics, prev.id));
//     //   setSpinning(false);
//     // }, 500);
//     setSpinning(true);

// let count = 0;

// const interval = setInterval(() => {

//    setVisibleTopics([
//       getRandomTopic(),
//       getRandomTopic(),
//       getRandomTopic()
//    ]);

//    count++;

//    if(count>20){

//       clearInterval(interval);

//       setVisibleTopics([
//           getRandomTopic(),
//           getRandomTopic(),
//           getRandomTopic()
//       ]);

//       setSpinning(false);

//    }

// },80);
//   }, [recorder, timer]);

// const spin = useCallback(() => {
//   setSpinning(true);
//   setAnalysis(null);
//   setAnalysisError(null);
//   recorder.resetRecording();
//   timer.reset();

//   setTimeout(() => {
//     setTopic((prev) => pickRandomTopic(speakingTopics, prev.id));
//     setSpinning(false);
//   }, 500);
// }, [recorder, timer]);

// const spin = useCallback(() => {
//   setSpinning(true);
//   setAnalysis(null);
//   setAnalysisError(null);

//   recorder.resetRecording();
//   timer.reset();

//   setTimeout(() => {
//     setTopic((prev) => pickRandomTopic(speakingTopics, prev.id));
//     setSpinning(false);
//   }, 600); // animation delay
// }, [recorder, timer]);

function spin() {
  setSpinning(true);

  setAnalysis(null);
  setAnalysisError(null);

  recorder.resetRecording();
  timer.reset();

  setTimeout(() => {
    let next;

    do {
      next =
        speakingTopics[
          Math.floor(Math.random() * speakingTopics.length)
        ];
    } while (next.id === topic.id);

    setTopic(next);

    setSpinning(false);
  }, 600);
}

  const handleRecordToggle = useCallback(async () => {
    if (recorder.isRecording) {
      recorder.stopRecording();
      timer.pause();
    } else {
      setAnalysis(null);
      setAnalysisError(null);
      if (timer.remaining === timer.duration) timer.start();
      await recorder.startRecording();
    }
  }, [recorder, timer]);



  const analyzeSpeech = useCallback(async () => {
    const text = recorder.transcript.trim();
    if (!text) {
      setAnalysisError("No speech detected. Record yourself speaking first.");
      return;
    }

    setAnalyzing(true);
    setAnalysisError(null);

    const fillerBreakdown = countFillerWords(text);
    const durationSeconds = timer.duration - timer.remaining || timer.duration;

    try {
      const res = await fetch("/api/analyze-speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transcript: text,
          topicTitle: topic.title,
          topicPrompt: topic.prompt,
          durationSeconds,
          fillerWordBreakdown: fillerBreakdown,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAnalysisError(data.error ?? "Analysis failed.");
        return;
      }

      setAnalysis(data as SpeechAnalysis);
    } catch {
      setAnalysisError("Could not reach the analysis service. Try again.");
    } finally {
      setAnalyzing(false);
    }
  }, [recorder.transcript, timer.duration, timer.remaining, topic]);

  const displayTranscript =
    recorder.transcript +
    (recorder.interimTranscript ? " " + recorder.interimTranscript : "");

  return (
    <div>
      <PageHeader
        eyebrow="Random Speaking Topics"
        title="Spin, speak & get coached"
        description="Spin a topic, set your timer, record your answer, and receive friendly AI feedback on grammar, fluency, vocabulary, and more."
      />
      <PageHeader
  eyebrow="Random Speaking Topics"
  title="Spin, speak & get coached"
  description="Spin a topic, set your timer, record your answer, and receive friendly AI feedback on grammar, fluency, vocabulary, and more."
/>

<div className="mb-8 flex flex-col items-center gap-5">
  <motion.button
    onClick={spin}
    disabled={spinning}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    animate={spinning ? { rotate: 360 } : { rotate: 0 }}
    transition={{
      duration: 0.6,
      ease: "easeInOut",
    }}
    className="rounded-full bg-green px-8 py-4 text-lg font-bold text-white shadow-lg"
  >
    🎲 Spin
  </motion.button>
</div>


      

      <AnimatePresence mode="wait">


        <motion.div
          // key={topic.id}
          // initial={{ opacity: 0, y: 16 }}
          // animate={{ opacity: spinning ? 0.5 : 1, y: 0 }}
           key={topic.id}
    initial={{ opacity: 0, y: 40, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.4 }}
          exit={{ opacity: 0, y: -16 }}
          className="mx-auto mb-8 max-w-2xl"
        >
          <article className="rounded-3xl border border-cream-dark bg-card p-6 shadow-lg shadow-purple/5 sm:p-8">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-purple-soft px-3 py-1 text-xs font-semibold text-purple">
                {topic.category}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${difficultyStyles[topic.difficulty]}`}
              >
                {topic.difficulty}
              </span>
            </div>
            <h2 className="text-xl font-bold text-ink sm:text-2xl">{topic.title}</h2>
            <div className="mt-4 rounded-2xl bg-cream p-4 sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-green">
                Your prompt
              </p>
              <p className="mt-2 leading-relaxed text-ink">{topic.prompt}</p>
            </div>
            {topic.followUps.length > 0 && (
              <ul className="mt-4 space-y-2">
                {topic.followUps.map((q, i) => (
                  <li
                    key={q}
                    className="flex gap-2 text-sm text-ink-muted"
                  >
                    <span className="font-bold text-purple">{i + 1}.</span>
                    {q}
                  </li>
                ))}
              </ul>
            )}
          </article>
        </motion.div>
      </AnimatePresence>

      <div className="mx-auto grid max-w-2xl gap-6">
        <PracticeTimer
          timer={timer}
          preset={preset}
          customSeconds={customSeconds}
          onPresetChange={setPreset}
          onCustomChange={setCustomSeconds}
          disabled={recorder.isRecording}
        />

        <div className="rounded-2xl border border-cream-dark bg-card p-5 sm:p-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-purple">
            Record & Transcribe
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={handleRecordToggle}
              variant={recorder.isRecording ? "secondary" : "primary"}
            >
              {recorder.isRecording ? "⏹ Stop Recording" : "🎙️ Start Recording"}
            </Button>
            <Button variant="ghost" onClick={recorder.resetRecording}>
              Clear
            </Button>
            {recorder.isRecording && (
              <span className="flex items-center gap-2 text-sm font-medium text-purple">
                <span className="h-2 w-2 animate-pulse rounded-full bg-purple" />
                Recording…
              </span>
            )}
          </div>

          {recorder.error && (
            <p className="mt-3 text-sm text-purple">{recorder.error}</p>
          )}

          {recorder.audioUrl && !recorder.isRecording && (
            <audio controls src={recorder.audioUrl} className="mt-4 w-full" />
          )}

          <div className="mt-4">
            <label
              htmlFor="transcript"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ink-muted"
            >
              Speech transcript
            </label>
            <textarea
              id="transcript"
              value={displayTranscript}
              onChange={(e) => recorder.setTranscriptManual(e.target.value)}
              rows={5}
              placeholder="Your speech will appear here as you talk. You can also edit the transcript manually."
              className="w-full resize-y rounded-xl border border-cream-dark bg-cream px-4 py-3 text-sm leading-relaxed text-ink outline-none focus:border-purple/40 focus:ring-2 focus:ring-purple/20"
            />
          </div>

          <div className="mt-4">
            <Button
              onClick={analyzeSpeech}
              disabled={analyzing || !recorder.transcript.trim()}
            >
              {analyzing ? "Analyzing…" : "✨ Get Speech Analysis"}
            </Button>
          </div>

          {analysisError && (
            <p className="mt-3 text-sm font-medium text-purple">{analysisError}</p>
          )}
        </div>

        {analysis && (
          <div className="rounded-2xl border border-purple/20 bg-card p-5 sm:p-6">
            <h2 className="mb-6 text-lg font-bold text-ink">Your Coaching Report</h2>
            <SpeechAnalysisResults analysis={analysis} />
          </div>
        )}
      </div>

    
    </div>
  );
}
