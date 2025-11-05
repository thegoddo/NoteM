// app/(dashboard)/NoteList.jsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FilePlus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNotes } from "./notes/NotesContext";
import { useState } from "react"; // 1. Import useState
import { Input } from "@/components/ui/input"; // 2. Import Input

export default function NoteList() {
  const pathname = usePathname();
  // 3. Get all notes and handlers from context
  const { allNotes, handleNewNote, handleDeleteNote, handleUpdateNote } = useNotes();

  // 4. Add back the local state for editing
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [tempTitle, setTempTitle] = useState("");

  const handleStartEditing = (note) => {
    setEditingNoteId(note.id);
    setTempTitle(note.title);
  };

  const handleSaveEdit = () => {
    if (tempTitle.trim() === "") return;
    
    // Find the original note to create an updated object
    const originalNote = allNotes.find(note => note.id === editingNoteId);
    if (originalNote) {
      handleUpdateNote({ ...originalNote, title: tempTitle });
    }
    
    setEditingNoteId(null);
    setTempTitle("");
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg">My Notes</h2>
        <Button variant="ghost" size="icon" onClick={handleNewNote}>
          <FilePlus className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {allNotes.map((note) => (
          <div
            key={note.id}
            className={`group flex items-center justify-between p-2 rounded ${
              pathname === `/notes/${note.id}`
                ? "bg-gray-200 dark:bg-gray-700"
                : ""
            }`}
          >
            {/* 5. Check if we are editing this note */}
            {editingNoteId === note.id ? (
              // 6. If YES, render an Input
              <Input
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                onBlur={handleSaveEdit} // Save when user clicks away
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveEdit();
                  if (e.key === "Escape") setEditingNoteId(null);
                }}
                autoFocus
              />
            ) : (
              // 7. If NO, render the link
              <Link
                href={`/notes/${note.id}`}
                className="text-left flex-1"
                onDoubleClick={() => handleStartEditing(note)} // 8. Add double-click
              >
                {note.title}
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 opacity-0 group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteNote(note.id);
              }}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}