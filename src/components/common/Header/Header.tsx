import { twMerge } from "tailwind-merge";
import { FaRegPlayCircle } from "react-icons/fa";
import { ProgressHeaderBar } from "@/components/ui/feedback/ProgressHeaderBar";
import { ProfilePopover } from "@/components/ui/overlay/ProfilePopover";
import { useGetHeaderMenuItems } from "@/modules/auth/hooks/useGetHeaderMenuItems";
import { Link } from "react-router-dom";

export function Header() {
  const { headerMenuItems } = useGetHeaderMenuItems();

  return (
    <header className="bg-card h-15 shadow-xs border-b relative">
      <div className="flex items-center w-full h-full px-8 sm:px-16 justify-between">
        <Link className="flex items-center gap-2" to="/in/home">
          <FaRegPlayCircle />
          <span className="text-2xl">Play Code</span>
        </Link>
        <nav className="flex items-center gap-4">
          {headerMenuItems.map((item, index) => (
            <Link
              className={twMerge(
                "flex items-center gap-2 transition-colors",
                "hover:text-foreground/80 text-foreground group",
                item.isActive ? "text-foreground" : "text-foreground/80"
              )}
              key={`header-menu-item-${index}`}
              to={item.link}
            >
              <span>{item.icon}</span>
              <span className="group-hover:underline">{item.text}</span>
            </Link>
          ))}
        </nav>
        <span>
          <ProfilePopover />
        </span>
      </div>
      <ProgressHeaderBar />
    </header>
  );
}
