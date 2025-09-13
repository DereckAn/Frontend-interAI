import { Imprimir } from "@/src/actions/imprimir";
import { create } from "zustand";
import { setInfo } from "../actions/sentInfo";

interface FormDataState {

  userId: string | null;

  // Resume data
  resumeFile: File | null;

  // Job description data
  jobDescription: string;

  // Difficulty data
  difficultyLevel: DifficultyLevel;
  yearsOfExperience: number;

  // Programming language data
  programmingLanguage: string | null;

  // Topic data
  selectedTopic: string | null;

  // Actions
  setUserId: (userId: string) => void;
  setResumeFile: (file: File | null) => void;
  setJobDescription: (description: string) => void;
  setDifficultyLevel: (level: DifficultyLevel, years: number) => void;
  setProgrammingLanguage: (language: string | null) => void;
  setSelectedTopic: (topic: string | null) => void;
  resetFormData: () => void;

  // API submission
  isSubmitting: boolean;
  submitFormData: () => Promise<void>;
}

const initialState = {
  userId: null,
  resumeFile: null,
  jobDescription: "",
  difficultyLevel: "Mid-Level" as DifficultyLevel,
  yearsOfExperience: 3,
  programmingLanguage: null,
  selectedTopic: null,
  isSubmitting: false,
};

export const useFormDataStore = create<FormDataState>((set, get) => ({
  ...initialState,

  setUserId: (userId) => set({ userId }), // Add this line to set the userId in the store

  setResumeFile: (file) => set({ resumeFile: file }),

  setJobDescription: (description) => set({ jobDescription: description }),

  setDifficultyLevel: (level, years) =>
    set({
      difficultyLevel: level,
      yearsOfExperience: years,
    }),

  setProgrammingLanguage: (language) => set({ programmingLanguage: language }),

  setSelectedTopic: (topic) => set({ selectedTopic: topic }),

  resetFormData: () => set(initialState),

  isSubmitting: false,

  submitFormData: async () => {
    set({ isSubmitting: true });

    try {
      const state = get();

      // First, fetch topics and languages to map names to IDs
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
      const selectedTopicObj = topics.find((topic: any) => topic.id === state.selectedTopic);
      const selectedLanguageObj = languages.find((lang: any) => lang.id === state.programmingLanguage);

      if (!selectedTopicObj) {
        throw new Error(`Topic "${state.selectedTopic}" not found`);
      }
      if (!selectedLanguageObj) {
        throw new Error(`Language "${state.programmingLanguage}" not found`);
      }

      // Prepare form data for API call
      const formData = new FormData();

      // Add resume file if exists
      if (state.resumeFile) {
        formData.append("resume", state.resumeFile);
      }

      // Add other data as JSON with correct field names expected by backend
      const jsonData = {
        userId: state.userId,
        jobDescription: state.jobDescription,
        difficultyLevel: state.difficultyLevel,
        yearsOfExperience: state.yearsOfExperience,
        programmingLanguageId: selectedLanguageObj.id,
        selectedTopicId: selectedTopicObj.id,
      };

      console.log("Form data being sent:", jsonData);
      Imprimir(jsonData);
      setInfo("data sent");

      formData.append("data", JSON.stringify(jsonData));

      // Send to API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/interview/create`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to submit form data: ${response.status} - ${errorText}`);
      }

      // Handle successful submission
      const result = await response.json();
      console.log("Form submitted successfully:", result);

      // You could return the result or store it in the state if needed
      return result;
    } catch (error) {
      console.error("Error submitting form data:", error);
      // Re-throw the error so the button component can handle it
      throw error;
    } finally {
      set({ isSubmitting: false });
    }
  },
}));
