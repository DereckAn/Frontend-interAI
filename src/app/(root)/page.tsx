import { CtaSection } from "@/src/components/sections/cta";
import { FeaturesSection } from "@/src/components/sections/features";
import { HeroSection } from "@/src/components/sections/hero";
import { HowItWorksSection } from "@/src/components/sections/how-it-works";
import { PricingSection } from "@/src/components/sections/pricing";
import { TestimonialsSection } from "@/src/components/sections/testimonials";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <TestimonialsSection />
      <CtaSection />
    </div>
  );
}