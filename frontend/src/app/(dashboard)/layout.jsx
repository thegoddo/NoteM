"use client";
import { usePathname } from "next/navigation";
import IconSidebar from "./IconSidebar";
import { motion } from "framer-motion";
import useSWR from "swr";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const { data: user } = useSWR("/api/user/me");
  return (
    <div className="flex flex-col h-screen">
      {" "}
      <div className="flex flex-1 overflow-hidden">
        <div className="w-14">
          <IconSidebar />
        </div>

        <div className="flex-1 border-l overflow-hidden">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </div>
      </div>
      <footer className="h-8 border-t p-2 flex items-center justify-between text-xs text-muted-foreground">
        <div>© {new Date().getFullYear()} Note-Taking app.</div>
        <div>Status: Ok | Notes: {user ? user.noteCount : "..."}</div>
      </footer>
    </div>
  );
}
