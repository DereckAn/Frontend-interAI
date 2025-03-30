'use client';

import { useState, useRef, useCallback } from 'react';
import { FileUp, Check, X, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ResumeUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);

  const validateFile = (file: File): boolean => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    return validTypes.includes(file.type);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && validateFile(droppedFile)) {
      setFile(droppedFile);
      setUploadStatus('success');
    } else {
      setUploadStatus('error');
      setTimeout(() => setUploadStatus('idle'), 3000);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      setUploadStatus('success');
    } else if (selectedFile) {
      setUploadStatus('error');
      setTimeout(() => setUploadStatus('idle'), 3000);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setFile(null);
    setUploadStatus('idle');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section className="w-full my-8">
      <h2 
        className="text-xl sm:text-2xl font-semibold mb-4"
        style={{ fontFamily: "var(--font-bodoni)" }}
      >
        Upload Your Resume
      </h2>
      
      <AnimatePresence>
        {!file ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`border-2 border-dashed rounded-xl p-8 text-center ${
              isDragging 
                ? 'border-borde bg-borde/5' 
                : uploadStatus === 'error' 
                  ? 'border-red-400 bg-red-50' 
                  : 'border-gray-300 hover:border-borde/50 hover:bg-borde/5'
            } transition-all duration-200 ease-in-out`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx"
            />
            
            <motion.div 
              className="flex flex-col items-center justify-center gap-4"
              animate={{ scale: isDragging ? 1.05 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                animate={{ 
                  y: isDragging ? [-5, 0, -5] : 0,
                }}
                transition={{ 
                  repeat: isDragging ? Infinity : 0, 
                  duration: 1.5 
                }}
                className="w-16 h-16 rounded-full bg-gray2/20 flex items-center justify-center"
              >
                <FileUp className="w-8 h-8" />
              </motion.div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">
                  {uploadStatus === 'error' 
                    ? 'Invalid file format' 
                    : 'Drag a file here, or'}
                </h3>
                <button
                  onClick={handleButtonClick}
                  className=" underline hover:text-borde/80 font-medium"
                >
                  Choose a file to upload
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  Supported formats: PDF, DOC, DOCX
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="border-2 rounded-xl p-6 bg-gray2/15 border-gray2/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray2/15 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-gray2" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 truncate max-w-xs sm:max-w-sm">
                    {file.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={removeFile}
                  className="p-2 rounded-full hover:bg-gray2/5 transition-colors"
                >
                  <X className="w-5 h-5 text-red-600" />
                </motion.button>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 260, 
                    damping: 20,
                    delay: 0.2 
                  }}
                  className="w-10 h-10 rounded-full bg-gray2/20 flex items-center justify-center"
                >
                  <Check className="w-5 h-5 text-gray2" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};