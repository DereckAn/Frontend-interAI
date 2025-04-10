import { Imprimir } from "@/src/actions/imprimir";
import { create } from "zustand";
import { setInfo } from "../actions/sentInfo";

interface FormDataState {
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
      // Prepare form data for API cal
      const formData = new FormData();
      const state = get();
    //   Imprimir(state);

      // Add resume file if exists
      if (state.resumeFile) {
        formData.append("resume", state.resumeFile);
      }

      // Add other data as JSON
      const jsonData = {
        jobDescription: state.jobDescription,
        difficultyLevel: state.difficultyLevel,
        yearsOfExperience: state.yearsOfExperience,
        programmingLanguage: state.programmingLanguage,
        selectedTopic: state.selectedTopic,
      };
      console.log("Form data:", formData);
      Imprimir(jsonData);
      setInfo("data sent")

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
        throw new Error("Failed to submit form data");
      }

      // Handle successful submission
      const result = await response.json();
      console.log("Form submitted successfully:", result);

      // You could return the result or store it in the state if needed
    } catch (error) {
      console.error("Error submitting form data:", error);
      // Handle error state if needed
    } finally {
      set({ isSubmitting: false });
    }
  },
}));
