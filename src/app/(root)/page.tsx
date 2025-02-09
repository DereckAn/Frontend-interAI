'use client';

import { DifficultySelector } from "@/components/DifficultySelector";
import { Timer } from "@/components/Timer";
import { Transcript } from "@/components/Transcript";
import { VoiceInput } from "@/components/VoiceInput";
import { useInterviewStore } from "@/store/interviewStore";
import { Brain } from "lucide-react";

export default function Home() {
  const { isStarted, startInterview } = useInterviewStore();
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Brain className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                AI Interview Simulator
              </h1>
            </div>
            {isStarted && <Timer />}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {!isStarted ? (
          <div className="flex flex-col items-center space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to Your Software Developer Interview
              </h2>
              <p className="text-xl text-gray-600">
                Select your experience level to begin the interview
              </p>
            </div>
            <DifficultySelector onSelect={startInterview} />
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Transcript />
              </div>
              <div className="space-y-4">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Voice Controls</h3>
                  <div className="flex justify-center">
                    <VoiceInput />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
