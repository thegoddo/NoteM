// app/(dashboard)/notes/layout.jsx
"use client";
import { useState, useEffect } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import NoteList from "../NoteList";
import NotesContext from "./NotesContext"; // 1. Import context
import { v4 as uuidv4 } from "uuid"; // 2. Import uuid
import { useRouter } from "next/navigation"; // 3. Import router
import { toast } from "sonner"; // 4. Import toast

// Helper function to get notes
function getNotes() {
  if (typeof window !== "undefined") {
    const savedNotes = localStorage.getItem("my-notes");
    if (savedNotes) return JSON.parse(savedNotes);
  }
  return [
    { id: "1", title: "Welcome", content: "# Hello, World!" },
    { id: "2", title: "Groceries", content: "* Milk\n* Eggs\n* Bread" },
  ];
}

export default function NotesLayout({ children }) {
  const [allNotes, setAllNotes] = useState([]);
  const router = useRouter();

  // Load notes on mount
  useEffect(() => {
    setAllNotes(getNotes());
  }, []);

  // Save notes whenever they change
  useEffect(() => {
    // Don't save an empty array on first load
    if (allNotes.length > 0) {
      localStorage.setItem("my-notes", JSON.stringify(allNotes));
    }
  }, [allNotes]);

  const handleNewNote = () => {
    const newNote = {
      id: uuidv4(),
      title: "Untitled Note",
      content: "...",
    };
    setAllNotes((prevNotes) => [newNote, ...prevNotes]);
    toast.success("New note created!");
    router.push(`/notes/${newNote.id}`); // Navigate to the new note
  };

  const handleDeleteNote = (id) => {
    setAllNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    toast.error("Note deleted");
    router.push("/notes"); // Navigate back to the default page
  };

  // A function to update a note (used by the editor)
  const handleUpdateNote = (updatedNote) => {
    setAllNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  return (
    // 5. Wrap layout in the provider
    <NotesContext.Provider
      value={{ allNotes, handleNewNote, handleDeleteNote, handleUpdateNote }}
    >
      <ResizablePanelGroup direction="horizontal" className="w-full h-full">
        <ResizablePanel defaultSize={20} minSize={15}>
          {/* 6. NoteList doesn't need props now */}
          <NoteList />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={76}>{children}</ResizablePanel>
      </ResizablePanelGroup>
    </NotesContext.Provider>
  );
}
