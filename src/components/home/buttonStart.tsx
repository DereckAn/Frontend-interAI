"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useFormDataStore } from "@/src/store/formDataStore";
import { useState } from "react";

export const ButtonStart = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  // Obtener datos y función de envío del store
  const { 
    submitFormData, 
    isSubmitting,
    resumeFile,
    jobDescription,
    difficultyLevel,
    programmingLanguage,
    selectedTopic
  } = useFormDataStore();

  const handleStartInterview = async () => {
    setIsLoading(true);
    
    try {
      // Validar que se hayan completado los campos requeridos
      if (!difficultyLevel) {
        alert("Please add a difficulty level");
        setIsLoading(false);
        return;
      }

      if (!programmingLanguage) {
        alert("Please add a programming language");
        setIsLoading(false);
        return;
      }

      if (!selectedTopic) {
        alert("Please add a topic");
        setIsLoading(false);
        return;
      }
      
      // Enviar datos a la API
      await submitFormData();
      
      // Redirigir a la página de entrevista
      router.push("/inteview");
    } catch (error) {
      console.error("Error starting interview:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-12 mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          className="bg-gray2/50 hover:bg-gray2/80 text-background px-8 py-6 rounded-xl shadow-lg flex items-center gap-3 text-lg"
          size="lg"
          onClick={handleStartInterview}
          disabled={isLoading || isSubmitting}
        >
          {isLoading || isSubmitting ? (
            <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <Play className="w-6 h-6" />
          )}
          {isLoading || isSubmitting ? "Starting..." : "Start Interview"}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
};
