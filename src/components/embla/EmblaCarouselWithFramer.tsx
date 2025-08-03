import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useAutoplay } from "./EmblaCarouselAutoplay";
import { usePrevNextButtons } from "./EmblaCarouselArrowButtons";
import { Card, CardProps } from "../hero/Card";
import RotatingArrowIcon from "../hero/RotatingArrowIcon";

type PropType = {
  options?: EmblaOptionsType;
  cards?: CardProps[];
};

const EmblaCarouselWithFramer: React.FC<PropType> = (props) => {
  const { options, cards } = props;

  // Detectar si estamos en iPad para cambiar la orientación
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      const width = window.innerWidth;
      setIsTablet(width >= 641 && width <= 1024);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);

    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const emblaOptions: EmblaOptionsType = {
    duration: 40,
    axis: isTablet ? "y" : "x", // Vertical en tablet, horizontal en otros
    ...options,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, [
    Autoplay({
      playOnInit: true,
      delay: 5000,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    }),
  ]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const { onAutoplayButtonClick } = useAutoplay(emblaApi);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const newIndex = emblaApi.selectedScrollSnap();

    if (newIndex !== activeIndex) {
      setIsTransitioning(true);

      setTimeout(() => {
        setActiveIndex(newIndex);
        setTimeout(() => setIsTransitioning(false), 100);
      }, 100);
    }
  }, [emblaApi, activeIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const cardVariants = {
    inactive: {
      scale: 0.85,
      opacity: 0.6,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    active: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay: 0.1,
      },
    },
    transitioning: {
      scale: 0.85,
      opacity: 0.6,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  const getAnimationState = (index: number) => {
    if (isTransitioning) return "transitioning";
    return index === activeIndex ? "active" : "inactive";
  };

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {cards?.map((cardProps, index) => (
            <div className="embla__slide" key={index}>
              <motion.div
                className="embla__slide__inner"
                variants={cardVariants}
                animate={getAnimationState(index)}
                style={{ width: "100%", height: "100%" }}
              >
                <Card {...cardProps} />
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Botones adaptativos según la orientación */}
      <div className={`pt-5 lg:p-0 flex flex-row justify-center gap-4"}`}>
        <RotatingArrowIcon
          direction={"left"}
          disabled={prevBtnDisabled}
          size={40}
          stroke="0.7"
          onClick={() => onAutoplayButtonClick(onPrevButtonClick)}
          className="group text-green-300"
        />
        <RotatingArrowIcon
          direction={"right"}
          disabled={nextBtnDisabled}
          size={40}
          stroke="0.7"
          onClick={() => onAutoplayButtonClick(onNextButtonClick)}
          className="group text-green-300"
        />
      </div>
    </section>
  );
};

export default EmblaCarouselWithFramer;
