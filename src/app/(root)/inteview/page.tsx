'use client';

import { AIInterviewer } from '@/src/components/interview/AIInterviewer';
import { CodingExercise } from '@/src/components/interview/CodingExercise';
import { ConversationTranscript } from '@/src/components/interview/ConversationTranscript';
import { ResizablePanel } from '@/src/components/interview/ResizablePanel';
import { UserCamera } from '@/src/components/interview/UserCamera';
import { useState } from 'react';

export default function InterviewPage() {
  const [isListening, setIsListening] = useState(false);
  
  return (
    <div className="container mx-auto p-4 h-[calc(100vh-6rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
        {/* Left column */}
        <div className="flex flex-col gap-4 h-full">
          {/* AI Interviewer */}
          <ResizablePanel defaultSize={60} direction="vertical">
            <AIInterviewer isListening={isListening} />
          </ResizablePanel>
          
          {/* User Camera */}
          <ResizablePanel defaultSize={40} direction="vertical">
            <UserCamera setIsListening={setIsListening} />
          </ResizablePanel>
        </div>
        
        {/* Right column */}
        <div className="flex flex-col gap-4 h-full">
          {/* Conversation Transcript */}
          <ResizablePanel defaultSize={60} direction="vertical">
            <ConversationTranscript isListening={isListening} />
          </ResizablePanel>
          
          {/* Coding Exercise */}
          <ResizablePanel defaultSize={40} direction="vertical">
            <CodingExercise />
          </ResizablePanel>
        </div>
      </div>
    </div>
  );
}