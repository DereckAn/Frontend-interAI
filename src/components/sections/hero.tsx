"use client";

import { Button } from "@/src/components/ui/button";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="w-full pt-32 pb-20 md:pb-32 md:pt-40 flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_700px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <motion.h1 
                className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Practice Interviews with AI That Thinks Like a Tech Interviewer
              </motion.h1>
              <motion.p 
                className="max-w-[600px] text-muted-foreground md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Prepare for your next tech job interview with our AI interviewer. Customize your practice sessions based on your experience level, tech stack, and job description.
              </motion.p>
            </div>
            <motion.div 
              className="flex flex-col gap-2 min-[400px]:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Get Started Free
              </Button>
              <Button size="lg" variant="outline">
                See How It Works
              </Button>
            </motion.div>
            <motion.div 
              className="mt-6 flex items-center justify-start space-x-4 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-muted-foreground">No credit card required</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-muted-foreground">Cancel anytime</span>
              </div>
            </motion.div>
          </div>
          <motion.div 
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border bg-card">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
              <div className="absolute inset-0 flex flex-col p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500 mr-2" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-auto" />
                  <div className="w-1/2 h-2 rounded-full bg-muted" />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="mb-4 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-muted flex-shrink-0" />
                    <div>
                      <div className="h-2 w-20 bg-muted rounded-md mb-2" />
                      <div className="p-4 bg-muted/50 rounded-lg w-4/5">
                        <div className="h-2 w-full bg-muted rounded-md mb-2" />
                        <div className="h-2 w-full bg-muted rounded-md mb-2" />
                        <div className="h-2 w-2/3 bg-muted rounded-md" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex-shrink-0" />
                    <div>
                      <div className="h-2 w-20 bg-blue-500/30 rounded-md mb-2" />
                      <div className="p-4 bg-blue-500/10 rounded-lg w-5/6">
                        <div className="h-2 w-full bg-blue-500/30 rounded-md mb-2" />
                        <div className="h-2 w-full bg-blue-500/30 rounded-md mb-2" />
                        <div className="h-2 w-3/4 bg-blue-500/30 rounded-md" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}