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
import { Button } from "@/components/ui/buttons/Button";
import { useToast } from "@/hooks/useToast";

export function ClassroomLists() {
  const params = useParams<{ classroomId: string }>();

  const { classroom, errorClassroom, isLoadingClassroom, refetchClassroom } =
    useGetClassroomById(params?.classroomId);

  const { loggedUser } = useAuth();

  const { toast } = useToast();

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
                </ProgressLink>{" "}
              </Button>
              <Button onClick={() => toast()}>show Toast</Button>
              <Button
                variantStyle="success"
                onClick={() => toast({ variant: "success" })}
              >
                show Toast
              </Button>
              <Button
                variantStyle="danger"
                onClick={() => toast({ variant: "danger" })}
              >
                show Toast
              </Button>
            </>
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
