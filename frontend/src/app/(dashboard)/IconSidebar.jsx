"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun, FileText, User, Search, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
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
function SidebarButton({ icon: Icon, label, href }) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <Link href={href}>
      <Button
        variant={isActive ? "secondary" : "ghost"}
        size="icon"
        className="h-6 w-6"
      >
        <Icon className="h-6 w-6" />
        <span className="sr-only">{label}</span>
      </Button>
    </Link>
  );
}
export default function IconSidebar() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("authToken");

    toast.info("You have been logged out.");
    router.push("/login");
  };

  return (
    <div className="p-2 pt-4 flex flex-col items-center gap-6 bg-gray-50 dark:bg-gray-800 h-full">
      <SidebarButton icon={User} label="Profile" href="/profile" />
      <SidebarButton icon={FileText} label="My Notes" href="/notes" />
      <SidebarButton icon={Search} label="Search" href="/search" />{" "}
      <ThemeToggle />
      <div className="flex-1"></div>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        onClick={handleLogout}
      >
        <LogOut className="h-6 w-6" />
      </Button>
    </div>
  );
}
