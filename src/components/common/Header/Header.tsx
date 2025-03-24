"use client";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { FaRegPlayCircle } from "react-icons/fa";
import { ToogleThemeButton } from "@/components/ui/buttons/ToogleThemeButton";
import ProgressLink from "@/components/ui/navigation/ProgressLink/ProgressLink";
import { useProgressBar } from "@/hooks/useProgressBar";
import { ProgressHeaderBar } from "@/components/ui/feedback/ProgressHeaderBar";

export function Header() {
  const pathName = usePathname();
  const { progressValue } = useProgressBar();

  const menuItens = [
    {
      text: "Home",
      emoji: "🏠",
      link: "/",
    },
    {
      text: "Playground",
      emoji: "🎮",
      link: "/playground",
    },
    {
      text: "problemas",
      emoji: "🧩",
      link: "/problems",
    },
  ];

  return (
    <header className="bg-card h-15 shadow-xs border-b relative">
      <div className="flex items-center w-full h-full px-8 sm:px-16 justify-between">
        <ProgressLink className="flex items-center gap-2" href="/">
          <FaRegPlayCircle />
          <span className="text-2xl">Play Code</span>
        </ProgressLink>
        <nav className="flex items-center gap-4">
          {menuItens.map((item, index) => (
            <ProgressLink
              className={twMerge(
                "flex items-center gap-2 transition-colors",
                "hover:text-foreground/80 text-foreground group",
                item.link === pathName
                  ? "text-foreground"
                  : "text-foreground/80"
              )}
              key={index}
              href={item.link}
            >
              <span>{item.emoji}</span>
              <span className="group-hover:underline">{item.text}</span>
            </ProgressLink>
          ))}
        </nav>
        <span>
          <ToogleThemeButton />
        </span>
      </div>
      <ProgressHeaderBar />
    </header>
  );
}
