import { create } from "zustand";
import { DifficultyLevel, InterviewState, Question } from "../types";

const INTERVIEW_DURATION = 30 * 60; // 30 minutes in seconds

interface InterviewStore extends InterviewState {
  startInterview: (difficulty: DifficultyLevel) => void;
  setCurrentQuestion: (question: Question | null) => void;
  addTranscriptEntry: (speaker: "ai" | "user", text: string) => void;
  updateTimeRemaining: (time: number) => void;
  setIsListening: (isListening: boolean) => void;
  resetInterview: () => void;
}

const initialState: InterviewState = {
  isStarted: false,
  currentQuestion: null,
  difficulty: "intermediate",
  transcript: [],
  timeRemaining: INTERVIEW_DURATION,
  isListening: false,
};

export const useInterviewStore = create<InterviewStore>((set) => ({
  ...initialState,
  startInterview: (difficulty) =>
    set({ isStarted: true, difficulty, timeRemaining: INTERVIEW_DURATION }),
  setCurrentQuestion: (question) => set({ currentQuestion: question }),
  addTranscriptEntry: (speaker, text) =>
    set((state) => ({
      transcript: [
        ...state.transcript,
        {
          id: crypto.randomUUID(),
          speaker,
          text,
          timestamp: Date.now(),
        },
      ],
    })),
  updateTimeRemaining: (time) => set({ timeRemaining: time }),
  setIsListening: (isListening) => set({ isListening }),
  resetInterview: () => set(initialState),
}));
