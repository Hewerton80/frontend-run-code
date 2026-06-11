import { Breadcrumbs } from "@/components/ui/dataDisplay/Breadcrumb";
import { CustomDataTable } from "@/components/ui/dataDisplay/CustomDataTable";
import { usePagination } from "@/hooks/usePagination";
import {
  IGetListExercisesParams,
  useFetchLists,
} from "../../hooks/useFetchLists";
import { ListsTableRow } from "./ListsTableRow";

export const ListsTable = () => {
  const { goToPage, paginationParams } = usePagination();
  const listsParams: IGetListExercisesParams = {
    ...paginationParams,
  };
  const {
    refetchListExercises,
    listExercises,
    isListExercisesLoading,
    listExercisesError,
  } = useFetchLists(listsParams);

  return (
    <div className="flex flex-col gap-4 w-full p-8">
      <Breadcrumbs
        isLoading={isListExercisesLoading}
        items={[{ label: "📝 Listas" }]}
      />
      <div>
        <CustomDataTable
          columns={["Título", "Autor(a)", "Criado em"]}
          data={listExercises?.data || []}
          isLoading={isListExercisesLoading}
          errorMessage={
            listExercisesError
              ? (listExercisesError as any)?.response?.data?.message ||
                "Erro ao carregar as listas"
              : undefined
          }
          renderItem={({ item }) => <ListsTableRow listId={item.id} />}
          idExtractor={(list) => String(list.id)}
          onRetry={refetchListExercises}
          pagination={{
            currentPage: listExercises?.currentPage || 1,
            totalPages: listExercises?.lastPage || 1,
            perPage: listExercises?.perPage || 25,
            totalRecords: listExercises?.total || 1,
            onChangePage: goToPage,
          }}
        />
      </div>
    </div>
  );
};
