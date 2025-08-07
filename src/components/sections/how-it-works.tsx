"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FileText, Code, MessageSquare, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: <FileText className="h-10 w-10" />,
    title: "Fill Your Profile",
    description: "Enter your experience level, programming languages, frameworks, and job description to customize your interview."
  },
  {
    icon: <Code className="h-10 w-10" />,
    title: "Choose Interview Type",
    description: "Select from junior, mid-level, or senior interviews based on your target position and experience."
  },
  {
    icon: <MessageSquare className="h-10 w-10" />,
    title: "Practice with AI",
    description: "Engage in a realistic interview with our AI, answering technical questions and solving coding challenges."
  },
  {
    icon: <CheckCircle className="h-10 w-10" />,
    title: "Get Detailed Feedback",
    description: "Receive comprehensive feedback on your performance to improve for your next practice session or real interview."
  }
];

export function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  return (
    <section id="how-it-works" className="w-full py-20 flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
            How It Works
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Get Interview Ready in 4 Simple Steps
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Our streamlined process makes it easy to start practicing for your technical interviews right away.
          </p>
        </div>
        
        <div ref={ref} className="relative mx-auto max-w-4xl">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-primary"
              style={{ height: lineHeight }}
            />
          </div>
          
          {/* Steps */}
          <div className="space-y-16 md:space-y-24 relative">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <motion.div 
                  className={`flex ${i % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Circle indicator */}
                  <div className="absolute left-4 md:left-1/2 -translate-y-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full border-2 border-primary bg-background flex items-center justify-center">
                    <span className="text-xs font-bold">{i + 1}</span>
                  </div>
                  
                  {/* Content */}
                  <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:pl-16' : 'md:pr-16'} pl-12`}>
                    <div className="p-6 bg-card rounded-lg shadow-sm border">
                      <div className="flex items-center mb-4">
                        <div className="mr-4 p-2 rounded-lg bg-primary/10 text-primary">
                          {step.icon}
                        </div>
                        <h3 className="text-xl font-bold">{step.title}</h3>
                      </div>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                  
                  {/* Spacer for alignment */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}