# File Upload Implementation - Frontend

**Project:** InterviewAI Frontend  
**Date:** September 12, 2025  
**Technology Stack:** Next.js 15, React 19, TypeScript, Zustand  

---

## 📋 Overview

This document details the complete implementation of the file upload system for resume files in the InterviewAI platform, including architectural decisions, issues encountered, and solutions implemented.

---

## 🏗️ Initial Architecture Problem

### **The Duplication Issue**

Initially, the frontend had **two conflicting approaches** for file uploads:

#### **Approach 1: Standalone File Upload** ❌
```typescript
// Location: src/actions/fileUpload.ts
// Location: src/components/home/resume.tsx (uploadFileToServer function)

Flow:
1. User selects file → Immediately uploads to `/api/files/upload`
2. File stored in MinIO with database metadata
3. File gets its own database record with ID
4. Later, interview creation expects file from Zustand store
```

#### **Approach 2: Embedded File Upload** ✅
```typescript
// Location: src/store/formDataStore.ts
// Location: src/components/home/resume.tsx (file selection only)

Flow:
1. User selects file → Stored in Zustand store only
2. User submits interview form → File uploaded with interview data
3. Single API call to `/interview/create` handles both file upload and interview creation
```

### **The Core Problem**
- File was uploaded via Approach 1 but not stored in Zustand
- Interview creation (Approach 2) couldn't find the file in `state.resumeFile`
- Result: **No file in form submission**

---

## 🔧 Implementation Details

### **Final Architecture (Approach 2 Only)**

#### **File Selection Component**
**Location:** `src/components/home/resume.tsx`

**Key Features:**
- ✅ Drag & drop interface
- ✅ File picker fallback
- ✅ File type validation (PDF, DOC, DOCX)
- ✅ File size display
- ✅ Error handling with user feedback
- ✅ Immediate storage in Zustand store

**Core Logic:**
```typescript
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFile = e.target.files?.[0];
  if (selectedFile && validateFile(selectedFile)) {
    setFile(selectedFile); // Local state for UI
    setResumeFile(selectedFile); // Zustand store for interview creation
    setErrorMessage(""); // Clear any previous errors
  } else if (selectedFile) {
    setErrorMessage("Invalid file format. Please upload PDF, DOC, or DOCX files.");
    setTimeout(() => setErrorMessage(""), 3000);
  }
};
```

**File Validation:**
```typescript
const validateFile = (file: File): boolean => {
  const validTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  return validTypes.includes(file.type);
};
```

#### **State Management**
**Location:** `src/store/formDataStore.ts`

**Zustand Store Structure:**
```typescript
interface FormDataState {
  // User data
  userId: string | null;

  // Form data
  resumeFile: File | null;
  jobDescription: string;
  difficultyLevel: DifficultyLevel;
  yearsOfExperience: number;
  programmingLanguage: string | null;
  selectedTopic: string | null;

  // Actions
  setResumeFile: (file: File | null) => void;
  submitFormData: () => Promise<void>;
  // ... other actions
}
```

