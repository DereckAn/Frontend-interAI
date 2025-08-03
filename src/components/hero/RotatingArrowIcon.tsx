// components/RotatingArrowIcon.tsx
import React from "react";

interface RotatingArrowIconProps {
  direction: "left" | "right";
  size?: number;
  stroke?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const RotatingArrowIcon: React.FC<RotatingArrowIconProps> = ({
  direction,
  size = 60,
  stroke = "0.5",
  onClick,
  disabled = false,
  className = "",
}) => {
  const arrowPath =
    direction === "left"
      ? "M6 12H18M6 12L11 7M6 12L11 17"
      : "M6 12H18M18 12L13 7M18 12L13 17";

  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out ${className}`}
      style={{ width: size, height: size }}
      disabled={disabled}
    >
      {/* Círculo con apertura - Este es el que rota */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className="absolute inset-0 -rotate-55 group-hover:rotate-45 transition-transform duration-500 ease-out"
      >
        <path
          d="M9 3.51221C5.50442 4.74772 3 8.08143 3 12.0001C3 16.9707 7.02944 21.0001 12 21.0001C16.9706 21.0001 21 16.9707 21 12.0001C21 8.08143 18.4956 4.74772 15 3.51221"
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          className="group-hover:text-green-200 transition-colors duration-200 ease-in-out"
        />
      </svg>

      {/* Flecha - Esta permanece estática */}
      <svg
        width={size * 0.4}
        height={size * 0.4}
        viewBox="0 0 24 24"
        className="relative z-10"
      >
        <path
          d={arrowPath}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="group-hover:text-green-200 transition-colors duration-200 ease-in-out"
        />
      </svg>
    </button>
  );
};

export default RotatingArrowIcon;
