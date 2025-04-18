"use client";
import { HomeHeader } from "@/components/common/HomeHeader/HomeHeader";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full gap-4">
      <HomeHeader />
      <div className="flex flex-col w-full gap-4 px-16 py-4">{children}</div>
    </div>
  );
}
