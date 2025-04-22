"use client";

import { motion } from "framer-motion";
import { Layers, Code, FileText, Briefcase, Sliders, Brain, Clock, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";

const features = [
  {
    icon: <Brain className="h-12 w-12 text-blue-500" />,
    title: "AI-Powered Interviewer",
    description: "Our advanced AI simulates real tech interviewers, adapting questions based on your responses for a realistic interview experience."
  },
  {
    icon: <Sliders className="h-12 w-12 text-purple-500" />,
    title: "Customize Your Interview",
    description: "Select your programming language, experience level, and job description to get tailored questions relevant to your target position."
  },
  {
    icon: <Briefcase className="h-12 w-12 text-indigo-500" />,
    title: "Role-Specific Questions",
    description: "Practice with questions focused on frontend, backend, or full-stack development based on your career goals."
  },
  {
    icon: <Code className="h-12 w-12 text-green-500" />,
    title: "Live Coding Challenges",
    description: "Solve real programming problems during your interview with our integrated code editor and real-time feedback."
  },
  {
    icon: <FileText className="h-12 w-12 text-yellow-600" />,
    title: "Resume Analysis",
    description: "Upload your resume to get questions tailored to your experience and background, just like in a real interview."
  },
  {
    icon: <Layers className="h-12 w-12 text-red-500" />,
    title: "Junior to Senior Levels",
    description: "Practice at different difficulty levels based on your experience, from entry-level to senior position interviews."
  },
  {
    icon: <Clock className="h-12 w-12 text-orange-500" />,
    title: "Flexible Practice Sessions",
    description: "Practice whenever you want, as often as you need, without the pressure of scheduling with real people."
  },
  {
    icon: <Target className="h-12 w-12 text-teal-500" />,
    title: "Detailed Feedback",
    description: "Receive comprehensive feedback on your answers, including strengths, areas for improvement, and suggested resources."
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.5
    }
  })
};

export function FeaturesSection() {
  return (
    <section id="features" className="w-full py-20 bg-muted/30 flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
            Features
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Everything You Need to Ace Your Next Interview
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Our platform provides all the tools and features to help you practice and prepare for technical interviews confidently.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
            >
              <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 hover:border-primary/50">
                <CardHeader>
                  <div className="mb-2">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}