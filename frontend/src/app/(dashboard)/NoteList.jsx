// app/(dashboard)/NoteList.jsx
"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FilePlus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useSWRConfig } from "swr";
import { api } from "@/lib/api";
import { toast } from "sonner";

export default function NoteList({ allNotes }) {
  const pathname = usePathname();
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const [editingNoteId, setEditingNoteId] = useState(null);
  const [tempTitle, setTempTitle] = useState("");

  const handleNewNote = async () => {
    try {
      const newNote = await api.post("/api/notes");
      mutate("/api/notes");
      toast.success("New note created!");
      router.push(`/notes/${newNote.data.id}`);
    } catch (err) {
      toast.error("Failed to create note.");
    }
  };

  const handleStartEditing = (note) => {
    setEditingNoteId(note.id);
    setTempTitle(note.title);
  };

  const handleSaveEdit = async () => {
    if (!tempTitle || tempTitle.trim() === "") return;
    try {
      await api.put(`/api/notes/${editingNoteId}`, { title: tempTitle });
      mutate("/api/notes");
      setEditingNoteId(null);
    } catch (err) {
      toast.error("Failed to rename note.");
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await api.delete(`/api/notes/${id}`);
      mutate("/api/notes");
      toast.error("Note deleted.");
      router.push("/notes");
    } catch (err) {
      toast.error("Failed to delete note.");
    }
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
            {editingNoteId === note.id ? (
              <Input
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
              <Link
                href={`/notes/${note.id}`}
                className="text-left flex-1"
                onDoubleClick={() => handleStartEditing(note)}
              >
                {note.title}
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 opacity-0 group-hover:opacity-100"
              onClick={() => handleDeleteNote(note.id)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
