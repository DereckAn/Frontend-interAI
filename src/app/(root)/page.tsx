import { DifficultySelector } from "@/components/home/difficulties";
import { JobDescription } from "@/components/home/jobDescription";
import { LanguageSelector } from "@/components/home/languages";
import { ResumeUpload } from "@/components/home/resume";
import { TopiCards } from "@/components/home/topics";

export default function Home() {
  return (
    <>
      <TopiCards />
      {/* <div className="flex flex-col md:flex-row"> */}
      <ResumeUpload />
      <JobDescription />
      <DifficultySelector />
      <LanguageSelector />
      {/* </div> */}
      {/* <Hero /> */}
    </>
  );
}
