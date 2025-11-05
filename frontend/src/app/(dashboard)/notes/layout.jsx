"use client";
import NoteList from "../NoteList";
import useSWR from "swr";

export default function NotesLayout({ children }) {
  const { data: allNotes, error } = useSWR("/api/notes");

  if (error) return <div>Failed to load notes.</div>;
  if (!allNotes) return <div>Loading notes...</div>;

  return (
    <div className="flex h-full">
      <div className="w-[280px]">
        <NoteList allNotes={allNotes} />
      </div>
      <div className="flex-1 border-l">{children}</div>
    </div>
  );
}
