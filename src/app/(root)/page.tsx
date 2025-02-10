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

import { Timer } from "@/components/Timer";
import { Transcript } from "@/components/Transcript";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DifficultyLevels, InterviewTopics } from "@/lib/constants";
import { useState } from "react";

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

export default function Home() {
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [isListening, setIsListening] = useState(false);

  const startInterview = () => {
    setIsInterviewStarted(true);
  };

  const toggleMicrophone = () => {
    setIsListening(!isListening);
  };

  const renderDifficultyStars = (level: number) => {
    return Array(level)
      .fill(0)
      .map((_, index) => <Star key={index} className="w-4 h-4 fill-current" />);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8" />
            <h1 className="text-2xl font-bold">AI Tech Interview Simulator</h1>
          </div>
          {isInterviewStarted && <Timer duration={1800} />}
        </div>

        {!isInterviewStarted ? (
          <Card className="p-6 space-y-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="text-sm font-medium">Select Topic</label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {InterviewTopics.map((topic) => {
                    const Icon =
                      topicIcons[topic.value as keyof typeof topicIcons];
                    return (
                      <Card
                        key={topic.value}
                        className={`p-4 cursor-pointer transition-all hover:scale-105 ${
                          selectedTopic === topic.value
                            ? "ring-2 ring-primary bg-primary/5"
                            : "hover:bg-accent"
                        }`}
                        onClick={() => setSelectedTopic(topic.value)}
                      >
                        <div className="flex flex-col items-center gap-2 text-center">
                          <Icon className="w-8 h-8" />
                          <span className="text-sm font-medium">
                            {topic.label}
                          </span>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium">Select Difficulty</label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {DifficultyLevels.map((level) => (
                    <Card
                      key={level.value}
                      className={`p-4 cursor-pointer transition-all hover:scale-105 ${
                        difficulty === level.value
                          ? "ring-2 ring-primary bg-primary/5"
                          : "hover:bg-accent"
                      }`}
                      onClick={() => setDifficulty(level.value)}
                    >
                      <div className="flex flex-col items-center gap-2 text-center">
                        <div className="flex gap-0.5">
                          {renderDifficultyStars(level.value)}
                        </div>
                        <span className="text-sm font-medium">
                          {level.label}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={startInterview}
                disabled={!selectedTopic}
              >
                Start Interview
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Topic</p>
                  <p className="font-medium">
                    {
                      InterviewTopics.find((t) => t.value === selectedTopic)
                        ?.label
                    }
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Difficulty</p>
                  <div className="flex items-center gap-1">
                    {renderDifficultyStars(difficulty)}
                  </div>
                </div>
                <Button
                  variant={isListening ? "destructive" : "default"}
                  onClick={toggleMicrophone}
                >
                  {isListening ? (
                    <MicOff className="w-4 h-4 mr-2" />
                  ) : (
                    <Mic className="w-4 h-4 mr-2" />
                  )}
                  {isListening ? "Stop" : "Start"} Recording
                </Button>
              </div>
            </Card>

            <ScrollArea className="h-[600px] rounded-lg border">
              <Transcript isListening={isListening} />
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
}
