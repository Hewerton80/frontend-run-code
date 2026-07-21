import { Sidebar } from "@/components/common/Sidebar";
import { cn } from "@/utils/cn";
import { ReactNode } from "react";

interface SideBarTamplateWrapperProps {
  children: ReactNode;
}

export function SideBarTamplateWrapper({
  children,
}: SideBarTamplateWrapperProps) {
  return (
    <div className="flex w-full bg-sidebar-background min-h-[calc(100vh-3.75rem)]">
      <Sidebar />
      <main
        className={cn(
          "flex flex-1 bg-background overflow-hidden min-w-0 px-4 py-6 md:px-8",
        )}
      >
        <div className="flex flex-1">{children}</div>
      </main>
    </div>
  );
}
