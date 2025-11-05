// app/(dashboard)/notes/[noteId]/page.jsx
"use client";
import { useState, useRef, useEffect, use } from "react";
import { motion } from "framer-motion";
import EditorPane from "../../EditorPane";
import ToolBox from "../../ToolBox";
import { toast } from "sonner";
import { useNotes } from "../NotesContext";

export default function NotePage({ params }) {
  const resolvedParams = use(params);

  // 2. Get state and handlers from context
  const { allNotes, handleUpdateNote } = useNotes();

  const [note, setNote] = useState(null);
  const [content, setContent] = useState("");
  const editorRef = useRef(null);

  useEffect(() => {
    const foundNote = allNotes.find((n) => n.id === resolvedParams.noteId);
    setNote(foundNote);
    setContent(foundNote ? foundNote.content : "");
  }, [resolvedParams, allNotes]);

  const handleNoteChange = (newContent) => {
    setContent(newContent);
    // When content changes, update the note in the main state
    if (note) {
      handleUpdateNote({ ...note, content: newContent });
    }
  };

  const handleSave = () => {
    // The layout already saves, so we just show a toast
    toast.success("Note saved!");
  };

  if (!note) {
    return;
  }

  return (
    <div className="flex flex-col h-full">
      <ToolBox
        editorRef={editorRef}
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
        <EditorPane
          ref={editorRef}
          content={content}
          onContentChange={handleNoteChange}
        />
      </motion.div>
    </div>
  );
}
