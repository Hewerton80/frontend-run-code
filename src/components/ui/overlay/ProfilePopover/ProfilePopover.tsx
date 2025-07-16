import { Avatar } from "@/components/ui/dataDisplay/Avatar";
import { FiLogOut, FiUser } from "react-icons/fi";
import { useTheme } from "@/hooks/useTheme";
import { FaMoon, FaSun, FaChevronRight, FaChevronDown } from "react-icons/fa";
import { LuPaintbrush } from "react-icons/lu";
import { Dropdown } from "../Dropdown/Dropdown";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useLogout } from "@/modules/auth/hooks/useLogout";
import { RoleUserEnum } from "@/modules/user/userTypets";
import { GroupedUserInfo } from "@/modules/user/components/GroupedUserInfo";
import { Link } from "react-router-dom";

export function ProfilePopover() {
  const { setTheme } = useTheme();
  const { loggedUser } = useAuth();
  const { logout } = useLogout();

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <div className="flex gap-2 sm:gap-3 items-center cursor-pointer max-w-[220px]">
          {loggedUser && (
            <>
              <Avatar
                src={
                  loggedUser?.avatarUrl
                    ? `/avatar/${(loggedUser?.avatarUrl).padStart(2, "0")}.jpeg`
                    : ""
                }
                bgColor={loggedUser?.avatarBgColor}
                color={loggedUser?.avatarFontColor}
                name={loggedUser?.name}
                size="md"
              />
              <div className="flex flex-col">
                <strong className="text text-sm line-clamp-1">
                  {loggedUser?.username}
                </strong>
                <span className="line-clamp-1 text-xs text-muted-foreground">
                  {RoleUserEnum[loggedUser?.role]}
                </span>
              </div>
              <FaChevronDown />
            </>
          )}
        </div>
      </Dropdown.Trigger>
      <Dropdown.Content className="w-56">
        <GroupedUserInfo user={loggedUser!} />
        <Dropdown.Separator />
        <Dropdown.Item asChild>
          <Link to="/profile">
            <FiUser className="mr-2" size={20} /> Perfil
          </Link>
        </Dropdown.Item>
        <Dropdown.Sub>
          <Dropdown.SubTrigger>
            <LuPaintbrush className="mr-2" size={20} /> Tema
            <FaChevronRight className="ml-auto" />
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
        <Dropdown.Item onClick={logout}>
          <FiLogOut className="mr-2" size={20} /> Sair
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  );
}
