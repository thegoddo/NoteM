"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun, FileText, User, Search, LogOut } from "lucide-react";
import { useState, useEffect } from "react"; // 1. Import hooks

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false); // 2. Add mounted state

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button variant="ghost" size="icon" className="h-6 w-6" />;
  }

  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-6 w-6"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export default function IconSidebar() {
  return (
    <div className="p-2 pt-4 flex flex-col items-center gap-6 bg-gray-50 dark:bg-gray-800">
      <User className="h-6 w-6" />
      <FileText className="h-6 w-6" />
      <Search className="h-6 w-6" />
      <ThemeToggle />
      <div className="flex-1"></div>
      <LogOut className="h-6 w-6" />
    </div>
  );
}