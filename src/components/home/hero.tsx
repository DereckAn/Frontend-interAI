"use client";

import {
  BarChart3,
  Blocks,
  Brain,
  ClipboardList,
  Cloud,
  Code,
  Cog,
  Database,
  Gamepad2,
  Layers,
  Mic,
  MicOff,
  Network,
  Notebook as Robot,
  Server,
  Shield,
  Smartphone,
  Star,
} from "lucide-react";

import { Transcript } from "@/components/Transcript";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DifficultyLevels, InterviewTopics } from "@/lib/constants";
import { useReducer } from "react";

const topicIcons = {
  frontend: Code,
  backend: Server,
  devops: Cog,
  cybersecurity: Shield,
  fullstack: Layers,
  "ai-engineer": Robot,
  "data-analyst": BarChart3,
  ios: Smartphone,
  blockchain: Blocks,
  "game-dev": Gamepad2,
  cloud: Cloud,
  ml: Brain,
  networking: Network,
  dba: Database,
  pm: ClipboardList,
} as const;

// Definir tipos para el estado y acciones
type InterviewState = {
  isInterviewStarted: boolean;
  selectedTopic: string;
  difficulty: number;
  isListening: boolean;
};

type InterviewAction =
  | { type: "START_INTERVIEW" }
  | { type: "SELECT_TOPIC"; payload: string }
  | { type: "SET_DIFFICULTY"; payload: number }
  | { type: "TOGGLE_MICROPHONE" };

// Reducer para manejar el estado de la entrevista
const interviewReducer = (
  state: InterviewState,
  action: InterviewAction
): InterviewState => {
  switch (action.type) {
    case "START_INTERVIEW":
      return { ...state, isInterviewStarted: true };
    case "SELECT_TOPIC":
      return { ...state, selectedTopic: action.payload };
    case "SET_DIFFICULTY":
      return { ...state, difficulty: action.payload };
    case "TOGGLE_MICROPHONE":
      return { ...state, isListening: !state.isListening };
    default:
      return state;
  }
};

// Componente para la selección de temas
const TopicSelector = ({
  selectedTopic,
  onSelectTopic,
}: {
  selectedTopic: string;
  onSelectTopic: (topic: string) => void;
}) => (
  <div className="space-y-4">
    <label className="text-sm font-medium">Select Topic</label>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {InterviewTopics.map((topic) => {
        const Icon = topicIcons[topic.value as keyof typeof topicIcons];
        return (
          <Card
            key={topic.value}
            className={`p-4 cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 bg-pinko ${
              selectedTopic === topic.value
                ? "ring-2 ring-background bg-background/50"
                : "hover:bg-accent"
            }`}
            onClick={() => onSelectTopic(topic.value)}
          >
            <div className="flex flex-col items-center gap-2 text-center">
              <Icon className="w-8 h-8" />
              <span className="text-sm font-medium">{topic.label}</span>
            </div>
          </Card>
        );
      })}
    </div>
  </div>
);

// Componente para renderizar estrellas de dificultad
const DifficultyStars = ({ level }: { level: number }) => (
  <div className="flex gap-0.5">
    {Array(level)
      .fill(0)
      .map((_, index) => (
        <Star key={index} className="w-4 h-4 fill-current" />
      ))}
  </div>
);

// Componente para la selección de dificultad
const DifficultySelector = ({
  difficulty,
  onSetDifficulty,
}: {
  difficulty: number;
  onSetDifficulty: (level: number) => void;
}) => (
  <div className="space-y-4">
    <label className="text-sm font-medium">Select Difficulty</label>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {DifficultyLevels.map((level) => (
        <Card
          key={level.value}
          className={`p-4 cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 bg-pinko ${
            difficulty === level.value
              ? "ring-2 ring-background bg-background/50"
              : "hover:bg-accent"
          }`}
          onClick={() => onSetDifficulty(level.value)}
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <DifficultyStars level={level.value} />
            <span className="text-sm font-medium">{level.label}</span>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

// Componente para la configuración de la entrevista
const InterviewSetup = ({
  state,
  dispatch,
}: {
  state: InterviewState;
  dispatch: React.Dispatch<InterviewAction>;
}) => (
  <Card className="p-6 space-y-6 bg-foreground">
    <div className="space-y-6">
      <TopicSelector
        selectedTopic={state.selectedTopic}
        onSelectTopic={(topic) =>
          dispatch({ type: "SELECT_TOPIC", payload: topic })
        }
      />

      <DifficultySelector
        difficulty={state.difficulty}
        onSetDifficulty={(level) =>
          dispatch({ type: "SET_DIFFICULTY", payload: level })
        }
      />

      <Button
        className="w-full"
        size="lg"
        onClick={() => dispatch({ type: "START_INTERVIEW" })}
        disabled={!state.selectedTopic}
      >
        Start Interview
      </Button>
    </div>
  </Card>
);

// Componente para la sesión de entrevista activa
const ActiveInterview = ({
  state,
  dispatch,
}: {
  state: InterviewState;
  dispatch: React.Dispatch<InterviewAction>;
}) => (
  <div className="space-y-4">
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Topic</p>
          <p className="font-medium">
            {
              InterviewTopics.find((t) => t.value === state.selectedTopic)
                ?.label
            }
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Difficulty</p>
          <DifficultyStars level={state.difficulty} />
        </div>
        <Button
          variant={state.isListening ? "destructive" : "default"}
          onClick={() => dispatch({ type: "TOGGLE_MICROPHONE" })}
        >
          {state.isListening ? (
            <MicOff className="w-4 h-4 mr-2" />
          ) : (
            <Mic className="w-4 h-4 mr-2" />
          )}
          {state.isListening ? "Stop" : "Start"} Recording
        </Button>
      </div>
    </Card>

    <ScrollArea className="h-[600px] rounded-lg border">
      <Transcript isListening={state.isListening} />
    </ScrollArea>
  </div>
);

export const Hero = () => {
  // Inicializar el estado con useReducer
  const [state, dispatch] = useReducer(interviewReducer, {
    isInterviewStarted: false,
    selectedTopic: "",
    difficulty: 1,
    isListening: false,
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {!state.isInterviewStarted ? (
        <InterviewSetup state={state} dispatch={dispatch} />
      ) : (
        <ActiveInterview state={state} dispatch={dispatch} />
      )}
    </div>
  );
};
