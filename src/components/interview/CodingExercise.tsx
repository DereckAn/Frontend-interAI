'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Play, Check, RefreshCw } from 'lucide-react';

export const CodingExercise: React.FC = () => {
  const [code, setCode] = useState<string>('// Write your solution here\n\nfunction example() {\n  console.log("Hello, world!");\n}\n');
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string>('');
  
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };
  
  const runCode = () => {
    setIsRunning(true);
    
    // Simulate code execution
    setTimeout(() => {
      setOutput('> Hello, world!\n> Execution completed successfully.');
      setIsRunning(false);
    }, 1500);
  };
  
  const resetCode = () => {
    setCode('// Write your solution here\n\nfunction example() {\n  console.log("Hello, world!");\n}\n');
    setOutput('');
  };
  
  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray2/15 flex items-center justify-center">
            <Code className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-semibold" style={{ fontFamily: "var(--font-bodoni)" }}>
            Coding Exercise
          </h2>
        </div>
        
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={runCode}
            disabled={isRunning}
            className="px-3 py-1 bg-gray2/20 hover:bg-gray2/30 rounded-md text-sm flex items-center gap-1"
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Run Code
              </>
            )}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetCode}
            className="px-3 py-1 bg-gray2/10 hover:bg-gray2/20 rounded-md text-sm"
          >
            Reset
          </motion.button>
        </div>
      </div>
      
      <div className="flex-1 grid grid-rows-2 gap-4">
        {/* Code editor */}
        <div className="relative">
          <div className="absolute inset-0 rounded-lg overflow-hidden">
            <textarea
              value={code}
              onChange={handleCodeChange}
              className="w-full h-full p-4 bg-gray-900 text-gray-100 font-mono text-sm resize-none focus:outline-none"
              spellCheck="false"
            />
          </div>
        </div>
        
        {/* Output console */}
        <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm text-gray-300 overflow-auto">
          <div className="flex items-center gap-2 mb-2 text-xs text-gray-500 border-b border-gray-700 pb-2">
            <span>Console Output</span>
          </div>
          {output ? (
            <pre className="whitespace-pre-wrap">{output}</pre>
          ) : (
            <div className="text-gray-500 italic">Code output will appear here...</div>
          )}
        </div>
      </div>
    </div>
  );
};