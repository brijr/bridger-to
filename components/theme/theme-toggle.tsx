"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.add("theme-switching");
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    window.setTimeout(() => {
      root.classList.remove("theme-switching");
    }, 0);
  };

  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} mode`}
      className={className}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 opacity-100 blur-0 transition-[transform,opacity,filter] duration-200 ease-out dark:-rotate-90 dark:scale-[0.25] dark:opacity-0 dark:blur-[4px]" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-[0.25] opacity-0 blur-[4px] transition-[transform,opacity,filter] duration-200 ease-out dark:rotate-0 dark:scale-100 dark:opacity-100 dark:blur-0" />
      <span className="sr-only">Switch to {nextTheme} mode</span>
    </Button>
  );
}
