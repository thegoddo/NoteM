// app/(dashboard)/notes/[noteId]/page.jsx
"use client";
import { useState, useRef, useEffect, use } from "react"; // 1. Make sure 'use' is imported
import { motion } from "framer-motion";
import EditorPane from "../../EditorPane";
import ToolBox from "../../ToolBox";
import { toast } from "sonner";
import { useNotes } from "../NotesContext";

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

export default function NotePage({ params }) {
  // 2. This is the fix: Unwrap the 'params' Promise.
  // This MUST be at the top level.
  const resolvedParams = use(params);

  // Now, we use 'resolvedParams' everywhere
  const { allNotes, handleUpdateNote } = useNotes();

  const [note, setNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // This effect finds the note and sets it.
  useEffect(() => {
    // 3. Use 'resolvedParams' here
    const foundNote = allNotes.find((n) => n.id === resolvedParams.noteId);
    setNote(foundNote);
  }, [resolvedParams, allNotes]); // 4. Use 'resolvedParams' in the dependency array

  // This effect resets the page to "Read Mode"
  useEffect(() => {
    setIsEditing(false);
  }, [resolvedParams]); // 5. Use 'resolvedParams' here too

  const handleNoteChange = (newContent) => {
    if (note) {
      // 6. Use 'resolvedParams' in handlers
      handleUpdateNote({ ...note, content: newContent });
    }
  };

  const handleSave = () => {
    toast.success("Note saved!");
  };

  if (!note) {
    return <div>Loading note...</div>;
  }

  const noteContent = note.content;

  return (
    <div className="flex flex-col h-full">
      <ToolBox
        content={noteContent}
        onContentChange={handleNoteChange}
        onSave={handleSave}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
      <motion.div
        key={note.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex-1"
      >
        <EditorPane
          content={noteContent}
          onContentChange={handleNoteChange}
          isEditing={isEditing}
        />
      </motion.div>
    </div>
  );
}
