// app/(dashboard)/notes/layout.jsx
"use client";
import { useState, useEffect } from "react";
import NoteList from "../NoteList";
import NotesContext from "./NotesContext";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
    router.push(`/notes/${newNote.id}`);
  };

  const handleDeleteNote = (id) => {
    setAllNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    toast.error("Note deleted");
    router.push("/notes");
  };

  const handleUpdateNote = (updatedNote) => {
    setAllNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  return (
    <NotesContext.Provider
      value={{ allNotes, handleNewNote, handleDeleteNote, handleUpdateNote }}
    >
      <div className="flex h-full">
        <div className="w-[280px]">
          <NoteList />
        </div>

        <div className="flex-1 border-l">
          {children} 
        </div>
      </div>
    </NotesContext.Provider>
  );
}
