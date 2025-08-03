import { ChanginColorText } from "./ChanginColorText";
import { TextCarousel } from "./TextCarousel";

const TitleAnimation = () => {
  return (
    <div className="w-full min-h-[52vh] relative flex justify-center items-center shrink-0 ">
      <div className="text-center w-full">
        {/* Desktop (Laptop) View - 2 lines */}
        <div className="hidden lg:block">
          <h1
            className="w-full text-center leading-none"
            style={{
              fontSize: "clamp(3rem, 7vw, 15rem)",
            }}
          >
            Health insurance that{" "}
            <ChanginColorText text="doesn't" className="inline-block" />
          </h1>

          <div className="flex flex-row justify-center items-center leading-none">
            <ChanginColorText text="get in" className="inline-block" />
            <span className="mx-2"> </span>
            <TextCarousel />
            <span className="mx-2"> </span>
            <ChanginColorText text="the way" className="leading-none" />
          </div>
        </div>

        {/* Tablet View - 3 lines */}
        <div className="hidden md:block lg:hidden">
          <h1
            className="w-full text-center leading-none"
            style={{
              fontSize: "clamp(3rem, 10vw, 10rem)",
            }}
          >
            Health insurance
          </h1>
          <h1
            className="w-full text-center leading-none"
            style={{
              fontSize: "clamp(3rem, 10vw, 10rem)",
            }}
          >
            that{" "}
            <ChanginColorText
              text="doesn't"
              className="inline-block"
              fontSize="clamp(3rem, 10vw, 10rem)"
            />
          </h1>

          <div className="flex flex-row justify-center items-center leading-none">
            <ChanginColorText
              text="get in"
              className="inline-block"
              fontSize="clamp(2.5rem, 12vw, 5rem)"
            />
            <span className="mx-2"> </span>
            <TextCarousel />
            <span className="mx-2"> </span>
            <ChanginColorText
              text="the way"
              className="leading-none"
              fontSize="clamp(2.5rem, 12vw, 5rem)"
            />
          </div>
        </div>

        {/* Mobile View - 4 lines */}
        <div className="block md:hidden">
          <h1
            className="w-full text-center leading-none"
            style={{
              fontSize: "clamp(2rem, 12vw, 5rem)",
              whiteSpace: "nowrap",
            }}
          >
            Health insurance
          </h1>
          <h1
            className="w-full text-center leading-none"
            style={{
              fontSize: "clamp(2.5rem, 12vw, 5rem)",
            }}
          >
            that{" "}
            <ChanginColorText
              text="doesn't get"
              className="inline-block"
              fontSize="clamp(2.5rem, 12vw, 5rem)"
            />
          </h1>

          <div className="flex justify-center leading-none">
            <TextCarousel />
          </div>

          <div className="flex justify-center items-center leading-none">
            <ChanginColorText
              text="in the way"
              className="inline-block"
              fontSize="clamp(2.5rem, 12vw, 5rem)"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleAnimation;
