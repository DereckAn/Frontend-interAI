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

type DifficultyLevel = "Junior" | "Mid-Level" | "Senior";
