import { SideBarTamplateWrapper } from "@/components/templates/SideBarTamplateWrapper";

export default function InLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SideBarTamplateWrapper>{children}</SideBarTamplateWrapper>;
}
