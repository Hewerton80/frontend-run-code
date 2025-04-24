"use client";
import { useGetClassroomById } from "../../hooks/useGetClassroomById";
import { useParams } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/dataDisplay/Breadcrumb";
import { ClassroomListsTable } from "@/modules/list/components/ClassroomListsTable";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { IconButton } from "@/components/ui/buttons/IconButton";
import { BsThreeDots } from "react-icons/bs";
import { Dropdown } from "@/components/ui/overlay/Dropdown/Dropdown";
import ProgressLink from "@/components/ui/navigation/ProgressLink/ProgressLink";
import { FaRegListAlt } from "react-icons/fa";

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
          {loggedUser?.uuid === classroom?.author?.uuid && (
            <Dropdown.Root>
              <Dropdown.Trigger
                disabled={!!errorClassroom || !classroom}
                asChild
              >
                <IconButton variantStyle="secondary" icon={<BsThreeDots />} />
              </Dropdown.Trigger>
              <Dropdown.Content>
                <Dropdown.Item asChild>
                  <ProgressLink
                    href={`/classroom/${classroom?.uuid}/lists/update`}
                  >
                    <FaRegListAlt className="mr-2" />
                    Atualizar listas
                  </ProgressLink>
                </Dropdown.Item>
              </Dropdown.Content>
            </Dropdown.Root>
          )}
        </div>
        <ClassroomListsTable
          data={classroom?.listsProblems?.map((list) => ({
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
