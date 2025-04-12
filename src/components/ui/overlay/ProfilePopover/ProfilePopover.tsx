"use client";
import { Avatar } from "@/components/ui/dataDisplay/Avatar";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { FiLogOut, FiUser } from "react-icons/fi";
import { useTheme } from "@/hooks/useTheme";
import { FaMoon, FaSun, FaChevronRight } from "react-icons/fa";
import { LuPaintbrush } from "react-icons/lu";
// import { getContrastColor } from "@/utils/colors";
// import { useGetLoggedUser } from "@/modules/auth/hooks/useGetLoggedUser";
// import { useAuthLogin } from "@/modules/auth/hooks/useAuthLogin";
import { Dropdown } from "../Dropdown/Dropdown";
import { useAuth } from "@/modules/auth/hooks/useAuth";

export function ProfilePopover() {
  const { theme, setTheme } = useTheme();
  const { loggedUser } = useAuth();
  // const { logout } = useAuthLogin();

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <div className="flex gap-2 sm:gap-3 items-center cursor-pointer max-w-[220px]">
          {loggedUser && (
            <>
              <Avatar
                src={loggedUser?.avatarUrl}
                bgColor={loggedUser?.avatarBgColor}
                color={loggedUser?.avatarFontColor}
                nameInities={loggedUser?.avatarInitials}
                size="md"
              />
              <div className="flex flex-col">
                <strong className="text text-sm line-clamp-1">
                  {/* two words */}
                  {loggedUser?.name?.split(" ")?.slice(0, 2).join(" ")}
                </strong>
              </div>
            </>
          )}
        </div>
      </Dropdown.Trigger>
      <Dropdown.Content className="w-56">
        <Dropdown.Item asChild>
          <Link href="/profile">
            <FiUser className="mr-2" size={20} /> Perfil
          </Link>
        </Dropdown.Item>
        <Dropdown.Sub>
          <Dropdown.SubTrigger>
            <LuPaintbrush className="mr-2" size={20} /> Tema
            <FaChevronRight className="ml-auto text-primary" />
          </Dropdown.SubTrigger>
          <Dropdown.SubContent>
            <Dropdown.Item onClick={() => setTheme("light")}>
              <FaSun className="mr-2" /> Claro
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setTheme("dark")}>
              <FaMoon className="mr-2" /> Escuro
            </Dropdown.Item>
          </Dropdown.SubContent>
        </Dropdown.Sub>
        <Dropdown.Separator />
        <Dropdown.Item
        // onClick={logout}
        >
          <FiLogOut className="mr-2" size={20} /> Sair
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  );
}
