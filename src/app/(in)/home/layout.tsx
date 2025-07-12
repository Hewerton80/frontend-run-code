"use client";
import { HomeHeader } from "@/components/common/HomeHeader/HomeHeader";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full">
      <HomeHeader />
      <div className="flex flex-col gap-4 w-full p-8">{children}</div>
    </div>
  );
}
