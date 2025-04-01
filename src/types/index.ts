// types/index.ts

// export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export interface Question {
  id: string;
  text: string;
  category: "architecture" | "programming" | "scenario" | "experience";
  difficulty: DifficultyLevel;
  expectedDuration: number; // in seconds
}

export interface InterviewState {
  isStarted: boolean;
  currentQuestion: Question | null;
  difficulty: DifficultyLevel;
  transcript: Array<{
    id: string;
    speaker: "ai" | "user";
    text: string;
    timestamp: number;
  }>;
  timeRemaining: number;
  isListening: boolean;
}