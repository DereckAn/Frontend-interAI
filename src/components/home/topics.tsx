'use client';

import { InterviewTopics, topicIcons } from "@/lib/constants";
import { Check } from "lucide-react";
import Image from "next/image";
import cerdo from "../../../public/images/cerdo.webp";
import { useTopicStore } from "@/store/topicStore";

export const TopiCards = () => {
  const { selectedTopic, selectTopic } = useTopicStore();

  const handleTopicSelect = (topicValue: string) => {
    if (selectedTopic === topicValue) {
      // Si ya está seleccionado, no hacemos nada
      return;
    }
    selectTopic(topicValue);
  };

  return (
    <section className="bg-pinko rounded-xl p-3 sm:p-5 scrollbar-hidden">
      <h2
        className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 text-borde"
        style={{
          fontFamily: "var(--font-bodoni)",
        }}
      >
        Role-based Roadmaps
      </h2>
      <div className="flex overflow-x-auto pb-4 gap-3 sm:gap-4">
        {InterviewTopics.map((topic) => {
          const Icon = topicIcons[topic.value as keyof typeof topicIcons];
          const isSelected = selectedTopic === topic.value;
          
          return (
            <div
              className="flex-shrink-0 flex flex-col items-start justify-center"
              key={topic.value}
            >
              <div 
                className="relative w-[220px] h-[180px] sm:w-[280px] sm:h-[220px] md:w-[320px] rounded-xl overflow-hidden cursor-pointer"
                onClick={() => handleTopicSelect(topic.value)}
              >
                <Image
                  src={cerdo}
                  alt={`${topic.label} roadmap`}
                  className={`object-cover transition duration-300 ease-in-out ${
                    isSelected ? 'blur-md scale-110' : 'hover:blur-sm hover:scale-105'
                  }`}
                  fill
                  sizes="(max-width: 640px) 220px, (max-width: 768px) 280px, 320px"
                />
                
                {isSelected && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/40 backdrop-blur-sm rounded-full p-3 shadow-lg">
                      <Check className="w-8 h-8 text-white drop-shadow-md" />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Icon className="text-borde w-4 h-4 sm:w-5 sm:h-5" />
                <p className="font-medium text-borde text-sm sm:text-base">
                  {topic.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
