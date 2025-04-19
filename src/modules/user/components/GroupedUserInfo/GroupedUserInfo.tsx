import { Avatar } from "@/components/ui/dataDisplay/Avatar";
import { IUser } from "../../userTypets";

interface IGroupedUserInfoProps {
  user: IUser;
}

export const GroupedUserInfo = ({ user }: IGroupedUserInfoProps) => {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Avatar
        src={
          user?.avatarUrl
            ? `/avatar/${(user?.avatarUrl).padStart(2, "0")}.jpeg`
            : undefined
        }
        bgColor={user?.avatarBgColor}
        color={user?.avatarFontColor}
        nameInities={user?.avatarInitials}
        size="sm"
      />
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="line-clamp-1 font-medium">
          {user?.name} {user?.surname}
        </span>
        <span className="line-clamp-1 text-xs text-muted-foreground">
          {user?.email}
        </span>
      </div>
    </div>
  );
};
