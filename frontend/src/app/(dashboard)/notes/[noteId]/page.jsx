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
  const [content, setContent] = useState("");

  useEffect(() => {
    const foundNote = allNotes.find((n) => n.id === resolvedParams.noteId);
    setNote(foundNote);
    setContent(foundNote ? foundNote.content : "");
  }, [resolvedParams, allNotes]);

  const handleNoteChange = (newContent) => {
    setContent(newContent);
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

  return (
    <div className="flex flex-col h-full">
      <ToolBox
        content={content}
        onContentChange={handleNoteChange}
        onSave={handleSave}
      />
      <motion.div
        key={note.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex-1"
      >
        <EditorPane content={content} onContentChange={handleNoteChange} />
      </motion.div>
    </div>
  );
}
