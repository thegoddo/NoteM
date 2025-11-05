import IconSidebar from "./IconSidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function DashboardLayout({ children }) {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full h-screen rounded-lg border"
    >
      <ResizablePanel defaultSize={4} minSize={4} maxSize={4}>
        <IconSidebar />
      </ResizablePanel>
      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={96}>{children}</ResizablePanel>
    </ResizablePanelGroup>
  );
}
