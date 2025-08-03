import React from "react";
import RotatingArrowIcon from "./RotatingArrowIcon";

const CustomButton: React.FC = () => {
  return (
    <div className="flex items-center justify-center group w-fit relative ">
      <button
        className="flex items-center p-2 px-5 cursor-pointer text-green-500 group-hover:text-green-200
      border border-green-500 group-hover:border-green-200 transition-all bg-background z-10
        duration-700 ease-in-out rounded-full w-fit
        group-hover:translate-x-12 transform"
        onClick={() => {}}
      >
        <div className="">Get a Custom Quote Today</div>
      </button>
      <RotatingArrowIcon
        direction="right"
        size={50}
        onClick={() => {}}
        className="text-green-500 group-hover:text-green-200 transition-all
        duration-700 ease-in-out
        group-hover:-translate-x-60 transform"
      />
    </div>
  );
};

export default CustomButton;
