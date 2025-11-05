"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { FilePlus } from "lucide-react";
import EditorPane from "./EditorPane";
import ToolBox from "./ToolBox";
import NoteList from "./NoteList";
import IconSidebar from "./IconSidebar";

const initialNotes = [
  { id: "1", title: "Welcome", content: "# Hello, World!" },
  { id: "2", title: "Groceries", content: "* Milk\n* Eggs\n* Bread" },
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

  const handleNewNote = () => {
    const newNote = {
      id: uuidv4(),
      title: "Untitled Note",
      content: "...",
    };
    const updatedNotes = [newNote, ...allNotes];
    setAllNotes(updatedNotes);
    setSelectedNoteId(newNote.id);
  };

  const handleSelectNote = (id) => {
    setSelectedNoteId(id);
  };

  const handleUpdateNoteTitle = (id, newTitle) => {
    setAllNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === id ? { ...note, title: newTitle } : note
      )
    );
  };

  if (!selectedNote) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h1 className="text-2xl font-semibold">No notes.</h1>
        <Button onClick={handleNewNote}>
          <FilePlus className="h-4 w-4 mr-2" />
          Create a new note
        </Button>
      </div>
    );
  }

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full h-screen rounded-lg border"
    >
      <ResizablePanel defaultSize={4} minSize={4} maxSize={4}>
        <IconSidebar />
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={20} minSize={15}>
        <NoteList
          allNotes={allNotes}
          selectedNoteId={selectedNoteId}
          onSelectNote={handleSelectNote}
          onNewNote={handleNewNote}
          onUpdateNoteTitle={handleUpdateNoteTitle}
        />
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
