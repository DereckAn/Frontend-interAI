import { Brain } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-pinko shadow-sm mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-start justify-start space-x-3">
      <Brain className="w-8 h-8 text-borde" />
      <h1 className="text-2xl font-bold text-borde">
        AI Interview Simulator
      </h1>
    </header>
  );
};
