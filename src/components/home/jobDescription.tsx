'use client';

import { useState, useRef } from 'react';
import { Briefcase, Copy, Check, X, FileText, Upload, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormDataStore } from '@/src/store/formDataStore';
import { uploadFile } from '@/src/actions/fileUpload';
import { useSession } from 'next-auth/react';

export const JobDescription = () => {
  const [description, setDescription] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isCleared, setIsCleared] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'text' | 'file'>('text');
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Session and store
  const { data: session } = useSession();
  const setJobDescription = useFormDataStore(state => state.setJobDescription);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setDescription(newValue);
    setJobDescription(newValue); // Guardar en el store global
  };

  const handleCopy = () => {
    if (description) {
      navigator.clipboard.writeText(description);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setDescription('');
    setJobDescription(''); // Limpiar en el store global
    setUploadedFile(null);
    setUploadStatus('idle');
    setErrorMessage('');
    setIsCleared(true);
    setTimeout(() => setIsCleared(false), 2000);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!session) {
      setUploadStatus('error');
      setErrorMessage('Please login to upload files');
      return;
    }

    // Validate file type
    const validTypes = ['application/pdf', 'text/plain'];
    if (!validTypes.includes(file.type)) {
      setUploadStatus('error');
      setErrorMessage('Please upload a PDF or TXT file');
      setTimeout(() => setUploadStatus('idle'), 3000);
      return;
    }

    setUploadStatus('uploading');
    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const result = await uploadFile(formData, 'JOB_DESCRIPTION');

      if (result.success && result.fileDto) {
        setUploadedFile(file);
        setUploadStatus('success');
        setJobDescription(`[File uploaded: ${file.name}]`); // Store reference in global state
      } else {
        setUploadStatus('error');
        setErrorMessage(result.error || 'Upload failed');
        setTimeout(() => setUploadStatus('idle'), 3000);
      }
    } catch (error) {
      setUploadStatus('error');
      setErrorMessage('Network error occurred');
      setTimeout(() => setUploadStatus('idle'), 3000);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const toggleUploadMethod = () => {
    const newMethod = uploadMethod === 'text' ? 'file' : 'text';
    setUploadMethod(newMethod);
    if (newMethod === 'file') {
      setDescription('');
      setJobDescription('');
    } else {
      setUploadedFile(null);
      setUploadStatus('idle');
    }
  };

  const getPlaceholderText = () => {
    return "Paste the job description here...\n\nExample:\nSenior Frontend Developer\n\nWe are looking for a skilled Frontend Developer with experience in React, TypeScript, and modern web technologies. The ideal candidate will have a strong portfolio demonstrating UI/UX sensibilities and performance optimization skills.";
  };

  return (
    <section className="w-full my-8">
      <h2 
        className="text-xl sm:text-2xl font-semibold mb-4"
        style={{ fontFamily: "var(--font-bodoni)" }}
      >
        Job Description
      </h2>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`border-2 rounded-xl p-6 ${
          isFocused 
            ? 'border-gray2/30 bg-gray2/5' 
            : 'border-gray2/20 hover:border-gray2/30 hover:bg-gray2/5'
        } transition-all duration-200 ease-in-out`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray2/15 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-medium">
              Add job details
            </h3>
          </div>
          
          {/* Toggle between text and file upload */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleUploadMethod}
              className={`px-3 py-1 rounded-md text-sm transition-colors ${
                uploadMethod === 'text'
                  ? 'bg-gray2/20 text-gray2'
                  : 'bg-gray2/10 hover:bg-gray2/15 text-gray2/70'
              }`}
            >
              Text
            </button>
            <button
              onClick={toggleUploadMethod}
              className={`px-3 py-1 rounded-md text-sm transition-colors ${
                uploadMethod === 'file'
                  ? 'bg-gray2/20 text-gray2'
                  : 'bg-gray2/10 hover:bg-gray2/15 text-gray2/70'
              }`}
            >
              File
            </button>
          </div>
        </div>
        
        <div className="relative">
          {uploadMethod === 'text' ? (
            <textarea
              ref={textareaRef}
              value={description}
              onChange={handleTextChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={getPlaceholderText()}
              className="w-full min-h-[200px] p-4 rounded-lg bg-gray2/10 border border-gray2/20 focus:outline-none focus:ring-1 focus:ring-gray2/30 resize-y"
              spellCheck="false"
            />
          ) : (
            <div className={`min-h-[200px] p-6 rounded-lg border-2 border-dashed text-center ${
              uploadStatus === 'error'
                ? 'border-red-400 bg-red-50'
                : uploadStatus === 'uploading'
                ? 'border-blue-400 bg-blue-50'
                : uploadStatus === 'success'
                ? 'border-green-400 bg-green-50'
                : 'border-gray2/20 hover:border-gray2/30 hover:bg-gray2/5'
            } transition-all duration-200`}>
              
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.txt"
                className="hidden"
              />

              {uploadedFile ? (
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray2/90">{uploadedFile.name}</h4>
                    <p className="text-sm text-gray2/70">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <p className="text-xs text-green-600 mt-1">✓ Uploaded successfully</p>
                  </div>
                  <button
                    onClick={() => {
                      setUploadedFile(null);
                      setUploadStatus('idle');
                      setJobDescription('');
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-red-100 hover:bg-red-200 transition-colors text-sm text-red-700"
                  >
                    <X className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    uploadStatus === 'uploading'
                      ? 'bg-blue-100'
                      : uploadStatus === 'error'
                      ? 'bg-red-100'
                      : 'bg-gray2/20'
                  }`}>
                    {uploadStatus === 'uploading' ? (
                      <Upload className="w-6 h-6 text-blue-600 animate-spin" />
                    ) : uploadStatus === 'error' ? (
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    ) : (
                      <FileText className="w-6 h-6 text-gray2" />
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-lg font-medium">
                      {uploadStatus === 'uploading'
                        ? 'Uploading file...'
                        : uploadStatus === 'error'
                        ? errorMessage
                        : 'Upload job description file'
                      }
                    </h4>
                    
                    {uploadStatus !== 'uploading' && (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="underline hover:text-gray2/80 font-medium"
                      >
                        Choose PDF or TXT file
                      </button>
                    )}
                    
                    <p className="text-sm text-gray2/70">
                      Supported formats: PDF, TXT (Max 10MB)
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {uploadMethod === 'text' && (
            <div className="flex justify-end mt-3 gap-2">
              {description && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClear}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-gray2/10 hover:bg-gray2/15 transition-colors text-sm"
                  >
                    <AnimatePresence mode="wait">
                      {isCleared ? (
                        <motion.span
                          key="cleared"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Check className="w-4 h-4" />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="clear"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <X className="w-4 h-4" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {isCleared ? 'Cleared' : 'Clear'}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopy}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-gray2/10 hover:bg-gray2/15 transition-colors text-sm"
                  >
                    <AnimatePresence mode="wait">
                      {isCopied ? (
                        <motion.span
                          key="copied"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Check className="w-4 h-4" />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Copy className="w-4 h-4" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {isCopied ? 'Copied' : 'Copy'}
                  </motion.button>
                </>
              )}
            </div>
          )}
        </div>
        
        {uploadMethod === 'text' && description && (
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
            <FileText className="w-4 h-4" />
            <span>{description.length} characters</span>
          </div>
        )}
      </motion.div>
    </section>
  );
};