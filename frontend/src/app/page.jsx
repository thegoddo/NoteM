"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import EditorPane from "./EditorPane";
import {
  FileText,
  LogOut,
  Moon,
  Search,
  User,
  Bold,
  Italic,
  List,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

// Our dummy data for now
const initialNotes = [
  {
    id: 1,
    title: "Welcome",
    content: "# Hello, World!",
  },
  {
    id: 2,
    title: "Groceries",
    content: "* Milk\n Eggs\n Bread",
  },
];

function ToolBoxButton({ icon: Icon, onClick }) {
  return (
    <Button variant="ghost" size="icon" onClick={onClick}>
      <Icon className="h-4 w-4" />
    </Button>
  );
}

export default function Home() {
  const [allNotes, setAllNotes] = useState(initialNotes);
  const [selectedNoteId, setSelectedNoteId] = useState(initialNotes[0].id);

  const selectedNote = allNotes.find((note) => note.id === selectedNoteId);

  const handleNoteChange = (newContent) => {
    setAllNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === selectedNote ? { ...note, content: newContent } : note
      )
    );
  };

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
          <div className="h-12 border-b flex items-center p-4 font-medium">
            <ToolBoxButton icon={Bold} />
            <ToolBoxButton icon={Italic} />
            <ToolBoxButton icon={List} />
          </div>

          <div className="flex-1">
            <motion.div
              key={selectedNoteId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              <EditorPane
                content={selectedNote.content}
                onContentChange={handleNoteChange}
              />
            </motion.div>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
