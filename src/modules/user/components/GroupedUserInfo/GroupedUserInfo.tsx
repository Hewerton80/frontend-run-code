import { Avatar } from "@/components/ui/dataDisplay/Avatar";
import { cn } from "@/utils/cn";

interface IGroupedUserInfoProps {
  user: {
    name: string;
    surname: string;
    email: string;
    avatarUrl?: string;
    avatarBgColor?: string;
  };
  className?: string;
}

export const GroupedUserInfo = ({ user, className }: IGroupedUserInfoProps) => {
  return (
    <div className={cn("flex items-center gap-2 text-sm", className)}>
      <Avatar
        src={
          user?.avatarUrl
            ? `/avatar/${user.avatarUrl.padStart(2, "0")}.jpeg`
            : undefined
        }
        bgColor={user?.avatarBgColor}
        name={user?.name}
        size={32}
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
