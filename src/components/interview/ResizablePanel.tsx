'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ResizablePanelProps {
  children: React.ReactNode;
  defaultSize: number; // Percentage of parent container
  direction: 'horizontal' | 'vertical';
  minSize?: number; // Minimum size in percentage
  maxSize?: number; // Maximum size in percentage
}

export const ResizablePanel: React.FC<ResizablePanelProps> = ({
  children,
  defaultSize,
  direction,
  minSize = 20,
  maxSize = 80,
}) => {
  const [size, setSize] = useState(defaultSize);
  const [isDragging, setIsDragging] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const initialPosRef = useRef(0);
  const initialSizeRef = useRef(defaultSize);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    initialPosRef.current = direction === 'vertical' ? e.clientY : e.clientX;
    initialSizeRef.current = size;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !panelRef.current) return;
      
      const parentElement = panelRef.current.parentElement;
      if (!parentElement) return;
      
      const parentRect = parentElement.getBoundingClientRect();
      const currentPos = direction === 'vertical' ? e.clientY : e.clientX;
      const delta = currentPos - initialPosRef.current;
      
      const parentSize = direction === 'vertical' ? parentRect.height : parentRect.width;
      const deltaPercent = (delta / parentSize) * 100;
      
      let newSize = initialSizeRef.current + deltaPercent;
      newSize = Math.max(minSize, Math.min(maxSize, newSize));
      
      setSize(newSize);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, direction, minSize, maxSize]);

  return (
    <div 
      ref={panelRef}
      className={`relative ${direction === 'vertical' ? 'h-full' : 'w-full'}`}
      style={{ 
        flexBasis: `${size}%`,
        flexGrow: 0,
        flexShrink: 0,
      }}
    >
      <div className="w-full h-full overflow-hidden rounded-xl border-2 border-gray2/20 bg-white/80 backdrop-blur-sm shadow-sm">
        {children}
      </div>
      
      {/* Resize handle */}
      <div 
        className={`absolute ${
          direction === 'vertical' 
            ? 'bottom-0 left-0 right-0 h-2 cursor-ns-resize' 
            : 'top-0 bottom-0 right-0 w-2 cursor-ew-resize'
        } bg-transparent z-10`}
        onMouseDown={handleMouseDown}
      >
        <div className={`
          absolute ${
            direction === 'vertical' 
              ? 'left-1/2 top-1/2 -translate-x-1/2 w-12 h-1' 
              : 'top-1/2 left-1/2 -translate-y-1/2 h-12 w-1'
          } bg-gray2/30 rounded-full opacity-0 hover:opacity-100 transition-opacity
        `} />
      </div>
    </div>
  );
};