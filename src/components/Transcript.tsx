import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Brain } from 'lucide-react';

interface Message {
  role: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

interface TranscriptProps {
  isListening: boolean;
}

export function Transcript({ isListening }: TranscriptProps) {
  const [messages, setMessages] = useState<Message[]>([]);

  // Simulated initial message
  useEffect(() => {
    setMessages([
      {
        role: 'ai',
        content: 'Hello! I\'m your AI interviewer today. Let\'s begin with your first question. Could you please introduce yourself and tell me about your background in technology?',
        timestamp: new Date(),
      },
    ]);
  }, []);

  return (
    <div className="p-4 space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex gap-4 ${
            message.role === 'user' ? 'flex-row-reverse' : ''
          }`}
        >
          <Avatar>
            {message.role === 'ai' ? (
              <>
                <AvatarFallback>AI</AvatarFallback>
                <AvatarImage>
                  <Brain className="w-full h-full p-2" />
                </AvatarImage>
              </>
            ) : (
              <AvatarFallback>You</AvatarFallback>
            )}
          </Avatar>
          <div
            className={`flex-1 rounded-lg p-4 ${
              message.role === 'ai'
                ? 'bg-secondary'
                : 'bg-primary text-primary-foreground'
            }`}
          >
            <p className="text-sm">{message.content}</p>
            <time className="text-xs opacity-70 mt-2 block">
              {message.timestamp.toLocaleTimeString()}
            </time>
          </div>
        </div>
      ))}
      
      {isListening && (
        <div className="flex items-center justify-center p-4 text-muted-foreground">
          <span className="animate-pulse">Listening...</span>
        </div>
      )}
    </div>
  );
}