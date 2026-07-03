"use client";

import { useCallback, useRef, useState } from "react";

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

function getSpeechRecognition(): SpeechRecognitionConstructor | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function useSpeechRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [supported, setSupported] = useState(true);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const transcriptRef = useRef("");

  const startRecording = useCallback(async () => {
    setError(null);
    const SpeechRecognition = getSpeechRecognition();

    if (!SpeechRecognition) {
      setSupported(false);
      setError(
        "Speech recognition is not supported in this browser. Try Chrome or Edge."
      );
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunksRef.current = [];

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return URL.createObjectURL(blob);
        });
        stream.getTracks().forEach((t) => t.stop());
      };

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        let interim = "";
        let final = transcriptRef.current;

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const text = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            final += text + " ";
          } else {
            interim += text;
          }
        }

        transcriptRef.current = final;
        setTranscript(final.trim());
        setInterimTranscript(interim);
      };

      recognition.onerror = (event) => {
        if (event.error !== "aborted") {
          setError(`Speech recognition error: ${event.error}`);
        }
      };

      recognition.onend = () => {
        if (mediaRecorderRef.current?.state === "recording") {
          try {
            recognition.start();
          } catch {
            /* already started */
          }
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
      recorder.start();
      setIsRecording(true);
    } catch {
      setError("Microphone access denied. Please allow microphone permission.");
    }
  }, []);

  const stopRecording = useCallback(() => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;

    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    mediaRecorderRef.current = null;
    setIsRecording(false);
    setInterimTranscript("");
  }, []);

  const resetRecording = useCallback(() => {
    stopRecording();
    transcriptRef.current = "";
    setTranscript("");
    setInterimTranscript("");
    setError(null);
    setAudioUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
  }, [stopRecording]);

  const setTranscriptManual = useCallback((text: string) => {
    transcriptRef.current = text;
    setTranscript(text);
  }, []);

  return {
    isRecording,
    transcript,
    interimTranscript,
    fullTranscript: (transcript + " " + interimTranscript).trim(),
    error,
    audioUrl,
    supported,
    startRecording,
    stopRecording,
    resetRecording,
    setTranscriptManual,
  };
}
