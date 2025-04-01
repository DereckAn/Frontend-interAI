"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export const ButtonStart = () => {
  return (
    <div className="flex justify-center mt-12 mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link href="/inteview">
          <Button
            className="bg-gray2/50 hover:bg-gray2/80 text-background px-8 py-6 rounded-xl shadow-lg flex items-center gap-3 text-lg"
            size="lg"
          >
            <Play className="w-6 h-6" />
            Start Interview
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};
