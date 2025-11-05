// app/(dashboard)/notes/layout.jsx
"use client";
import NoteList from "../NoteList";
import useSWR from "swr"; // 1. Import useSWR
// 2. We no longer need NotesContext, useState, etc.

export default function NotesLayout({ children }) {
  // 3. Fetch the note list
  const { data: allNotes, error } = useSWR("/api/notes");

  if (error) return <div>Failed to load notes.</div>;
  if (!allNotes) return <div>Loading notes...</div>;

  return (
    <div className="flex h-full">
      <div className="w-[280px]">
        {/* 4. Pass the fetched data to the list */}
        <NoteList allNotes={allNotes} />
      </div>
      <div className="flex-1 border-l">{children}</div>
    </div>
  );
}
