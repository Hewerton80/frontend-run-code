"use client";
import { Sidebar } from "@/components/common/Sidebar";
import { twMerge } from "tailwind-merge";

export default function InLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full bg-sidebar-background">
      <Sidebar />
      <div
        className={twMerge(
          "flex flex-1 bg-background mt-2 mr-2 border rounded-xl"
        )}
      >
        {children}
      </div>
    </div>
  );
}
