import { Badge } from "@/components/ui/dataDisplay/Badge";
import { Table } from "@/components/ui/dataDisplay/Table";
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { useGetCachedClassrom } from "@/modules/classroom/hooks/useGetCachedClassrom";
import { useGetCachedClassroomUser } from "@/modules/classroom/hooks/useGetCachedClassroomUser";
import { GroupedUserInfo } from "@/modules/user/components/GroupedUserInfo";
import { RoleUser, RoleUserEnum } from "@/modules/user/userTypets";
import { memo } from "react";
import { useParams } from "react-router-dom";
import { ClasrromUsersActionsTriggerButton } from "../ClasrromUsersActionsTriggerButton";

interface IClassroomUsersTableRowProps {
  userUuid: string;
}

export const ClassroomUsersTableRow = memo(
  ({ userUuid }: IClassroomUsersTableRowProps) => {
    const { cachedClassroomUser: user } = useGetCachedClassroomUser(userUuid);
    const params = useParams<{ classroomId: string }>();
    const { cachedClassroom: classroom } = useGetCachedClassrom(
      params?.classroomId!,
    );
    const { loggedUser } = useLoggedUser();

    return (
      <Table.Row>
        <Table.Data>
          <GroupedUserInfo user={user} />
        </Table.Data>
        <Table.Data>
          <div className="flex items-center gap-2">
            <span className="line-clamp-1">
              {RoleUserEnum?.[user?.role] || "-"}
            </span>
            {classroom?.author?.uuid === user?.uuid && (
              <Badge variant="dark">Autor(a)</Badge>
            )}
            {loggedUser?.uuid === user?.uuid && (
              <Badge variant="dark">Você</Badge>
            )}
          </div>
        </Table.Data>
        <Table.Data>
          {user?.role === RoleUser.TEACHER && (
            <div className="flex justify-end">
              <ClasrromUsersActionsTriggerButton userUuid={user?.uuid!} />
            </div>
          )}
        </Table.Data>
      </Table.Row>
    );
  },
);

ClassroomUsersTableRow.displayName = "ClassroomUsersTableRow";
