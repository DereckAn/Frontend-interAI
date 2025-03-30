'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Search, X, Check } from 'lucide-react';

interface ProgrammingLanguage {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const programmingLanguages: ProgrammingLanguage[] = [
    { id: 'js', name: 'JavaScript', icon: 'JS', color: '#f7df1e' },
    { id: 'ts', name: 'TypeScript', icon: 'TS', color: '#3178c6' },
    { id: 'py', name: 'Python', icon: 'PY', color: '#3776ab' },
    { id: 'java', name: 'Java', icon: 'JV', color: '#007396' },
    { id: 'csharp', name: 'C#', icon: 'C#', color: '#239120' },
    { id: 'cpp', name: 'C++', icon: 'C++', color: '#00599c' },
    { id: 'go', name: 'Go', icon: 'GO', color: '#00add8' },
    { id: 'rust', name: 'Rust', icon: 'RS', color: '#dea584' },
    { id: 'ruby', name: 'Ruby', icon: 'RB', color: '#cc342d' },
    { id: 'php', name: 'PHP', icon: 'PHP', color: '#777bb4' },
    { id: 'swift', name: 'Swift', icon: 'SW', color: '#fa7343' },
    { id: 'kotlin', name: 'Kotlin', icon: 'KT', color: '#7f52ff' },
    { id: 'sql', name: 'SQL', icon: 'SQL', color: '#4479a1' },
  ];

  const filteredLanguages = programmingLanguages.filter(lang => 
    lang.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLanguageSelect = (langId: string) => {
    setSelectedLanguage(langId === selectedLanguage ? null : langId);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <section className="max-w-2xl mx-auto my-8">
      <h2 
        className="text-xl sm:text-2xl font-semibold mb-4"
        style={{ fontFamily: "var(--font-bodoni)" }}
      >
        Programming Language
      </h2>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="border-2 border-gray2/20 rounded-xl p-6 hover:border-gray2/30 hover:bg-gray2/5 transition-all duration-200"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-gray2/15 flex items-center justify-center">
            <Code className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-medium">
            Select a language
          </h3>
        </div>
        
        {/* Search input */}
        <div className="relative mb-6">
          <div className={`flex items-center border-2 rounded-lg px-3 py-2 ${
            isSearchFocused 
              ? 'border-gray2/30 bg-white' 
              : 'border-gray2/20 bg-white/80'
          } transition-all duration-200`}>
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Search languages..."
              className="flex-1 bg-transparent outline-none text-sm"
            />
            {searchQuery && (
              <button 
                onClick={clearSearch}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        
        {/* Language grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          <AnimatePresence>
            {filteredLanguages.map((lang) => (
              <motion.div
                key={lang.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleLanguageSelect(lang.id)}
                className={`relative cursor-pointer rounded-lg p-3 border-2 ${
                  selectedLanguage === lang.id
                    ? 'border-gray2/30 bg-gray2/10'
                    : 'border-gray2/10 hover:border-gray2/20 bg-white/50'
                } transition-all duration-200`}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-md flex items-center justify-center text-white font-medium text-xs"
                    style={{ backgroundColor: lang.color }}
                  >
                    {lang.icon}
                  </div>
                  <span className="font-medium text-sm">{lang.name}</span>
                </div>
                
                {selectedLanguage === lang.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-2 right-2 w-5 h-5 bg-gray2/20 rounded-full flex items-center justify-center"
                  >
                    <Check className="w-3 h-3 text-gray2" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredLanguages.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No languages found matching "{searchQuery}"</p>
          </div>
        )}
        
        {selectedLanguage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 p-4 bg-gray2/10 rounded-lg"
          >
            <p className="text-sm">
              <span className="font-medium">Selected language:</span> {programmingLanguages.find(l => l.id === selectedLanguage)?.name}
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};