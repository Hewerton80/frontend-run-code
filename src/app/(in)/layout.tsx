import { Header } from "@/components/common/Header";

export default function InLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 h-full w-full p-8">{children}</div>
    </div>
  );
}
