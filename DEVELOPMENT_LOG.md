# Frontend-interAI - Development Log

## Project Overview
Frontend for InterviewAI platform built with **Next.js 15**, **React 19**, **TypeScript**, **NextAuth.js**, and **Zustand**.

---

## Session Log: Frontend-Backend Integration Fix (August 18, 2025)

### 🔍 Initial Problem
**Issue**: Form submission button not working - appeared to do nothing when clicked.

**User Experience**:
- Fill out interview form (job description, difficulty, language, topic, resume)
- Click "Start Interview" button
- Button shows loading state briefly
- No navigation to interview page
- No data visible in backend database
- No error messages shown

### 🚀 Investigation Process

#### 1. **Button Component Analysis**
**File**: `src/components/home/buttonStart.tsx`

**Found**: Button correctly implemented with:
- ✅ Loading states
- ✅ Form validation
- ✅ Zustand store integration
- ✅ NextAuth session handling

**Key validation checks**:
```typescript
if (!difficultyLevel) {
  alert("Please add a difficulty level");
  return;
}
if (!programmingLanguage) {
  alert("Please add a programming language");
  return;
}
if (!selectedTopic) {
  alert("Please add a topic");
  return;
}
```

#### 2. **State Management Analysis**
**File**: `src/store/formDataStore.ts`

**Found**: Zustand store properly configured with:
- ✅ Form data storage
- ✅ File upload handling
- ✅ API submission logic
- ❌ **Critical Issue**: Data format mismatch with backend

**Original problematic implementation**:
```typescript
const jsonData = {
  userId: state.userId,
  jobDescription: state.jobDescription,
  difficultyLevel: state.difficultyLevel,
  yearsOfExperience: state.yearsOfExperience,
  programmingLanguage: state.programmingLanguage, // ❌ "JavaScript" (string)
  selectedTopic: state.selectedTopic, // ❌ "Backend" (string)
};

// Backend expects:
// programmingLanguageId: "uuid-string" 
// selectedTopicId: "uuid-string"
```

#### 3. **API Configuration Analysis**
**File**: `.env`


#### 4. **Data Flow Analysis**

**Form Components** → **Zustand Store** → **API Call** → **Backend**

1. **Difficulty Selector** (`src/components/home/difficulties.tsx`):
   ```typescript
   const difficultyOptions: DifficultyOption[] = [
     { value: 'Junior', label: 'Junior' },
     { value: 'Mid-Level', label: 'Mid-Level' },
     { value: 'Senior', label: 'Senior' },
   ];
   ```

2. **Topic/Language Selection**: Storing display names instead of IDs

3. **Data Submission**: Sending names to backend expecting UUIDs

---

### 🔧 Solutions Implemented

#### 1. **Fixed API Data Mapping**
**File**: `src/store/formDataStore.ts`

**Problem**: Frontend sending names, backend expecting UUIDs.

**Solution**: Added dynamic ID resolution before submission:

