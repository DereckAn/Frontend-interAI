import React from "react";

interface GreenBarcodeProps {
  value?: string;
  width?: number;
  height?: number;
  className?: string;
}

const GreenBarcode: React.FC<GreenBarcodeProps> = ({
  value = "152666989",
  width = 90,
  height = 28,
  className,
}) => {
  // Generate barcode pattern based on value
  const generateBarcodePattern = (val: string) => {
    const patterns = [
      [3, 2], // 0 - Solo 2 barras
      [2, 3], // 1 - Solo 2 barras
      [3, 1], // 2 - Solo 2 barras
      [1, 3], // 3 - Solo 2 barras
      [2, 2], // 4 - Solo 2 barras
      // ... etc
    ];

    const result = [3, 1, 1]; // Start pattern

    for (const char of val) {
      const digit = parseInt(char) || 0;
      result.push(...patterns[digit % 9]);
    }

    result.push(1, 1, 3); // End pattern
    return result;
  };

  const pattern = generateBarcodePattern(value);

  return (
    <div
      className={`flex items-end gap-[2px] rounded w-fit ${className}`}
      style={{ width: `${width}px` }}
    >
      {pattern.map((width, index) => (
        <div
          key={index}
          className="bg-green-300/10"
          style={{
            width: `${width * 2}px`, // Multiplica por 2 para barras más gruesas
            height: `${height}px`,
          }}
        />
      ))}
    </div>
  );
};

export default GreenBarcode;
