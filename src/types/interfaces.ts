interface Topic {
  id: string;
  name: string;
  description?: string; // El "?" indica que es opcional
  createdAt: string;
  updatedAt: string;
}

interface Language {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface DifficultyOption {
  value: DifficultyLevel;
  label: string;
  icon: React.ReactNode;
  description: string;
  yearsRange: [number, number];
}

interface InterviewDto {
  id: string;
  resume: string;
  jobDescription: string;
}

// New interfaces for the Java DTO
interface LanguageDto {
  id: string; // UUID in TypeScript is represented as string
  name: string;
}

interface UserDto {
  id: string;
  // Add other user properties as needed
}

interface CompleteInterviewDto {
  id: string; // UUID in TypeScript is represented as string
  language: LanguageDto;
  startTime: string; // Instant in TypeScript is represented as string (ISO format)
  endTime: string;
  videoUrl: string;
  audioUrl: string;
  status: string;
  user: UserDto;
}

type DifficultyLevel = "Junior" | "MidLevel" | "Senior";
