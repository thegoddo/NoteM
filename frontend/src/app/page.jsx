import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import EditorPane from "./EditorPane";
import { FileText, LogOut, Moon, Search, User } from "lucide-react";

export default function Home() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full h-screen rounded-lg border"
    >
      <ResizablePanel
        defaultSize={4}
        minSize={4}
        maxSize={4}
        className="p-2 pt-4 flex flex-col items-center gap-6 bg-gray-50"
      >
        <User className="h-6 w-6" />
        <FileText className="h-6 w-6" />
        <Search className="h-6 w-6" />
        <Moon className="h-6 w-6" />

        <div className="flex-1"></div>
        <LogOut className="h-6 w-6" />
      </ResizablePanel>
      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={20} minSize={15}>
        <div className="p-4">
          <h2 className="font-bold text-lg">My List of Saved Notes</h2>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={76}>
        <div className="flex flex-col h-full">
          <div className="h-12 border-b flex items-center p-4 font-medium">
            Text Tool Box
          </div>

          <div className="flex-1">
            <EditorPane />
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
