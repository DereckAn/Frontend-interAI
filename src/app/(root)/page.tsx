import { ButtonStart } from "@/src/components/home/buttonStart";
import { DifficultySelector } from "@/src/components/home/difficulties";
import { JobDescription } from "@/src/components/home/jobDescription";
import { LanguageSelector } from "@/src/components/home/languages";
import { ResumeUpload } from "@/src/components/home/resume";
import { TopiCards } from "@/src/components/home/topics";

export default function Home() {
  return (
    <>
      {/* <div className="container mx-auto px-4"> */}
      <TopiCards />
      {/* Grid layout para los componentes principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Columna izquierda */}
        <div className="space-y-6">
          <ResumeUpload />
          <JobDescription />
        </div>

        {/* Columna derecha */}
        <div className="space-y-6">
          <DifficultySelector />
          <LanguageSelector />
        </div>
      </div>
      <ButtonStart />
      {/* </div> */}
    </>
  );
}