**Form Submission Logic:**
```typescript
submitFormData: async () => {
  const state = get();
  const formData = new FormData();

  // Add resume file if exists
  if (state.resumeFile) {
    formData.append("resume", state.resumeFile);
  }

  // Add other data as JSON
  const jsonData = {
    userId: state.userId,
    jobDescription: state.jobDescription,
    difficultyLevel: state.difficultyLevel,
    yearsOfExperience: state.yearsOfExperience,
    programmingLanguageId: selectedLanguageObj.id,
    selectedTopicId: selectedTopicObj.id,
  };

  formData.append("data", JSON.stringify(jsonData));

  // Single API call handles both file upload and interview creation
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/interview/create`, {
    method: "POST",
    body: formData,
  });
}
```

---

## 🚨 Issues Encountered & Solutions

### **Issue 1: Architectural Duplication**
**Problem:** Two conflicting file upload approaches causing confusion and failures.

**Symptoms:**
- Backend logs showed `📁 Resume parts: none`
- Files uploaded to MinIO via standalone endpoint
- Interview creation couldn't access files

**Root Cause:** Resume component was uploading files immediately but not storing in Zustand for later use.

**Solution:** ✅ **Removed Approach 1 completely**
- Deleted `src/actions/fileUpload.ts`
- Removed `uploadFileToServer()` function from resume component
- Simplified resume component to only handle file selection
- Kept only embedded upload via `/interview/create`

### **Issue 2: File Not Stored in Zustand**
**Problem:** Selected files weren't being stored in the global state.

**Symptoms:**
- `state.resumeFile` was always `null`
- Form submission had no file data
- Backend received empty resume parts

**Root Cause:** File was only stored in local component state, not in Zustand store.

**Solution:** ✅ **Immediate Zustand Storage**
```typescript
// Before (broken)
const handleFileChange = (e) => {
  const selectedFile = e.target.files?.[0];
  if (selectedFile && validateFile(selectedFile)) {
    setFile(selectedFile); // Only local state
    uploadFileToServer(selectedFile); // Wrong approach
  }
};

// After (fixed)
const handleFileChange = (e) => {
  const selectedFile = e.target.files?.[0];
  if (selectedFile && validateFile(selectedFile)) {
    setFile(selectedFile); // Local state for UI
    setResumeFile(selectedFile); // Zustand store for interview creation ✅
  }
};
```

### **Issue 3: Content Type Parameter Mismatch**
**Problem:** Backend rejected files due to content type format mismatch.

**Symptoms:**
- Files had correct MIME types but with parameters
- Frontend sent: `application/pdf;charset=UTF-8`
- Backend expected: `application/pdf`
- Validation failed, no file upload

**Root Cause:** Backend content type validation didn't handle MIME type parameters.

**Solution:** ✅ **Content Type Parsing** (Backend fix)
```typescript
// Backend solution (documented in backend docs)
// Extract base content type without parameters
String baseContentType = contentType.split(";")[0].trim();
```

### **Issue 4: Unused State and Dependencies**
**Problem:** Leftover state variables and imports from removed Approach 1.

**Symptoms:**
- TypeScript errors for unused variables
- UI references to non-existent state
- Import errors for deleted files

**Solution:** ✅ **Complete Cleanup**
- Removed `uploadStatus`, `uploadedFileData` state variables
- Removed `Upload` icon and `useSession` imports
- Simplified UI logic to use only `errorMessage` state
- Updated button text from "Uploading..." to "Ready for upload"

---

## 🎨 UI/UX Implementation

### **Visual States**

#### **Empty State**
```typescript
<div className="border-2 border-dashed rounded-xl p-8 text-center border-gray2/20 hover:border-gray2/30">
  <FileUp className="w-8 h-8" />
  <h3>Drag a file here, or</h3>
  <button>Choose a file to upload</button>
  <p>Supported formats: PDF, DOC, DOCX</p>
</div>
```

#### **Error State**
```typescript
<div className="border-red-400 bg-red-50">
  <AlertCircle className="w-8 h-8 text-red-600" />
  <h3>{errorMessage}</h3>
  // No button shown during error
</div>
```

#### **File Selected State**
```typescript
<div className="border-2 rounded-xl p-6 bg-gray2/15">
  <FileText className="w-6 h-6" />
  <h3>{file.name}</h3>
  <p>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
  <p className="text-green-600">✓ Ready for upload</p>
  <button onClick={removeFile}>×</button>
