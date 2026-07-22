import { Tooltip } from "@/components/ui/overlay/Tooltip";
import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { cn } from "@/utils/cn";
import { Home } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useGetCachedMyClassrooms } from "@/modules/classroom/hooks/useGetCachedMyClassroms";
import { useGetCachedMyClassroomMenuItem } from "@/modules/classroom/hooks/useGetCachedMyClassroomMenuItem";
import { Avatar } from "@/components/ui/dataDisplay/Avatar";
import { emojis } from "@/utils/emojis";
import { LanguageBadge } from "@/modules/language/components/LanguageBadge";
import { GroupedUserInfo } from "@/modules/user/components/GroupedUserInfo";

interface SideBarItemProps {
  classroomUuid: string;
}

const SideBarItem = memo(({ classroomUuid }: SideBarItemProps) => {
  const { cachedMenuItemClassroom } =
    useGetCachedMyClassroomMenuItem(classroomUuid);

  const author = useMemo(() => {
    return cachedMenuItemClassroom.author;
  }, [cachedMenuItemClassroom.author]);

  const toolTipClassContent = useMemo(() => {
    return [
      {
        label: "🏰 Turma:",
        value: (
          <p className="truncate text-base font-extrabold tracking-tight">
            {cachedMenuItemClassroom?.name}
          </p>
        ),
      },
      {
        label: "Linguagens:",
        value: (
          <div className="flex gap-1.5 mt-0.5">
            {cachedMenuItemClassroom.languages?.split(",")?.map((l) => (
              <LanguageBadge key={l} lang={l} />
            ))}
          </div>
        ),
      },
      {
        label: "Autor(a):",
        value: (
          <div className="mt-0.5">
            <GroupedUserInfo
              user={{
                name: author.name,
                surname: author.surname,
                email: author.email,
                avatarUrl: author?.avatarUrl,
                avatarBgColor: author?.avatarBgColor,
              }}
            />
          </div>
        ),
      },
    ];
  }, [cachedMenuItemClassroom, author]);

  return (
    <Tooltip
      side="right"
      textContent={
        <div className="flex flex-col gap-2.5 group">
          {toolTipClassContent.map((item, i) => (
            <div key={`tooltip-item-${i}`} className="flex flex-col">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {item.label}
              </span>
              {item.value}
            </div>
          ))}
        </div>
      }
    >
      <Link
        to={ROUTES.CLASSROOM_LISTS(classroomUuid)}
        className="**:[[role=avatar]]:hover:rounded-xl"
      >
        <Avatar
          name={cachedMenuItemClassroom?.name}
          bgColor={cachedMenuItemClassroom?.color}
          emoji={emojis[parseInt(cachedMenuItemClassroom?.emoji)]}
          hideRing
          size={44}
        />
      </Link>
    </Tooltip>
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
      className={cn(
        "hidden md:flex sticky top-14 h-[calc(100vh-3.75rem)] w-18 shrink-0",
        "gap-2 border-r border-border/70 bg-background/60 overflow-auto",
      )}
    >
      <nav className={cn("flex flex-col items-center w-full gap-2")}>
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
        <Separator className="h-1 max-w-11 bg-transparent mt-4" />
      </nav>
    </aside>
  );
}
