"use client";
import { useState } from "react";
import useSWR from "swr";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: results, isLoading } = useSWR(
    searchTerm.trim() ? `/api/notes/search?q=${searchTerm}` : null
  );

  const pathname = usePathname();

  return (
    <div className="p-4 h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Search Notes</h2>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search titles and content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex-1 overflow-y-auto space-y-3">
        {isLoading && searchTerm.trim() && (
          <p className="flex items-center text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Searching...
          </p>
        )}

        {results && results.length === 0 && searchTerm.trim() && (
          <p className="text-muted-foreground">
            No results found for &ldquo;{searchTerm}&rdquo;
          </p>
        )}

        {results &&
          results.map((note) => (
            <Link
              key={note.id}
              href={`/notes/${note.id}`}
              className={`block p-3 rounded-md transition-colors 
                                   ${
                                     pathname === `/notes/${note.id}`
                                       ? "bg-primary/10"
                                       : "hover:bg-gray-100 dark:hover:bg-gray-800"
                                   }`}
            >
              <h3 className="font-semibold text-sm line-clamp-1">
                {note.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {note.content}
              </p>
            </Link>
          ))}
      </div>
    </div>
  );
}
