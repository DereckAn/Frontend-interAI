'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Brain, User } from 'lucide-react';
import { ScrollArea } from '@/src/components/ui/scroll-area';

interface Message {
  id: string;
  role: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

interface ConversationTranscriptProps {
  isListening: boolean;
}

export const ConversationTranscript: React.FC<ConversationTranscriptProps> = ({ isListening }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Simulate initial message
  useEffect(() => {
    setMessages([
      {
        id: '1',
        role: 'ai',
        content: "Hello! I'm your AI interviewer today. I'll be asking you some technical questions about programming. Let's start with a brief introduction. Could you tell me about your background in technology?",
        timestamp: new Date(),
      },
    ]);
  }, []);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);
  
  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gray2/15 flex items-center justify-center">
          <MessageSquare className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-semibold" style={{ fontFamily: "var(--font-bodoni)" }}>
          Conversation Transcript
        </h2>
      </div>
      
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-4" ref={scrollAreaRef}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'ai' ? 'bg-gray2/20' : 'bg-gray2/10'
              }`}>
                {message.role === 'ai' ? (
                  <Brain className="w-4 h-4" />
                ) : (
                  <User className="w-4 h-4" />
                )}
              </div>
              
              <div className={`rounded-lg p-3 max-w-[80%] ${
                message.role === 'ai' 
                  ? 'bg-gray2/10 text-gray-800' 
                  : 'bg-gray2/20 text-gray-800'
              }`}>
                <p className="text-sm">{message.content}</p>
                <span className="text-xs text-gray-500 mt-1 block">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </motion.div>
          ))}
          
          {isListening && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center my-4"
            >
              <div className="px-4 py-2 bg-gray2/10 rounded-full text-sm flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray2/40 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-gray2/60"></span>
                </span>
                Listening...
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};