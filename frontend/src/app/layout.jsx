import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Notes App",
  description: "A notes app built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
