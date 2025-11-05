"use client";
import { usePathname } from "next/navigation";
import IconSidebar from "./IconSidebar";
import { motion } from "framer-motion";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  return (
    <div className="flex h-screen">
      <div className="w-14">
        <IconSidebar />
      </div>

      <div className="flex-1 border-l">
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
  );
}
