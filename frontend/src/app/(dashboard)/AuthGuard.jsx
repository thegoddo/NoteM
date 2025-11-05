// app/(dashboard)/AuthGuard.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return !!localStorage.getItem("authToken");
    } catch {
      return false;
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      if (pathname !== "/login" && pathname !== "/register") {
        router.replace("/login");
      }
    }
  }, [pathname, router]); 

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  if (pathname === "/login" || pathname === "/register") {
    return <>{children}</>;
  }

  return null;
}
