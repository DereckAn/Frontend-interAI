"use client";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function AppearanceTab() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log("Current theme:", theme); // Depuración
  }, [theme]);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    const themeNames = {
      light: "claro",
      dark: "oscuro",
      system: "del sistema",
    };
    toast.success(
      `Tema ${
        themeNames[newTheme as keyof typeof themeNames]
      } aplicado correctamente`
    );
  };

  if (!mounted) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Apariencia</CardTitle>
        <CardDescription>
          Personaliza la apariencia de la aplicación
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Tema</h3>
            <div className="flex flex-wrap gap-4">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                className="flex items-center gap-2"
                onClick={() => handleThemeChange("light")}
              >
                <Sun className="h-4 w-4" />
                Claro
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                className="flex items-center gap-2"
                onClick={() => handleThemeChange("dark")}
              >
                <Moon className="h-4 w-4" />
                Oscuro
              </Button>
              <Button
                variant={theme === "system" ? "default" : "outline"}
                className="flex items-center gap-2"
                onClick={() => handleThemeChange("system")}
              >
                <Monitor className="h-4 w-4" />
                Sistema
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Tu preferencia de tema se guardará automáticamente para futuras
              visitas.
            </p>
          </div>
          {/* Elemento de depuración */}
          <div
            className="mt-4 p-4"
            style={{
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
            }}
          >
            Prueba de tema: {theme}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
