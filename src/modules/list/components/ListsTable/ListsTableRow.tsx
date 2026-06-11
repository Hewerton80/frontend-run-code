import { memo } from "react";
import { Table } from "@/components/ui/dataDisplay/Table";
import { useGetCachedListRow } from "../../hooks/useGetCachedListRow";
import { GroupedUserInfo } from "@/modules/user/components/GroupedUserInfo";
import { DateTime } from "@/utils/dateTime";

interface IListsTableRowProps {
  listId: number;
}

export const ListsTableRow = memo(({ listId }: IListsTableRowProps) => {
  const { cachedList } = useGetCachedListRow(listId);

  return (
    <Table.Row>
      <Table.Data>
        <p className="line-clamp-1">{cachedList?.title}</p>
      </Table.Data>
      <Table.Data>
        <GroupedUserInfo user={cachedList?.author!} />
      </Table.Data>
      <Table.Data>
        {DateTime.format(cachedList?.createdAt!, "dd/MM/yyyy - HH:mm")}
      </Table.Data>
    </Table.Row>
  );
});

ListsTableRow.displayName = "ListsTableRow";
