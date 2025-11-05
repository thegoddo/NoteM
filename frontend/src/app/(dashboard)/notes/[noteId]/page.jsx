"use client";
import { useState, useRef, useEffect, use } from "react";
import { motion } from "framer-motion";
import EditorPane from "../../EditorPane";
import ToolBox from "../../ToolBox";
import { toast } from "sonner";
import { useNotes } from "../NotesContext";

export default function NotePage({ params }) {
  const resolvedParams = use(params);
  const { allNotes, handleUpdateNote } = useNotes();

  const [note, setNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const foundNote = allNotes.find((n) => n.id === resolvedParams.noteId);
    setNote(foundNote);
  }, [resolvedParams, allNotes]);

  useEffect(() => {
    setIsEditing(false);
  }, [resolvedParams]);

  const handleNoteChange = (newContent) => {
    if (note) {
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
