'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Search, X, Check } from 'lucide-react';
import { useFormDataStore } from '@/store/formDataStore';

// Definir la interfaz para los lenguajes que vienen del API
interface Language {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// Interfaz para los lenguajes con propiedades visuales adicionales
interface ProgrammingLanguage extends Language {
  icon: string;
  color: string;
}

// Mapa de colores para los lenguajes más comunes
const languageColors: Record<string, string> = {
  'JavaScript': '#f7df1e',
  'TypeScript': '#3178c6',
  'Python': '#3776ab',
  'Java': '#007396',
  'C#': '#239120',
  'C++': '#00599c',
  'Go': '#00add8',
  'Rust': '#dea584',
  'Ruby': '#cc342d',
  'PHP': '#777bb4',
  'Swift': '#fa7343',
  'Kotlin': '#7f52ff',
  'SQL': '#4479a1',
  // Color por defecto para otros lenguajes
  'default': '#6b7280'
};

interface LanguageSelectorClientProps {
  languages: Language[];
}

export const LanguageSelectorClient = ({ languages }: LanguageSelectorClientProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // Agregar el store para guardar el lenguaje
  const setProgrammingLanguage = useFormDataStore(state => state.setProgrammingLanguage);

  // Transformar los datos para agregar icon y color
  const enhancedLanguages: ProgrammingLanguage[] = languages.map(lang => {
    // Obtener las iniciales del nombre para el icono
    const initials = lang.name.substring(0, 2).toUpperCase();
    
    // Obtener el color del mapa o usar el color por defecto
    const color = languageColors[lang.name] || languageColors.default;
    
    return {
      ...lang,
      icon: initials,
      color
    };
  });

  const filteredLanguages = enhancedLanguages.filter(lang => 
    lang.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLanguageSelect = (langId: string) => {
    const newSelection = langId === selectedLanguage ? null : langId;
    setSelectedLanguage(newSelection);
    
    // Guardar en el store global
    setProgrammingLanguage(newSelection);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
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
            <span className="font-medium">Selected language:</span> {enhancedLanguages.find(l => l.id === selectedLanguage)?.name}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};