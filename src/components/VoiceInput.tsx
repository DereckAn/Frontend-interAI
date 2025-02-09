'use client';

import React, { useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useInterviewStore } from '../store/interviewStore';

export const VoiceInput: React.FC = () => {
  const { isListening, setIsListening, addTranscriptEntry } = useInterviewStore();

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.error('Speech recognition is not supported in this browser');
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join('');

      if (event.results[0].isFinal) {
        addTranscriptEntry('user', transcript);
      }
    };

    recognition.onend = () => {
      if (isListening) {
        recognition.start();
      }
    };

    if (isListening) {
      recognition.start();
    }

    return () => {
      recognition.stop();
    };
  }, [isListening]);

  return (
    <button
      onClick={() => setIsListening(!isListening)}
      className={`p-4 rounded-full ${
        isListening
          ? 'bg-red-500 hover:bg-red-600'
          : 'bg-blue-500 hover:bg-blue-600'
      } text-white transition-colors duration-200`}
    >
      {isListening ? (
        <MicOff className="w-6 h-6" />
      ) : (
        <Mic className="w-6 h-6" />
      )}
    </button>
  );
};