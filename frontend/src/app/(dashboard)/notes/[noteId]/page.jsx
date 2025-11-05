// app/(dashboard)/notes/[noteId]/page.jsx
"use client";
import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import EditorPane from "../../EditorPane";
import ToolBox from "../../ToolBox";
import { toast } from "sonner";
import useSWR, { useSWRConfig } from "swr"; // 1. Import SWR
import { api } from "@/lib/api"; // 2. Import Axios

export default function NotePage({ params }) {
  const resolvedParams = use(params);
  const { noteId } = resolvedParams;
  const { mutate } = useSWRConfig();

  // 3. Fetch the full note content
  const { data: note, error } = useSWR(noteId ? `/api/notes/${noteId}` : null);

  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(""); // Local editor state

  // 4. When the note data loads, update the local content
  useEffect(() => {
    if (note) {
      setContent(note.content);
    }
  }, [note]);

  // 5. Reset to read-only when the note ID changes
  useEffect(() => {
    setIsEditing(false);
  }, [noteId]);

  const handleSave = async () => {
    try {
      const updatedNote = { ...note, content };
      // 6. Call the API to save
      await api.put(`/api/notes/${noteId}`, updatedNote);

      // 7. Update the local SWR cache *instantly*
      // This makes the app feel fast, no re-fetch needed
      mutate(`/api/notes/${noteId}`, updatedNote, false);

      toast.success("Note saved!");
      setIsEditing(false);
    } catch (err) {
      toast.error("Failed to save note.");
    }
  };

  if (error) return <div>Failed to load note.</div>;
  if (!note) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-full">
      <ToolBox
        content={content}
        onContentChange={setContent} // 8. Editor updates local state
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
          content={content}
          onContentChange={setContent}
          isEditing={isEditing}
        />
      </motion.div>
    </div>
  );
}
