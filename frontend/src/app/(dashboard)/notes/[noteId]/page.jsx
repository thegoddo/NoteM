/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import EditorPane from "../../EditorPane";
import ToolBox from "../../ToolBox";
import { toast } from "sonner";
import useSWR, { useSWRConfig } from "swr";
import { api } from "@/lib/api"; 

export default function NotePage({ params }) {
  const resolvedParams = use(params);
  const { noteId } = resolvedParams;
  const { mutate } = useSWRConfig();

  const { data: remoteNote, error } = useSWR(
    noteId ? `/api/notes/${noteId}` : null
  );

  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (remoteNote) {
      setContent(remoteNote.content);
    }
  }, [remoteNote]);

  useEffect(() => {
    setIsEditing(false);
  }, [noteId]);

  const handleNoteChange = (newContent) => {
    setContent(newContent);
  };

  const handleSave = async () => {
    try {
      const updatedNote = {
        title: remoteNote.title, 
        content,
      };

      await api.put(`/api/notes/${noteId}`, updatedNote);

      mutate(
        `/api/notes/${noteId}`,
        (cachedData) => ({
          ...cachedData,
          content,
        }),
        false
      );

      toast.success("Note saved!");
      setIsEditing(false); 
    } catch (err) {
      toast.error("Failed to save note.");
    }
  };

  if (error) return <div>Failed to load note.</div>;
  if (!remoteNote) return <div>Loading...</div>;

  const noteContent = content || remoteNote.content || "";

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
        key={remoteNote.id}
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
