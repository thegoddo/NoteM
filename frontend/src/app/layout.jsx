import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./ThemeProvider";
import { Toaster } from "sonner";
import { SWRConfig } from "swr/dist/_internal";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Notes App",
  description: "A notes app built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SWRConfig value={{ fetcher }}>
          {" "}
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
      </body>
    </html>
  );
}
