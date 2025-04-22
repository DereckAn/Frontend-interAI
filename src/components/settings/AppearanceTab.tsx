"use client";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function AppearanceTab() {
  const { theme, setTheme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize the appearance of the application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Theme</h3>
            <div className="flex flex-wrap gap-4">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                className="flex items-center gap-2"
                onClick={() => setTheme("light")}
              >
                <Sun className="h-4 w-4" />
                Light
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                className="flex items-center gap-2"
                onClick={() => setTheme("dark")}
              >
                <Moon className="h-4 w-4" />
                Dark
              </Button>
              <Button
                variant={theme === "system" ? "default" : "outline"}
                className="flex items-center gap-2"
                onClick={() => setTheme("system")}
              >
                System
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
