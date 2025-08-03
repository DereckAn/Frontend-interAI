interface ChanginColorTextProps {
  text: string;
  className?: string;
  fontSize?: string;
}

export const ChanginColorText = ({
  text,
  className,
  fontSize = "clamp(3rem, 7vw, 15rem)", 
}: ChanginColorTextProps) => {
  return (
    <span
      className={className}
      style={{
        fontSize: fontSize,
        whiteSpace: "nowrap",
        animation: "colorTransition 2s ease-in-out 3s forwards",
      }}
    >
      {text}
    </span>
  );
};
