// app/Providers.jsx
"use client";

import { SWRConfig } from "swr";
import { ThemeProvider } from "./ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { fetcher } from "@/lib/api";

export default function Providers({ children }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </SWRConfig>
  );
}
