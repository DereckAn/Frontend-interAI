"use client";

import { DifficultySelector } from "@/components/DifficultySelector";
import { Transcript } from "@/components/Transcript";
import { VoiceInput } from "@/components/VoiceInput";
import { useInterviewStore } from "@/store/interviewStore";

export default function Home() {
  const { isStarted, startInterview } = useInterviewStore();
  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {!isStarted ? (
        <div className="flex flex-col items-center space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Welcome to Your Software Developer Interview
            </h2>
            <p className="text-xl text-foreground/50">
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
              <div className="bg-pinko rounded-lg shadow-lg p-6">
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
  );
}
