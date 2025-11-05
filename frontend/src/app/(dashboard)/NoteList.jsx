"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NoteList({ allNotes }) {
  const pathname = usePathname();

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg">My Notes</h2>
        <Link href="/notes">
          <Button variant="ghost" size="icon">
            <FilePlus className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {allNotes.map((note) => (
          <Link
            href={`/notes/${note.id}`}
            key={note.id}
            className={`block p-2 rounded text-left ${
              pathname === `/notes/${note.id}`
                ? "bg-gray-200 dark:bg-gray-700"
                : ""
            }`}
          >
            {note.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
