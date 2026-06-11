import { Breadcrumbs } from "@/components/ui/dataDisplay/Breadcrumb";
import { CustomDataTable } from "@/components/ui/dataDisplay/CustomDataTable";
import { usePagination } from "@/hooks/usePagination";
import {
  useFetchClassrooms,
  IFetchClassroomsParams,
} from "../../hooks/useFetchClassrooms";
import { ClassroomTableRow } from "./ClassroomTableRow";

export const ClassroomsTable = () => {
  const { goToPage, paginationParams } = usePagination();
  const classroomsParams: IFetchClassroomsParams = {
    ...paginationParams,
  };

  const {
    refetchClassrooms,
    classroomsRecords: classrooms,
    isFetchingClassrooms: isClassroomsLoading,
    classroomsError,
  } = useFetchClassrooms(classroomsParams);

  return (
    <div className="flex flex-col gap-4 w-full p-8">
      <Breadcrumbs
        isLoading={isClassroomsLoading}
        items={[{ label: "Turmas" }]}
      />
      <div>
        <CustomDataTable
          columns={["name", "author", "status", "createdAt"]}
          data={classrooms?.data || []}
          isLoading={isClassroomsLoading}
          errorMessage={
            classroomsError
              ? (classroomsError as any)?.response?.data?.message ||
                "Erro ao carregar as turmas"
              : undefined
          }
          renderItem={({ item }) => (
            <ClassroomTableRow classroomUuid={item.uuid!} />
          )}
          idExtractor={(classroom) => classroom?.uuid}
          onRetry={refetchClassrooms}
          pagination={{
            currentPage: classrooms?.currentPage || 1,
            totalPages: classrooms?.lastPage || 1,
            perPage: classrooms?.perPage || 25,
            totalRecords: classrooms?.total || 1,
            onChangePage: goToPage,
          }}
        />
      </div>
    </div>
  );
};
