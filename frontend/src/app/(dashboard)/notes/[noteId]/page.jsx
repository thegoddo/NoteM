"use client";
import { useState, useRef, useEffect, use } from "react";
import { motion } from "framer-motion";
import EditorPane from "../../EditorPane";
import ToolBox from "../../ToolBox";
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

export default function NotePage({ params }) {
  const resolvedParams = use(params);

  const [allNotes, setAllNotes] = useState(getNotes);
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

    const updatedNotes = allNotes.map((n) =>
      n.id === resolvedParams.noteId ? { ...n, content: newContent } : n
    );
    setAllNotes(updatedNotes);
  };

  const handleSave = () => {
    localStorage.setItem("my-notes", JSON.stringify(allNotes));
    toast.success("Note saved!");
  };

  if (!note) {
    return <div>Loading note...</div>;
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
