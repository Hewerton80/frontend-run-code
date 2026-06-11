import { Breadcrumbs } from "@/components/ui/dataDisplay/Breadcrumb";
import { CustomDataTable } from "@/components/ui/dataDisplay/CustomDataTable";
import { usePagination } from "@/hooks/usePagination";
import { IFetchUsersParams, useFetchUsers } from "../../hooks/useFetchUsers";
import { UserTableRow } from "./UserTableRow";

export const ListUsers = () => {
  const { goToPage, paginationParams } = usePagination();

  const usersParams: IFetchUsersParams = {
    ...paginationParams,
  };

  const { refetchUsers, users, isUsersLoading, usersError } =
    useFetchUsers(usersParams);

  return (
    <div className="flex flex-col w-full gap-4 p-8">
      <Breadcrumbs items={[{ label: "Usuários", href: "/users" }]} />
      <CustomDataTable
        columns={["Nome", "Função", "Criado em"]}
        data={users?.data || []}
        isLoading={isUsersLoading}
        errorMessage={
          usersError
            ? (usersError as any)?.response?.data?.message ||
              "Erro ao carregar os usuários"
            : undefined
        }
        renderItem={({ item }) => <UserTableRow userUuid={item.uuid} />}
        idExtractor={(user) => user.uuid}
        onRetry={refetchUsers}
        pagination={{
          currentPage: users?.currentPage || 1,
          totalPages: users?.lastPage || 1,
          perPage: users?.perPage || 25,
          totalRecords: users?.total || 1,
          onChangePage: goToPage,
        }}
      />
    </div>
  );
};
