'use client';

import React, { useRef, useEffect } from 'react';
import { useInterviewStore } from '../store/interviewStore';

export const Transcript: React.FC = () => {
  const { transcript } = useInterviewStore();
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-[400px] overflow-y-auto">
      <div className="space-y-4">
        {transcript.map(({ id, speaker, text }) => (
          <div
            key={id}
            className={`flex ${
              speaker === 'ai' ? 'justify-start' : 'justify-end'
            }`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-lg ${
                speaker === 'ai'
                  ? 'bg-blue-100 text-blue-900'
                  : 'bg-green-100 text-green-900'
              }`}
            >
              <div className="text-sm font-semibold mb-1">
                {speaker === 'ai' ? 'AI Interviewer' : 'You'}
              </div>
              <div>{text}</div>
            </div>
          </div>
        ))}
        <div ref={transcriptEndRef} />
      </div>
    </div>
  );
};