'use client';

import React, { useEffect } from 'react';
import { Timer as TimerIcon } from 'lucide-react';
import { useInterviewStore } from '../store/interviewStore';

export const Timer: React.FC = () => {
  const { timeRemaining, updateTimeRemaining, isStarted } = useInterviewStore();

  useEffect(() => {
    if (!isStarted) return;

    const interval = setInterval(() => {
      updateTimeRemaining(Math.max(0, timeRemaining - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining, isStarted]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="flex items-center space-x-2 text-lg font-semibold">
      <TimerIcon className="w-6 h-6" />
      <span>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
};