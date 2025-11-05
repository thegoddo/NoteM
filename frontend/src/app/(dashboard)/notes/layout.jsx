"use client";
import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import NoteList from "../NoteList"; 

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
  const [allNotes, setAllNotes] = useState(getNotes);


  return (
    <ResizablePanelGroup direction="horizontal" className="w-full h-full">
      <ResizablePanel defaultSize={20} minSize={15}>
        <NoteList allNotes={allNotes} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={76}>
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
