"use client";

import { useState } from "react";
import { FilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NoteList({
  allNotes,
  selectedNoteId,
  onSelectNote,
  onNewNote,
  onUpdateNoteTitle,
}) {
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [tempTitle, setTempTitle] = useState("");

  const handleStartEditing = (note) => {
    setEditingNoteId(note.id);
    setTempTitle(note.title);
  };

  const handleSaveEdit = () => {
    if (tempTitle.trim() === "") return;
    onUpdateNoteTitle(editingNoteId, tempTitle);
    setEditingNoteId(null);
    setTempTitle("");
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg">My Notes</h2>
        <Button variant="ghost" size="icon" onClick={onNewNote}>
          <FilePlus className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {allNotes.map((note) =>
          editingNoteId === note.id ? (
            <Input
              key={note.id}
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              onBlur={handleSaveEdit}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveEdit();
                if (e.key === "Escape") setEditingNoteId(null);
              }}
              autoFocus
            />
          ) : (
            <button
              key={note.id}
              className={`p-2 rounded text-left ${
                note.id === selectedNoteId ? "bg-gray-200" : ""
              }`}
              onClick={() => onSelectNote(note.id)}
              onDoubleClick={() => handleStartEditing(note)}
            >
              {note.title}
            </button>
          )
        )}
      </div>
    </div>
  );
}
