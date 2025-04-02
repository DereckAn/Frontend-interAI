'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AIInterviewerProps {
  isListening: boolean;
}

export const AIInterviewer: React.FC<AIInterviewerProps> = ({ isListening }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  
  // Simulate AI speaking
  useEffect(() => {
    if (isListening) {
      setIsSpeaking(false);
      return;
    }
    
    const speakingInterval = setInterval(() => {
      setIsSpeaking(prev => !prev);
    }, 500);
    
    return () => clearInterval(speakingInterval);
  }, [isListening]);
  
  // Simulate initial greeting
  useEffect(() => {
    const initialMessage = "Hello! I'm your AI interviewer today. I'll be asking you some technical questions about programming. Let's start with a brief introduction. Could you tell me about your background in technology?";
    let index = 0;
    
    const typingInterval = setInterval(() => {
      if (index <= initialMessage.length) {
        setCurrentMessage(initialMessage.substring(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 30);
    
    return () => clearInterval(typingInterval);
  }, []);
  
  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="h-12 w-12 border-2 border-gray2/20">
          <AvatarFallback className="bg-gray2/20">AI</AvatarFallback>
          <AvatarImage>
            <div className="flex items-center justify-center h-full w-full bg-gray2/20">
              <Brain className="h-6 w-6" />
            </div>
          </AvatarImage>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold" style={{ fontFamily: "var(--font-bodoni)" }}>
            AI Interviewer
          </h2>
          <div className="flex items-center text-sm text-gray-500">
            <span className={`inline-block h-2 w-2 rounded-full mr-2 ${isSpeaking ? 'bg-green-500' : 'bg-gray-300'}`}></span>
            {isSpeaking ? 'Speaking...' : 'Listening...'}
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-gray2/5 rounded-lg p-6">
        <AnimatePresence>
          <motion.div
            key="ai-avatar"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-40 h-40 rounded-full bg-gray2/10 border-4 border-gray2/20 flex items-center justify-center"
          >
            <Brain className="w-20 h-20 text-gray2/60" />
            
            {/* Speaking animation */}
            <AnimatePresence>
              {isSpeaking && (
                <motion.div
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }}
                  exit={{ opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute inset-0 rounded-full border-4 border-gray2/30"
                />
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="mt-4 p-4 bg-gray2/10 rounded-lg max-h-32 overflow-y-auto">
        <p className="text-sm">{currentMessage}</p>
      </div>
    </div>
  );
};