"use client";

import "@/src/styles/embla.css";
import { EmblaOptionsType } from "embla-carousel";
import EmblaCarouselWithFramer from "../embla/EmblaCarouselWithFramer";
import { CardProps } from "../hero/Card";
import CustomButton from "../hero/CustomButton";
import TitleAnimation from "../hero/TitleAnimation";

const OPTIONS: EmblaOptionsType = { loop: true };
const cardSample: CardProps[] = [
  {
    name: "SARAH FOXX",
    title: "OWNER, CEO",
    id: "15-26669-890",
    job: "Sunnyside Up Day Care",
  },
  {
    name: "JEFFREY R. BOTT",
    title: "LEADING PARTNER",
    id: "86-97432-123",
    job: "Bott and Sons Accounting",
  },
  {
    name: "JULIANNA ALVAREZ",
    title: "FOUNDER",
    id: "72-36924-486",
    job: "Spaw Retreat Dog Grooming",
  },
  {
    name: "OSCAR WILDER",
    title: "CEO, ENGINEER",
    id: "64-16497-726",
    job: "Endurance.Al",
  },
];

const HeroAnimation = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center relative -mt-24">
      <TitleAnimation />
      <div className="w-full sm:h-[40vh] lg:h-[45vh] flex sm:flex-row flex-col-reverse">
        <div className="flex basis-1/2 border-2 border-green-100 flex-col p-5 justify-between shrink-0 gap-10 ">
          <p className="lg:text-3xl max-w-2xl">
            Join hundreds of businesses who trust us to offer health insurance
            that works the way it should: affordable coverage that puts
            employees and their doctors in the driving seat.
          </p>
          <CustomButton />
        </div>  
        <div className="flex basis-1/2 border-2 border-b-0 sm:h-[40vh] lg:h-[45vh] md:border-l-0 sm:border-b-2 border-green-100 lg:w-1/2 py-5 sm:py-0 lg:py-5">
          <EmblaCarouselWithFramer options={OPTIONS} cards={cardSample} />
        </div>
      </div>
    </section>
  );
};

export default HeroAnimation;
