"use client";

import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="w-full py-20 flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <motion.div 
          className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Background patterns */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[40rem] w-[40rem] rotate-12 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute right-0 top-0 h-[30rem] w-[30rem] rounded-full bg-white/5 blur-3xl" />
          </div>
          
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
              Ready to Ace Your Next Technical Interview?
            </h2>
            <p className="mt-4 max-w-[700px] text-xl text-white/80">
              Start practicing with our AI interviewer today and gain the confidence you need to succeed in your job search.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90">
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                Book a Demo
              </Button>
            </div>
            <p className="mt-4 text-sm text-white/60">
              No credit card required. Start with 3 free practice interviews.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}