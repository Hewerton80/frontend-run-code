import { memo } from "react";
import { Table } from "@/components/ui/dataDisplay/Table";
import { useGetCachedUserRow } from "../../hooks/useGetCachedUserRow";
import { GroupedUserInfo } from "../GroupedUserInfo";
import { RoleUserEnum } from "../../userTypets";
import { DateTime } from "@/utils/dateTime";

interface IUserTableRowProps {
  userUuid: string;
}

export const UserTableRow = memo(({ userUuid }: IUserTableRowProps) => {
  const { cachedUser } = useGetCachedUserRow(userUuid);

  return (
    <Table.Row>
      <Table.Data>
        <GroupedUserInfo user={cachedUser} />
      </Table.Data>
      <Table.Data>
        <span className="line-clamp-1">
          {RoleUserEnum?.[cachedUser?.role] || "-"}
        </span>
      </Table.Data>
      <Table.Data>
        {DateTime.format(cachedUser?.createdAt!, "dd/MM/yyyy - HH:mm")}
      </Table.Data>
    </Table.Row>
  );
});

UserTableRow.displayName = "UserTableRow";