</div>
```

### **Drag & Drop Implementation**
```typescript
const handleDrop = useCallback((e: React.DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  setIsDragging(false);

  const droppedFile = e.dataTransfer.files[0];
  if (droppedFile && validateFile(droppedFile)) {
    setFile(droppedFile);
    setResumeFile(droppedFile); // Store in Zustand immediately
    setErrorMessage("");
  } else {
    setErrorMessage("Invalid file format. Please upload PDF, DOC, or DOCX files.");
    setTimeout(() => setErrorMessage(""), 3000);
  }
}, [setResumeFile]);
```

---

## 🧪 Testing & Validation

### **Test Scenarios**

#### **✅ Happy Path**
1. User selects valid PDF file via drag & drop
2. File appears in UI with "Ready for upload" status
3. User fills interview form and submits
4. Backend logs show successful file reception and upload to MinIO

#### **✅ File Type Validation**
1. User selects invalid file type (e.g., .txt, .jpg)
2. Error message displayed: "Invalid file format..."
3. File not stored in Zustand
4. Error clears after 3 seconds

#### **✅ File Removal**
1. User selects valid file
2. User clicks remove button (×)
3. File cleared from both local state and Zustand store
4. UI returns to empty state

### **Error Scenarios Handled**
- Invalid file types (non-PDF/DOC/DOCX)
- Large files (handled by backend validation)
- Network errors during submission
- Missing file during form submission

---

## 🔄 Data Flow

### **Complete File Upload Flow**
```
1. User Interaction
   ├── Drag & Drop → handleDrop()
   └── File Picker → handleFileChange()

2. File Validation
   ├── validateFile() checks MIME type
   ├── Success → Store in both local state & Zustand
   └── Failure → Show error message

3. Form Submission
   ├── submitFormData() called from interview creation
   ├── FormData created with file + JSON data
   └── Single API call to /interview/create

4. Backend Processing
   ├── File received in multipart form
   ├── Content type validation (with parameter handling)
   ├── Upload to MinIO
   └── Interview record created with file reference
```

---

## 🎯 Best Practices Implemented

### **Error Handling**
- ✅ Comprehensive file type validation
- ✅ User-friendly error messages
- ✅ Automatic error clearing (3-second timeout)
- ✅ Graceful fallback for drag & drop failures

### **State Management**
- ✅ Single source of truth (Zustand store)
- ✅ Immediate state updates on file selection
- ✅ Proper cleanup on file removal
- ✅ Type-safe state interfaces

### **Performance**
- ✅ Lazy file upload (only on form submission)
- ✅ Minimal re-renders with useCallback
- ✅ Efficient drag & drop event handling
- ✅ No unnecessary API calls

### **Accessibility**
- ✅ Keyboard navigation support
- ✅ Screen reader friendly
- ✅ Focus management
- ✅ ARIA labels where needed

---

## 📝 Configuration

### **Environment Variables**
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/
```

### **File Type Support**
```typescript
const ALLOWED_TYPES = [
  "application/pdf",                    // PDF files
  "application/msword",                 // DOC files  
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document" // DOCX files
];
```

---

## 🚀 Future Enhancements

### **Potential Improvements**
1. **File Preview** - Show PDF preview before upload
2. **Progress Indicator** - Upload progress for large files
3. **Multiple Files** - Support multiple resume versions
4. **Compress Images** - Auto-compress if needed
5. **Cloud Storage** - Direct upload to cloud storage

### **Error Monitoring**
1. **Analytics Integration** - Track upload success/failure rates
2. **Error Reporting** - Automated error reporting for failed uploads
3. **Performance Metrics** - Monitor upload times and success rates

---

## 🔗 Related Files

### **Frontend Files Modified**
- `src/components/home/resume.tsx` - Main file upload component
- `src/store/formDataStore.ts` - State management with file handling
- ~~`src/actions/fileUpload.ts`~~ - **REMOVED** (Approach 1)

### **Dependencies Used**
- `framer-motion` - Animations for drag & drop
- `lucide-react` - Icons (FileUp, FileText, AlertCircle, etc.)
- `zustand` - State management
- `next-auth` - Session management (removed from resume component)

---

*Last Updated: September 12, 2025*  
*Status: ✅ Implemented and Testing Complete*