"use client";
import { useState, useEffect, startTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import IconSidebar from "./IconSidebar";
import { motion } from "framer-motion";
import AuthGuard from "./AuthGuard"; 
import NotesContext from "./notes/NotesContext";
import useSWR, { useSWRConfig } from "swr";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { api } from "@/lib/api"; 
import { Loader2 } from "lucide-react";

function getNotesFromStorage() {
  if (typeof window !== "undefined") {
    const savedNotes = localStorage.getItem("my-notes");
    if (savedNotes) return JSON.parse(savedNotes);
  }
  return []; 
}

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { mutate } = useSWRConfig(); 

  const [allNotes, setAllNotes] = useState(getNotesFromStorage);
  const { data: notesData, error } = useSWR("/api/notes");
  const { data: userData } = useSWR("/api/users/me");

  useEffect(() => {
    if (notesData) {
      startTransition(() => {
        setAllNotes(notesData);
      });
    }
  }, [notesData]);


  const handleNewNote = async () => {
    try {
      const response = await api.post("/api/notes");
      const newNote = response.data;

      setAllNotes((prevNotes) => [newNote, ...prevNotes]);
      mutate("/api/notes");

      toast.success("New note created!");
      router.push(`/notes/${newNote.id}`);
    } catch (error) {
      toast.error("Failed to create note.");
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await api.delete(`/api/notes/${id}`);

      setAllNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      mutate("/api/notes");

      toast.error("Note deleted");
      router.push("/notes");
    } catch (error) {
      toast.error("Failed to delete note.");
    }
  };

  const handleUpdateNote = (updatedNote) => {
    setAllNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  return (
    <AuthGuard>
      <NotesContext.Provider
        value={{
          allNotes,
          handleNewNote,
          handleDeleteNote,
          handleUpdateNote,
          user: userData,
        }}
      >
        <div className="flex flex-col h-screen">
          <div className="flex flex-1 overflow-hidden">
            <div className="w-14">
              <IconSidebar />
            </div>
            <div className="flex-1 border-l overflow-y-auto">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                {notesData && userData ? (
                  children
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                )}
              </motion.div>
            </div>
          </div>
          <footer className="h-8 border-t p-2 flex items-center justify-between text-xs text-muted-foreground">
            <div>© {new Date().getFullYear()} Note-Taking App.</div>
            <div>Status: OK | Notes: {allNotes.length}</div>
          </footer>
        </div>
      </NotesContext.Provider>
    </AuthGuard>
  );
}
