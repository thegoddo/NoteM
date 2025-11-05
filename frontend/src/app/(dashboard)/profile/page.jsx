"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useSWR from "swr"; 
import { format } from "date-fns";

export default function Profile() {
  const { data: user } = useSWR("/api/users/me"); 
  const { data: notes } = useSWR("/api/notes"); 

  if (!user) return <div>Loading profile...</div>;

  const fallbackLetter = user.name
    ? user.name[0].toUpperCase()
    : user.email[0].toUpperCase();

  const formattedLastLogin = user.lastLogin
    ? format(new Date(user.lastLogin), "MMMM do, yyyy h:mm a")
    : "N/A";

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <Avatar className="h-24 w-24">
        <AvatarImage
          src={`https://ui-avatars.com/api/?name=${
            user.name || user.email
          }&background=random`}
          alt={user.name}
        />
        <AvatarFallback>{fallbackLetter}</AvatarFallback>
      </Avatar>
      <div className="text-center">
        <h2 className="text-2xl font-semibold">{user.name || user.email}</h2>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </div>

      <div className="border rounded-md p-4 w-full max-w-sm">
        <h3 className="font-semibold mb-2">Account Info</h3>
        <div className="flex justify-between py-1 border-b">
          <span className="text-muted-foreground">Total Notes:</span>
          <span>{user.noteCount || (notes ? notes.length : 0)}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-muted-foreground">Last Login:</span>
          <span>{formattedLastLogin}</span>
        </div>
      </div>
    </div>
  );
}
