"use client";
// import { navItems } from "@/utils/navItems";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";
import { IconButton } from "@/components/ui/buttons/IconButton";
// import { useSideBar } from "@/hooks/useSideBar";
import { GoSidebarExpand } from "react-icons/go";
import { Tooltip } from "@/components/ui/overlay/Tooltip";

const showOnlyIcons = true;
export const SideBarItems = forwardRef((_, ref?: any) => {
  const currentPath = usePathname();
  // const { showOnlyIcons } = useSideBar();
  const navItems = [
    // {
    //   title: "Dashboard",
    //   emoji: "📊",
    //   path: "/classroom/dsadsad/dashboard",
    //   basePath: "dashboard",
    // },
    {
      title: "Listas",
      emoji: "📝",
      path: "/classroom/dsadsad/lists",
      basePath: "lists",
    },
    {
      title: "Provas",
      emoji: "📚",
      path: "/classroom/dsadsad/tests",
      basePath: "tests",
    },
    {
      title: "Alunos",
      emoji: "👨‍🎓",
      path: "/classroom/dsadsad/students",
      basePath: "students",
    },
  ];

  return (
    <ul
      ref={ref}
      className={twMerge(
        "flex flex-col w-full space-y-1 p-2",
        showOnlyIcons && "items-center"
      )}
    >
      {navItems.map(({ title, emoji, path, basePath }, i) => {
        const isActive = currentPath.includes(`/${basePath}`);
        return (
          <li
            key={`${title}-${i}`}
            className={twMerge("flex", showOnlyIcons ? "w-fit" : "w-full")}
          >
            <Link
              href={path}
              className={twMerge(
                "flex items-center w-full gap-4 relative px-2 py-1.5",
                "whitespace-nowrap font-medium text-sm",
                "duration-100 ease-linear rounded-md text-card-foreground",
                "hover:bg-accent hover:text-accent-foreground",
                isActive &&
                  twMerge(
                    "text-dark-foreground hover:text-dark-foreground bg-dark hover:bg-dark/90",
                    "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white"
                  ),
                showOnlyIcons && "max-w-fit"
              )}
            >
              <span className={twMerge(showOnlyIcons ? "text-xl" : "text-lg")}>
                {emoji}
              </span>
              {!showOnlyIcons && <span>{title}</span>}
            </Link>
          </li>
        );
      })}
    </ul>
  );
});

export function Sidebar() {
  // const {
  //   sideBarWidth,
  //   resizingSideBar,
  //   setResizingSideBar,
  //   setSideBarWidth,
  // } = useSideBar();

  const sideBarWidth = showOnlyIcons ? 56 : 240;

  const sideBarElement = useMemo(() => {
    return (
      <aside
        className={twMerge(
          "flex flex-col bg-sidebar-background shadow-xs py-2",
          "duration-100 ease-linear overflow-hidden"
          // "border-r dark:border-muted"
        )}
        style={{ width: sideBarWidth }}
      >
        {/* <Resizable
          className={twMerge(
            "flex flex-col duration-100 ease-linear overflow-hidden",
            "border-card dark:border-card/70"
          )}
          enable={{ right: !showOnlyIcons }}
          size={{
            width: showOnlyIcons ? 56 : sideBarWidth,
            height: "100vh",
          }}
          onResizeStart={() => setResizingSideBar(true)}
          onResizeStop={(e, direction, ref, d) => {
            setResizingSideBar(false);
            setSideBarWidth(sideBarWidth + d.width);
          }}
          handleWrapperClass={twMerge(
            "[&>div]:duration-100 [&>div]:ease-linear",
            "[&>div]:border-r-8 [&>div]:border-r-card dark:[&>div]:border-r-card/70",
            "hover:[&>div]:border-r-primary",
            resizingSideBar && "[&>div]:border-r-primary"
          )}
        > */}
        {/* <div className="flex items-center px-6 gap-3 h-20 w-full">
           <Image
              src="/images/logo-1.png"
              alt="logo"
              width={52}
              height={52}
              priority
            />
            <Image
              className={twMerge(
                "dark:brightness-[35.5]",
                "h-6",
                showOnlyIcons ? "hidden" : "block"
              )}
              src="/images/logo-2.png"
              alt="logo2"
              width={108}
              height={24}
              priority
            /> 
        </div>*/}
        <div
          className={twMerge(
            "flex px-2",
            showOnlyIcons ? "justify-center rotate-180" : "justify-end rotate-0"
          )}
        >
          <Tooltip
            textContent={showOnlyIcons ? "Expandir menu" : "Recolher menu"}
            side="bottom"
          >
            <IconButton
              variantStyle="dark-ghost"
              icon={<GoSidebarExpand className="text-4xl" />}
            />
          </Tooltip>
        </div>
        <nav className="flex w-full h-full">
          <SideBarItems />
        </nav>
        {/* </Resizable> */}
      </aside>
    );
  }, [sideBarWidth]);

  return (
    <>
      {/* {showSideBar && (
        <div
          className="block md:hidden fixed inset-0 bg-black/50 z-9998"
          onClick={() => setShowSideBar(false)}
        />
      )} */}
      <Slot className="hidden md:flex">{sideBarElement}</Slot>
      {/* <Slot
        className={twMerge(
          "flex md:hidden fixed top-0 left-0 -translate-x-full z-9999",
          showSideBar && "translate-x-0"
        )}
      >
        {sideBarElement}
      </Slot> */}
    </>
  );
}
