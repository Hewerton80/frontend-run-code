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
    <>
      <Sidebar />
      <main
        className={cn(
          "h-[calc(100vh-3.75rem)] overflow-auto bg-background min-w-0 px-4 py-6 md:px-8",
        )}
      >
        {children}
      </main>
      <SideBarMembers />
    </>
  );
}
