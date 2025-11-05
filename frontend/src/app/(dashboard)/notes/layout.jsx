"use client";
import { useState, useEffect } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import NoteList from "../NoteList";
import NotesContext from "./NotesContext"; 
import { v4 as uuidv4 } from "uuid"; 
import { useRouter } from "next/navigation"; 
import { toast } from "sonner"; 

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

  useEffect(() => {
    setAllNotes(getNotes());
  }, []);

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
      <ResizablePanelGroup direction="horizontal" className="w-full h-full">
        <ResizablePanel defaultSize={20} minSize={15}>
          <NoteList />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={76}>{children}</ResizablePanel>
      </ResizablePanelGroup>
    </NotesContext.Provider>
  );
}
