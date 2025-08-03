"use client";

import { topicIcons } from "@/src/lib/constants";
import { useFormDataStore } from "@/src/store/formDataStore";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Search, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import cerdo from "../../../public/images/cerdo.webp";

export const TopiCards = () => {
  const [topicSelected, setTopicSelected] = useState<string>("");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  // Remove the isSearchFocused state

  const setSelectedTopic = useFormDataStore((state) => state.setSelectedTopic);

  // Función para obtener los topics desde el backend
  useEffect(() => {
    const fetchTopics = async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL! + "topics");
      const data: Topic[] = await response.json();
      setTopics(data);
    };
    fetchTopics();
  }, []);

  const handleTopicSelect = (topicValue: string) => {
    if (topicSelected === topicValue) {
      return;
    }
    setTopicSelected(topicValue);
    setSelectedTopic(topicValue);
  };

  // Filter topics based on search query
  const filteredTopics = topics.filter(
    (topic) =>
      topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (topic.description &&
        topic.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <section className="bg-gray2/10 rounded-xl p-3 sm:p-5 scrollbar-hidden scrollbar-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2
          className="text-xl sm:text-2xl font-semibold"
          style={{ fontFamily: "var(--font-bodoni)" }}
        >
          Role-based Roadmaps
        </h2>

        {/* Search input with Tailwind focus states */}
        <div className="relative max-w-xs">
          <div className="flex items-center border-2 border-gray2/20 bg-gray2/5 rounded-lg px-3 py-2 transition-all duration-200 focus-within:border-gray2/30 focus-within:bg-background">
            <Search className="w-4 h-4 mr-2 " />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics..."
              className="flex-1 bg-transparent outline-none text-sm "
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="text-text hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {filteredTopics.length === 0 ? (
        <div className="flex items-center justify-center h-40 text-gray-500">
          <p>No topics found matching "{searchQuery}"</p>
        </div>
      ) : (
        <div className="flex overflow-x-auto pb-4 gap-3 sm:gap-4">
          <AnimatePresence>
            {filteredTopics.map((topic) => {
              // Ajustar la clave del ícono según el nombre del topic
              const iconKey = topic.name.toLowerCase().replace(" ", "-");
              const Icon =
                topicIcons[iconKey as keyof typeof topicIcons] ||
                topicIcons["fullstack"]; // Default icon if no match found
              const isSelected = topicSelected === topic.id;

              return (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 flex flex-col items-start justify-center"
                  key={topic.id}
                >
                  <div
                    className="relative w-[220px] h-[180px] sm:w-[280px] sm:h-[220px] md:w-[320px] rounded-xl overflow-hidden cursor-pointer group"
                    onClick={() => handleTopicSelect(topic.id)}
                  >
                    <Image
                      src={cerdo}
                      alt={`${topic.name} roadmap`}
                      className={`object-cover transition duration-300 ease-in-out ${
                        isSelected
                          ? "blur-md scale-110"
                          : "hover:blur-sm hover:scale-105"
                      }`}
                      fill
                      sizes="(max-width: 640px) 220px, (max-width: 768px) 280px, 320px"
                    />

                    {/* Description overlay */}
                    <div
                      className={`absolute inset-0 bg-black/60 flex items-center justify-center p-4 transition-opacity duration-300 ${
                        isSelected
                          ? "opacity-0"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      <p className="text-white text-sm text-center line-clamp-5">
                        {topic.description ||
                          `Learn about ${topic.name} development and prepare for technical interviews.`}
                      </p>
                    </div>

                    {isSelected && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/40 backdrop-blur-sm rounded-full p-3 shadow-lg">
                          <Check className="w-8 h-8 text-white drop-shadow-md" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="w-[220px] sm:w-[280px] md:w-[320px]">
                    <div className="flex items-center gap-2 mt-2">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      <p className="font-medium text-sm sm:text-base">
                        {topic.name}
                      </p>
                    </div>

                    {isSelected && topic.description && (
                      <div className="mt-2 w-full ">
                        <p className="text-sm text-text/50 line-clamp-2">
                          {topic.description}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
};
