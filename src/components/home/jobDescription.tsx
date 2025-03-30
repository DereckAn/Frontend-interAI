'use client';

import { useState, useRef } from 'react';
import { Briefcase, Copy, Check, X, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const JobDescription = () => {
  const [description, setDescription] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isCleared, setIsCleared] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleCopy = () => {
    if (description) {
      navigator.clipboard.writeText(description);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setDescription('');
    setIsCleared(true);
    setTimeout(() => setIsCleared(false), 2000);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const getPlaceholderText = () => {
    return "Paste the job description here...\n\nExample:\nSenior Frontend Developer\n\nWe are looking for a skilled Frontend Developer with experience in React, TypeScript, and modern web technologies. The ideal candidate will have a strong portfolio demonstrating UI/UX sensibilities and performance optimization skills.";
  };

  return (
    <section className="w-full my-8">
      <h2 
        className="text-xl sm:text-2xl font-semibold mb-4"
        style={{ fontFamily: "var(--font-bodoni)" }}
      >
        Job Description
      </h2>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`border-2 rounded-xl p-6 ${
          isFocused 
            ? 'border-gray2/30 bg-gray2/5' 
            : 'border-gray2/20 hover:border-gray2/30 hover:bg-gray2/5'
        } transition-all duration-200 ease-in-out`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gray2/15 flex items-center justify-center">
            <Briefcase className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-medium">
            Add job details
          </h3>
        </div>
        
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={description}
            onChange={handleTextChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={getPlaceholderText()}
            className="w-full min-h-[200px] p-4 rounded-lg bg-white/50 border border-gray2/20 focus:outline-none focus:ring-1 focus:ring-gray2/30 resize-y"
            spellCheck="false"
          />
          
          <div className="flex justify-end mt-3 gap-2">
            {description && (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClear}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-gray2/10 hover:bg-gray2/15 transition-colors text-sm"
                >
                  <AnimatePresence mode="wait">
                    {isCleared ? (
                      <motion.span
                        key="cleared"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Check className="w-4 h-4" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="clear"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <X className="w-4 h-4" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {isCleared ? 'Cleared' : 'Clear'}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-gray2/10 hover:bg-gray2/15 transition-colors text-sm"
                >
                  <AnimatePresence mode="wait">
                    {isCopied ? (
                      <motion.span
                        key="copied"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Check className="w-4 h-4" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Copy className="w-4 h-4" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {isCopied ? 'Copied' : 'Copy'}
                </motion.button>
              </>
            )}
          </div>
        </div>
        
        {description && (
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
            <FileText className="w-4 h-4" />
            <span>{description.length} characters</span>
          </div>
        )}
      </motion.div>
    </section>
  );
};