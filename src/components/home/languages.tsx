// Convertir a un patrón de Server Component con Client Component anidado
import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import { LanguageSelectorClient } from "./languageSelectorClient";

// Definir la interfaz para los lenguajes que vienen del API
interface Language {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// Función para obtener los lenguajes (ejecutada en el servidor)
async function getLanguages(): Promise<Language[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/languages`, {
    cache: "no-store", // o { next: { revalidate: 3600 } } para revalidar cada hora
  });

  if (!response.ok) {
    throw new Error(`Error fetching languages: ${response.status}`);
  }

  return response.json();
}

export const LanguageSelector = async () => {
  // Obtener los lenguajes en el servidor
  const languages = await getLanguages();

  return (
    <section className="w-full my-8">
      <h2
        className="text-xl sm:text-2xl font-semibold mb-4"
        style={{ fontFamily: "var(--font-bodoni)" }}
      >
        Programming Language
      </h2>

      <Suspense
        fallback={
          <div className="border-2 border-gray2/20 rounded-xl p-6 flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 text-gray2/50 animate-spin" />
            <span className="ml-3 text-gray2/70">Loading languages...</span>
          </div>
        }
      >
        <LanguageSelectorClient languages={languages} />
      </Suspense>
    </section>
  );
};
