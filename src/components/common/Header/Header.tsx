"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { FaRegPlayCircle } from "react-icons/fa";
import { ToogleThemeButton } from "@/components/ui/buttons/ToogleThemeButton";

export function Header() {
  const pathName = usePathname();

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
      text: "problems",
      emoji: "🧩",
      link: "/problems",
    },
  ];

  return (
    <header className="bg-card h-15 shadow-xs border-b">
      <div className="flex items-center w-full h-full px-4 sm:px-8 justify-between">
        <Link className="flex items-center gap-2" href="/">
          <FaRegPlayCircle />
          <span className="text-2xl">Play Code</span>
        </Link>
        <nav className="flex items-center gap-4">
          {menuItens.map((item, index) => (
            <Link
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
            </Link>
          ))}
        </nav>
        <span>
          <ToogleThemeButton />
        </span>
      </div>
    </header>
  );
}
