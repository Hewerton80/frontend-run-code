"use client";
import { useGetClassroomById } from "../../hooks/useGetClassroomById";
import { useParams } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/dataDisplay/Breadcrumb";
import { ClassroomListsTable } from "@/modules/list/components/ClassroomListsTable";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import ProgressLink from "@/components/ui/navigation/ProgressLink/ProgressLink";
import { FaRegListAlt } from "react-icons/fa";
import { Button } from "@/components/ui/buttons/Button";

export function ClassroomLists() {
  const params = useParams<{ classroomId: string }>();

  const { classroom, errorClassroom, isLoadingClassroom, refetchClassroom } =
    useGetClassroomById(params?.classroomId);

  const { loggedUser } = useAuth();

  return (
    <>
      <div className="flex flex-col w-full gap-4 p-8">
        <Breadcrumbs
          isLoading={isLoadingClassroom}
          items={[
            { label: "🏠 Home", href: "/home" },
            { label: classroom?.name || "-" },
            { label: "📝 Listas" },
          ]}
        />
        <div className="flex justify-end gap-4">
          {/* {loggedUser?.uuid === classroom?.author?.uuid && (
            <>
              <Button
                variantStyle="secondary"
                leftIcon={<FaRegListAlt />}
                asChild
              >
                <ProgressLink
                  href={`/classroom/${classroom?.uuid}/lists/update`}
                >
                  Atualizar listas
                </ProgressLink>
              </Button>
            </>
          )} */}
        </div>
        <ClassroomListsTable
          data={classroom?.lists?.map((list) => ({
            ...list,
            classroom,
          }))}
          isLoading={isLoadingClassroom}
          error={errorClassroom ? "Erro ao carregar listas" : undefined}
          onTryAgainIfError={refetchClassroom}
        />
      </div>
    </>
  );
}
