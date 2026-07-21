import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";
import { IconButton } from "@/components/ui/buttons/IconButton";
import { GoSidebarExpand } from "react-icons/go";
import { Tooltip } from "@/components/ui/overlay/Tooltip";
import { useSideBar } from "@/hooks/useSideBar";
import { useGetSidebarMenuItems } from "@/modules/auth/hooks/useGetSidebarMenuItems";
import { forwardRef, memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { cn } from "@/utils/cn";
import { Home } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useGetCachedMyClassrooms } from "@/modules/classroom/hooks/useGetCachedMyClassroms";
import { useGetCachedMyClassroomMenuItem } from "@/modules/classroom/hooks/useGetCachedMyClassroomMenuItem";
import { Avatar } from "@/components/ui/dataDisplay/Avatar";
import { emojis } from "@/utils/emojis";

export const SideBarItems = forwardRef((_, ref?: any) => {
  const { sidebarMenuItems } = useGetSidebarMenuItems();

  const { showOnlyIcons } = useSideBar();

  return (
    <ul
      ref={ref}
      className={twMerge(
        "flex flex-col w-full space-y-1 p-2",
        showOnlyIcons && "items-center",
      )}
    >
      {sidebarMenuItems.map(({ title, icon, link, isActive }, i) => (
        <li
          key={`${title}-${i}`}
          className={twMerge("flex", showOnlyIcons ? "w-fit" : "w-full")}
        >
          <Tooltip
            open={showOnlyIcons ? undefined : false}
            textContent={title}
            side="right"
            align="center"
          >
            <Link
              to={link}
              className={twMerge(
                "flex items-center w-full gap-4 relative px-2 py-1.5",
                "whitespace-nowrap font-medium text-sm",
                "duration-100 ease-linear rounded-md text-card-foreground",
                "hover:bg-accent hover:text-accent-foreground",
                isActive &&
                  twMerge(
                    "text-dark-foreground hover:text-dark-foreground bg-dark hover:bg-dark/90",
                    "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                  ),
                showOnlyIcons && "max-w-fit",
              )}
            >
              <span className={twMerge(showOnlyIcons ? "text-xl" : "text-lg")}>
                {icon}
              </span>
              {!showOnlyIcons && <span>{title}</span>}
            </Link>
          </Tooltip>
        </li>
      ))}
    </ul>
  );
});

interface SideBarItemProps {
  classroomUuid: string;
}

const SideBarItem = memo(({ classroomUuid }: SideBarItemProps) => {
  const { cachedMenuItemClassroom } =
    useGetCachedMyClassroomMenuItem(classroomUuid);

  return (
    <Link to={ROUTES.CLASSROOM_LISTS(classroomUuid)}>
      <Avatar
        name={cachedMenuItemClassroom?.name}
        bgColor={cachedMenuItemClassroom?.color}
        emoji={emojis[parseInt(cachedMenuItemClassroom?.emoji)]}
        withHoverAnimation
        hideRing
        size={44}
      />
    </Link>
  );
});
SideBarItem.displayName = "SideBarItem";

export function Sidebar() {
  // const {
  //   sideBarWidth,
  //   resizingSideBar,
  //   setResizingSideBar,
  //   setSideBarWidth,
  // } = useSideBar();
  const { cachedClassrooms } = useGetCachedMyClassrooms();

  return (
    <aside
      className={twMerge(
        "hidden md:flex sticky top-14 h-[calc(100vh-3.75rem)] w-18 shrink-0",
        "gap-2 border-r border-border/70 bg-background/60 pb-4",
      )}
    >
      <nav className="flex flex-col items-center w-full gap-2">
        <Link
          to={ROUTES.HOME}
          className={cn(
            "group mt-4 relative grid h-11 w-11 place-items-center rounded-full transition shrink-0",
            "bg-primary text-primary-foreground hover:rounded-xl",
          )}
        >
          <Home className="h-5 w-5" />
        </Link>
        <Separator className="h-1 max-w-11" />
        {cachedClassrooms.map((classroom) => (
          <SideBarItem
            key={`classroom-${classroom.uuid}`}
            classroomUuid={classroom.uuid}
          />
        ))}
      </nav>
    </aside>
  );
}
