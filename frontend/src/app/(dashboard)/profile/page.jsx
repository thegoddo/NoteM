"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Profile() {
  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <h2 className="font-bold text-lg">Profile</h2>
      <Avatar className="h-24 w-24">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="text-center">
        <p className="font-semibold">Your Name</p>
        <p className="text-sm text-muted-foreground">your.email@example.com</p>
      </div>
    </div>
  );
}