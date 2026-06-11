import { Table } from "@/components/ui/dataDisplay/Table";
import { useGetCachedClassroomRow } from "../../hooks/useGetCachedClassroomRow";
import { GroupedUserInfo } from "@/modules/user/components/GroupedUserInfo/GroupedUserInfo";
import { StatusClassroomEnum } from "../../classroomType";
import { DateTime } from "@/utils/dateTime";
import { memo } from "react";

interface IClassroomTableRowProps {
  classroomUuid: string;
}

export const ClassroomTableRow = memo(
  ({ classroomUuid }: IClassroomTableRowProps) => {
    const { cachedClassroom } = useGetCachedClassroomRow(classroomUuid);

    return (
      <Table.Row>
        <Table.Data>{cachedClassroom.name}</Table.Data>
        <Table.Data>
          <GroupedUserInfo user={cachedClassroom.author!} />
        </Table.Data>
        <Table.Data>
          {StatusClassroomEnum?.[cachedClassroom.status!] || "-"}
        </Table.Data>
        <Table.Data>
          {DateTime.format(cachedClassroom.createdAt!, "dd/MM/yyyy - HH:mm")}
        </Table.Data>
      </Table.Row>
    );
  },
);

ClassroomTableRow.displayName = "ClassroomTableRow";
