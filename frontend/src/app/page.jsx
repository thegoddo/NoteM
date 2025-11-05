"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import EditorPane from "./EditorPane";
import { FileText, LogOut, Moon, Search, User } from "lucide-react";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import ToolBox from "./ToolBox";
const initialNotes = [
  {
    id: 1,
    title: "Welcome",
    content: "# Hello, World!",
  },
  {
    id: 2,
    title: "Groceries",
    content: "* Milk\n* Eggs\n* Bread",
  },
];

export default function Home() {
  const [allNotes, setAllNotes] = useState(() => {
    if (typeof window !== "undefined") {
      const savedNotes = localStorage.getItem("my-notes");
      if (savedNotes) return JSON.parse(savedNotes);
    }
    return initialNotes;
  });

  const [selectedNoteId, setSelectedNoteId] = useState(
    (allNotes[0] && allNotes[0].id) || null
  );

  const editorRef = useRef(null);

  const selectedNote = allNotes.find((note) => note.id === selectedNoteId);

  const handleNoteChange = (newContent) => {
    setAllNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === selectedNoteId ? { ...note, content: newContent } : note
      )
    );
  };

  if (!selectedNote) {
    return (
      <div className="flex items-center justify-center h-screen">No notes.</div>
    );
  }

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full h-screen rounded-lg border"
    >
      <ResizablePanel
        defaultSize={4}
        minSize={4}
        maxSize={4}
        className="p-2 pt-4 flex flex-col items-center gap-6 bg-gray-50"
      >
        <User className="h-6 w-6" />
        <FileText className="h-6 w-6" />
        <Search className="h-6 w-6" />
        <Moon className="h-6 w-6" />

        <div className="flex-1"></div>
        <LogOut className="h-6 w-6" />
      </ResizablePanel>
      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={20} minSize={15}>
        <div className="p-4">
          <h2 className="font-bold text-lg">My List of Saved Notes</h2>
          <div className="flex flex-col gap-2">
            {allNotes.map((note) => (
              <button
                key={note.id}
                className={`p-2 rounded text-left ${
                  note.id === selectedNoteId ? "bg-gray-200" : ""
                }`}
                onClick={() => setSelectedNoteId(note.id)}
              >
                {note.title}
              </button>
            ))}
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={76}>
        <div className="flex flex-col h-full">
          <ToolBox
            editorRef={editorRef}
            content={selectedNote.content}
            onContentChange={handleNoteChange}
            allNotes={allNotes}
          />

          <motion.div
            key={selectedNote.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <EditorPane
              ref={editorRef}
              content={selectedNote.content}
              onContentChange={handleNoteChange}
            />
          </motion.div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
