"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/src/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "InterviewAI helped me prepare for a senior frontend role at a major tech company. The customized questions based on my resume were spot on, and I felt so much more confident during the actual interview.",
    name: "Sarah Johnson",
    title: "Frontend Developer",
    avatar: "SJ"
  },
  {
    quote: "After using InterviewAI for two weeks, I finally landed my dream job as a backend engineer. The AI asked me challenging system design questions that came up in my real interview!",
    name: "Michael Chen",
    title: "Backend Engineer",
    avatar: "MC"
  },
  {
    quote: "As someone transitioning from junior to mid-level, I wasn't sure what to expect in interviews. InterviewAI's tailored questions helped me identify and strengthen my weak areas before the real thing.",
    name: "Alex Rodriguez",
    title: "Full Stack Developer",
    avatar: "AR"
  },
  {
    quote: "My team used InterviewAI to prepare for our technical interviews and we saw a 40% improvement in our success rate. The custom question libraries and analytics are game-changers.",
    name: "Jennifer Park",
    title: "Engineering Manager",
    avatar: "JP"
  }
];

export function TestimonialsSection() {
  return (
    <section className="w-full py-20 bg-muted/30 flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
            Testimonials
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Success Stories from Real Users
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            See how InterviewAI has helped professionals at all levels prepare for and succeed in their technical interviews.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <Quote className="h-8 w-8 text-primary/40 mb-4" />
                  <p className="text-lg italic">{testimonial.quote}</p>
                </CardContent>
                <CardFooter className="flex items-center gap-4 pt-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}