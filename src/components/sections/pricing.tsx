"use client";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const pricingPlans = [
  {
    name: "Free Trial",
    price: "$0",
    description: "Try our platform with limited features",
    features: [
      "3 practice interviews",
      "Basic question bank",
      "Junior level interviews only",
      "Standard feedback",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    price: "$39",
    period: "per month",
    description: "Perfect for job seekers actively interviewing",
    features: [
      "Unlimited practice interviews",
      "Advanced question bank",
      "All experience levels",
      "Detailed performance feedback",
      "Resume analysis",
      "Custom interview scenarios",
      "48-hour email support",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Team",
    price: "$199",
    period: "per month",
    description: "For teams preparing multiple candidates",
    features: [
      "Everything in Professional",
      "Up to 10 team members",
      "Team performance analytics",
      "Interview recommendation engine",
      "Custom question library",
      "Manager dashboard",
      "Priority support",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="w-full py-20 flex items-center justify-center"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
            Pricing
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Choose the Right Plan for Your Needs
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Flexible pricing options to help you prepare for your next
            interview, whether you're just starting out or a seasoned
            professional.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex"
            >
              <Card
                className={`flex flex-col w-full ${
                  plan.popular ? "border-primary shadow-lg relative" : ""
                }`}
              >
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="flex items-baseline mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className="ml-2 text-muted-foreground">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <CardDescription className="mt-2">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center">
                        <Check className="mr-2 h-5 w-5 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.popular ? "bg-primary hover:bg-primary/90" : ""
                    }`}
                    // variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            All plans include a 14-day money-back guarantee. No long-term
            contracts required.
          </p>
        </div>
      </div>
    </section>
  );
}
