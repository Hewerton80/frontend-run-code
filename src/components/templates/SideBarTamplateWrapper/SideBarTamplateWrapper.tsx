import { Sidebar } from "@/components/common/Sidebar";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface SideBarTamplateWrapperProps {
  children: ReactNode;
}

export function SideBarTamplateWrapper({
  children,
}: SideBarTamplateWrapperProps) {
  return (
    <div className="flex w-full bg-sidebar-background min-h-[calc(100vh-3.75rem)]">
      <Sidebar />
      <div
        className={twMerge(
          "flex flex-1 bg-background mt-2 mr-2 border rounded-xl overflow-hidden"
        )}
      >
        {children}
      </div>
    </div>
  );
}
