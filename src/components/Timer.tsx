import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

interface TimerProps {
  duration: number; // Duration in seconds
}

export function Timer({ duration }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        setProgress((newTime / duration) * 100);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, duration]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-4 min-w-[200px]">
      <Progress value={progress} className="w-full" />
      <span className="text-sm font-medium">{formatTime(timeLeft)}</span>
    </div>
  );
}