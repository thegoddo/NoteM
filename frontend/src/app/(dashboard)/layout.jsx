import IconSidebar from "./IconSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      <div className="w-14">
        <IconSidebar />
      </div>

      <div className="flex-1 border-l">{children}</div>
    </div>
  );
}