```typescript
submitFormData: async () => {
  set({ isSubmitting: true });

  try {
    const state = get();

    // NEW: Fetch topics and languages to map names to IDs
    const [topicsResponse, languagesResponse] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/languages`)
    ]);

    if (!topicsResponse.ok || !languagesResponse.ok) {
      throw new Error("Failed to fetch topics or languages");
    }

    const topics = await topicsResponse.json();
    const languages = await languagesResponse.json();

    // Find the IDs for the selected topic and language
    const selectedTopicObj = topics.find((topic: any) => topic.name === state.selectedTopic);
    const selectedLanguageObj = languages.find((lang: any) => lang.name === state.programmingLanguage);

    if (!selectedTopicObj) {
      throw new Error(`Topic "${state.selectedTopic}" not found`);
    }
    if (!selectedLanguageObj) {
      throw new Error(`Language "${state.programmingLanguage}" not found`);
    }

    // Prepare form data with correct field names
    const jsonData = {
      userId: state.userId,
      jobDescription: state.jobDescription,
      difficultyLevel: state.difficultyLevel,
      yearsOfExperience: state.yearsOfExperience,
      programmingLanguageId: selectedLanguageObj.id, // ✅ UUID
      selectedTopicId: selectedTopicObj.id, // ✅ UUID
    };

    // ... rest of submission logic
  } catch (error) {
    console.error("Error submitting form data:", error);
    throw error; // Re-throw for button component to handle
  }
}
```

#### 2. **Enhanced Error Handling**
**File**: `src/components/home/buttonStart.tsx`

**Added better error display**:
```typescript
} catch (error) {
  console.error("Error starting interview:", error);
  alert(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
  setIsLoading(false);
}
```

#### 3. **User Session Validation**
**Added UUID format validation**:
```typescript
// Validate userId format - if it's not a UUID, handle OAuth users
const isValidUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(state.userId || '');

if (!isValidUUID) {
  throw new Error("Invalid user session. Please log out and log in again with credentials.");
}
```

---

### 🧩 Component Architecture

#### **Form Flow Components**:

1. **`buttonStart.tsx`** - Main submission button
   - Validates required fields
   - Triggers form submission
   - Handles navigation on success

2. **`difficulties.tsx`** - Difficulty selection
   - Maps to backend enum values ("Junior", "Mid-Level", "Senior")
   - Includes years of experience slider

3. **`topics.tsx`** - Topic selection component
4. **`languages.tsx`** - Programming language selection
5. **`resume.tsx`** - File upload component

#### **State Management**:

**Zustand Store** (`src/store/formDataStore.ts`):
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
  setUserId: (userId: string) => void;
  setResumeFile: (file: File | null) => void;
  setJobDescription: (description: string) => void;
  setDifficultyLevel: (level: DifficultyLevel, years: number) => void;
  setProgrammingLanguage: (language: string | null) => void;
  setSelectedTopic: (topic: string | null) => void;
  
  // API
  submitFormData: () => Promise<void>;
  isSubmitting: boolean;
}
```

---

### 🔐 Authentication Integration

**NextAuth Configuration** (`src/auth.ts`):
- ✅ Google OAuth
- ✅ GitHub OAuth (configured but no secrets)
- ✅ Credentials provider with backend integration

**Session Management**:
```typescript
// Session callback fetches user data from backend
async session({ session, token }) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "api/auth/me",
    {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: token.jwtToken ? `Bearer ${token.jwtToken}` : "",
      },
    }
  );
  
  const userData = await response.json();
  session.user = {
    id: token.id as string,
    email: token.email as string,
    name: userData.name,
    role: userData.role,
    jwtToken: token.jwtToken,
  };
  return session;
}
```

---

### 📝 Form Validation & Types

**TypeScript Definitions** (`src/types/interfaces.ts`):
```typescript
type DifficultyLevel = "Junior" | "Mid-Level" | "Senior";

interface DifficultyOption {
  value: DifficultyLevel;
  label: string;
  icon: React.ReactNode;
  description: string;
  yearsRange: [number, number];
}
```

**Validation Schema** (`src/schema/index.ts`):
- Login/Register forms use Zod validation
- Form data validation done in components

---

### 🎨 UI/UX Components

**Design System**:
- **Shadcn/ui** components
- **Tailwind CSS v4** with custom design system
- **Framer Motion** for animations
- **Custom color palette** with theme switching

**Key UI Components**:
1. **Button** - Loading states, variants
2. **Slider** - Years of experience selection
3. **Card** - Difficulty option display
4. **Upload** - Resume file handling

---

### 🧪 Testing & Debugging

#### **Test Scenarios**:

1. **Complete Form Flow**:
   - ✅ User login with credentials (`dereck@example.com`)
   - ✅ Fill job description
   - ✅ Select difficulty (Junior/Senior working, Mid-Level fixed)
   - ✅ Choose programming language
   - ✅ Select topic
   - ✅ Upload resume file
   - ✅ Click "Start Interview"

2. **Edge Cases**:
   - ❌ OAuth users (UUID format issues)
   - ⚠️ File upload without MinIO properly configured
   - ✅ Missing required fields (proper validation)

#### **Debug Tools Added**:
```typescript
// Enhanced logging
console.log("Form data being sent:", jsonData);
Imprimir(jsonData); // Custom debug action
setInfo("data sent"); // Status tracking

// Better error messages
throw new Error(`Failed to submit form data: ${response.status} - ${errorText}`);
```

---

### 📊 API Integration

**Endpoints Used**:
- `GET /topics` - Fetch available topics
- `GET /languages` - Fetch programming languages  
- `POST /interview/create` - Submit interview request
- `POST /api/auth/login` - User authentication
- `GET /api/auth/me` - Get current user data

**Data Flow**:
```
Frontend Form → Zustand Store → API Mapping → Backend Endpoint → Database
```

---

### 🗃️ Project Configuration

**Key Configuration Files**:

1. **`next.config.ts`** - Next.js configuration
2. **`package.json`** - Dependencies (uses Bun)
3. **`tsconfig.json`** - TypeScript settings
4. **`tailwind.config.js`** - Custom design system
5. **`.env`** - Environment variables

**Important Dependencies**:
```json
{
  "next": "^15.0.0",
  "react": "^19.0.0",
  "next-auth": "5.0.0-beta.4",
  "zustand": "^4.4.7",
  "framer-motion": "^11.0.0",
  "react-hook-form": "^7.48.2",
  "zod": "^3.22.4"
}
```

---

### 📁 Files Modified

**Core Fixes**:
1. `src/store/formDataStore.ts` - Fixed API data mapping
2. `src/components/home/buttonStart.tsx` - Enhanced error handling

**Configuration**:
- `.env` - API endpoint configuration verified

---

### 🎯 Current Status

**✅ Working Features**:
- Complete form submission flow
- Data validation and error handling
- User authentication with credentials
- Dynamic topic/language lookup
- File upload preparation (frontend side)
- Navigation flow

**⚠️ Known Issues**:
1. **OAuth Users**: Session IDs not in UUID format for backend
2. **File Upload**: MinIO credentials issue on backend affects file uploads
3. **Mid-Level Difficulty**: Required backend fix for proper handling

---

### 🚀 Next Steps

1. **Add OAuth user handling** - Create users in backend for OAuth providers
2. **Improve error UX** - Replace alerts with proper toast notifications
3. **Add form progress indication** - Multi-step form with progress bar
4. **Implement form persistence** - Save draft data locally
5. **Add loading skeletons** - Better UX during data fetching

---

### 🎨 UI/UX Improvements Made

1. **Loading States**: Button shows spinner during submission
2. **Error Handling**: Clear error messages for users
3. **Form Validation**: Prevents submission with missing data
4. **Responsive Design**: Works on mobile and desktop
5. **Animation**: Smooth transitions with Framer Motion

---

### 💡 Lessons Learned

1. **API Contract Matching**: Always verify frontend data format matches backend expectations
2. **Error Handling**: Proper error propagation from store to components essential
3. **Type Safety**: TypeScript helps catch data format mismatches early
4. **State Management**: Zustand provides clean, simple state management
5. **Dynamic Data Fetching**: Fetching reference data at runtime provides flexibility
6. **User Experience**: Loading states and error feedback crucial for good UX

---

### 🔍 Debugging Tips for Future

1. **Check Network Tab**: Verify actual API calls being made
2. **Console Logging**: Add extensive logging during development
3. **Type Checking**: Use TypeScript strict mode to catch issues
4. **Backend Logs**: Always check both frontend and backend logs
5. **Data Format Verification**: Test with actual backend data

---

*Last updated: August 18, 2025*