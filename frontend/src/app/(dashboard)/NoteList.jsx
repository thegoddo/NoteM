// app/(dashboard)/NoteList.jsx
"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FilePlus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useSWRConfig } from "swr"; // 1. Import SWRConfig
import { api } from "@/lib/api"; // 2. Import our Axios instance
import { toast } from "sonner";

export default function NoteList({ allNotes }) {
  const pathname = usePathname();
  const router = useRouter();
  const { mutate } = useSWRConfig(); // 3. Get the 'mutate' function

  const [editingNoteId, setEditingNoteId] = useState(null);
  const [tempTitle, setTempTitle] = useState("");

  const handleNewNote = async () => {
    try {
      // 4. Call the API using Axios
      const newNote = await api.post("/api/notes");
      // 5. Tell SWR to re-fetch the list
      mutate("/api/notes");
      toast.success("New note created!");
      // 6. Navigate to the new note
      router.push(`/notes/${newNote.data.id}`);
    } catch (err) {
      toast.error("Failed to create note.");
    }
  };

  const handleSaveEdit = async () => {
    try {
      await api.put(`/api/notes/${editingNoteId}`, { title: tempTitle });
      mutate("/api/notes"); // Re-fetch the list
      setEditingNoteId(null);
    } catch (err) {
      toast.error("Failed to rename note.");
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await api.delete(`/api/notes/${id}`);
      mutate("/api/notes"); // Re-fetch the list
      toast.error("Note deleted.");
      router.push("/notes");
    } catch (err) {
      toast.error("Failed to delete note.");
    }
  };
  
  // ... (handleStartEditing is unchanged)

  // ... (JSX is unchanged, it just receives 'allNotes' prop)
  return ( ... );
}