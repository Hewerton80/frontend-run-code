import { Sidebar } from "@/components/common/Sidebar";
import { SideBarMembers } from "@/modules/classroom/components/SidebarMembers";
import { cn } from "@/utils/cn";
import { ReactNode } from "react";

interface SideBarTamplateWrapperProps {
  children: ReactNode;
}

export function SideBarTamplateWrapper({
  children,
}: SideBarTamplateWrapperProps) {
  return (
    <div className="flex w-full flex-1">
      <Sidebar />
      <main
        className={cn(
          "h-[calc(100vh-3.75rem)] overflow-auto flex flex-1 bg-background min-w-0 px-4 py-6 md:px-8",
        )}
      >
        <div className="flex flex-1">{children}</div>
      </main>
      <SideBarMembers />
    </div>
  );
}
