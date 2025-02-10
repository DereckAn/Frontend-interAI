"use client";

import { Brain, BrainCircuit, BrainCog } from "lucide-react";
import React from "react";
import { DifficultyLevel } from "../types";

interface DifficultySelectorProps {
  onSelect: (difficulty: DifficultyLevel) => void;
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  onSelect,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
      {[
        {
          level: "beginner" as DifficultyLevel,
          icon: Brain,
          title: "Beginner",
          description: "Basic concepts and fundamentals",
        },
        {
          level: "intermediate" as DifficultyLevel,
          icon: BrainCircuit,
          title: "Intermediate",
          description: "Advanced concepts and practical scenarios",
        },
        {
          level: "advanced" as DifficultyLevel,
          icon: BrainCog,
          title: "Advanced",
          description: "Complex problems and system design",
        },
      ].map(({ level, icon: Icon, title, description }) => (
        <button
          key={level}
          onClick={() => onSelect(level)}
          className="flex flex-col items-center p-6 bg-pinko rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer"
        >
          <Icon className="w-12 h-12 mb-4 text-borde" />
          <h3 className="text-xl font-semibold mb-2 text-borde">{title}</h3>
          <p className="text-borde/60 text-center">{description}</p>
        </button>
      ))}
    </div>
  );
};
