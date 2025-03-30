'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Sparkles, Zap, Trophy } from 'lucide-react';

type DifficultyLevel = 'junior' | 'mid' | 'senior';

interface DifficultyOption {
  value: DifficultyLevel;
  label: string;
  icon: React.ReactNode;
  description: string;
  yearsRange: [number, number];
}

export const DifficultySelector = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('mid');
  const [yearsOfExperience, setYearsOfExperience] = useState<number>(3);

  const difficultyOptions: DifficultyOption[] = [
    {
      value: 'junior',
      label: 'Junior',
      icon: <Sparkles className="w-5 h-5" />,
      description: 'Basic concepts and fundamentals',
      yearsRange: [0, 2],
    },
    {
      value: 'mid',
      label: 'Mid-Level',
      icon: <Zap className="w-5 h-5" />,
      description: 'Intermediate topics and practical scenarios',
      yearsRange: [2, 5],
    },
    {
      value: 'senior',
      label: 'Senior',
      icon: <Trophy className="w-5 h-5" />,
      description: 'Advanced concepts and system design',
      yearsRange: [5, 10],
    },
  ];

  const handleDifficultyChange = (difficulty: DifficultyLevel) => {
    setSelectedDifficulty(difficulty);
    
    // Set default years of experience based on the selected difficulty
    const option = difficultyOptions.find(opt => opt.value === difficulty);
    if (option) {
      const defaultYears = Math.floor((option.yearsRange[0] + option.yearsRange[1]) / 2);
      setYearsOfExperience(defaultYears);
    }
  };

  const handleYearsChange = (value: number[]) => {
    setYearsOfExperience(value[0]);
  };

  const getCurrentOption = () => {
    return difficultyOptions.find(opt => opt.value === selectedDifficulty) || difficultyOptions[1];
  };

  const currentOption = getCurrentOption();
  const minYears = currentOption.yearsRange[0];
  const maxYears = currentOption.yearsRange[1];

  return (
    <section className="max-w-2xl mx-auto my-8">
      <h2 
        className="text-xl sm:text-2xl font-semibold mb-4"
        style={{ fontFamily: "var(--font-bodoni)" }}
      >
        Interview Difficulty
      </h2>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="border-2 border-gray2/20 rounded-xl p-6 hover:border-gray2/30 hover:bg-gray2/5 transition-all duration-200"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {difficultyOptions.map((option) => (
            <motion.div
              key={option.value}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleDifficultyChange(option.value)}
              className={`relative cursor-pointer rounded-lg p-4 ${
                selectedDifficulty === option.value
                  ? 'bg-gray2/15 border-2 border-gray2/30'
                  : 'bg-white/50 border-2 border-gray2/10 hover:border-gray2/20'
              } transition-all duration-200`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-full ${
                  selectedDifficulty === option.value
                    ? 'bg-gray2/20'
                    : 'bg-gray2/10'
                }`}>
                  {option.icon}
                </div>
                <h3 className="font-medium">{option.label}</h3>
              </div>
              <p className="text-sm text-gray-600">{option.description}</p>
              
              {selectedDifficulty === option.value && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-gray2/20 rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 rounded-full bg-gray-800"></div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
        
        <div className="mb-2">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium">Years of Experience</h3>
            <span className="text-sm font-semibold bg-gray2/15 px-2 py-1 rounded-md">
              {yearsOfExperience} {yearsOfExperience === 1 ? 'year' : 'years'}
            </span>
          </div>
          
          <Slider
            value={[yearsOfExperience]}
            min={minYears}
            max={maxYears}
            step={0.5}
            onValueChange={handleYearsChange}
            className="py-4"
          />
          
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{minYears} {minYears === 1 ? 'year' : 'years'}</span>
            <span>{maxYears} {maxYears === 1 ? 'year' : 'years'}</span>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 p-4 bg-gray2/10 rounded-lg"
        >
          <p className="text-sm">
            <span className="font-medium">Selected profile:</span> {currentOption.label} developer with {yearsOfExperience} {yearsOfExperience === 1 ? 'year' : 'years'} of experience
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};