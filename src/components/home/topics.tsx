"use client";

import { topicIcons } from "@/lib/constants";
import { useTopicStore } from "@/store/topicStore";
import { Check } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import cerdo from "../../../public/images/cerdo.webp";

export const TopiCards = () => {
  const { selectedTopic, selectTopic } = useTopicStore();
  const [topics, setTopics] = useState<Topic[]>([]);

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
    if (selectedTopic === topicValue) {
      return;
    }
    selectTopic(topicValue);
  };

  return (
    <section className="bg-gray2/15 rounded-xl p-3 sm:p-5 scrollbar-hidden">
      <h2
        className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4"
        style={{ fontFamily: "var(--font-bodoni)" }}
      >
        Role-based Roadmaps
      </h2>
      <div className="flex overflow-x-auto pb-4 gap-3 sm:gap-4">
        {topics.map((topic) => {
          // Ajustar la clave del ícono según el nombre del topic
          const iconKey = topic.name.toLowerCase().replace(" ", "-");
          const Icon =
            topicIcons[iconKey as keyof typeof topicIcons] ||
            topicIcons["fullstack"]; // Default icon if no match found
          const isSelected = selectedTopic === topic.name;

          return (
            <div
              className="flex-shrink-0 flex flex-col items-start justify-center"
              key={topic.id}
            >
              <div
                className="relative w-[220px] h-[180px] sm:w-[280px] sm:h-[220px] md:w-[320px] rounded-xl overflow-hidden cursor-pointer"
                onClick={() => handleTopicSelect(topic.name)}
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
                {isSelected && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/40 backdrop-blur-sm rounded-full p-3 shadow-lg">
                      <Check className="w-8 h-8 text-white drop-shadow-md" />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <p className="font-medium text-sm sm:text-base">{topic.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
