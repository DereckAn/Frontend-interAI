import { create } from 'zustand';

interface TopicState {
  selectedTopic: string | null;
  selectTopic: (topic: string) => void;
  clearSelection: () => void;
}

export const useTopicStore = create<TopicState>((set) => ({
  selectedTopic: null,
  selectTopic: (topic) => set({ selectedTopic: topic }),
  clearSelection: () => set({ selectedTopic: null }),
}));