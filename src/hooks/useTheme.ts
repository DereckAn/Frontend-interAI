"use client";

import { useState, useEffect } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    } else {
      setIsDark(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark, mounted]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const setTheme = (theme: "light" | "dark" | "system") => {
    if (theme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(prefersDark);
      localStorage.removeItem("theme");
    } else {
      setIsDark(theme === "dark");
    }
  };

  const getCurrentTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (!savedTheme) return "system";
    return savedTheme as "light" | "dark";
  };

  return {
    isDark,
    toggleTheme,
    setTheme,
    theme: mounted ? getCurrentTheme() : "light",
    mounted,
  };
}