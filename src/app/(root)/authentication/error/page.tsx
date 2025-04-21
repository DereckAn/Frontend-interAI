import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg border border-red-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3 text-red-500">
          <AlertCircle className="h-7 w-7" />
          <h1 className="text-xl font-semibold">Error de autenticación</h1>
        </div>

        <p className="mt-4 text-gray-600">
          Ha ocurrido un error durante el proceso de autenticación. Esto puede
          deberse a credenciales inválidas o un problema temporal con el
          servicio.
        </p>

        <div className="mt-6 flex justify-end space-x-3">
          <Link
            href="/authentication/login"
            className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Volver al inicio de sesión
          </Link>
        </div>
      </div>
    </main>
  );
}
