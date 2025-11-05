"use client";

import { Button } from "@/components/ui/button";
import { Bold, Italic, List } from "lucide-react";

function ToolBoxButton({ icon: Icon, onClick }) {
  return (
    <Button variant="ghost" size="icon" onClick={onClick}>
      <Icon className="h-4 w-4" />
    </Button>
  );
}

// Export a new component that contains our toolbox layout
export default function ToolBox() {
  return (
    <div className="h-12 border-b flex items-center p-2 gap-1">
      <ToolBoxButton icon={Bold} />
      <ToolBoxButton icon={Italic} />
      <ToolBoxButton icon={List} />
    </div>
  );
}
