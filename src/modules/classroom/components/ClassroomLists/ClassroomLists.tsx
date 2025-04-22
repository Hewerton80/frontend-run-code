"use client";
import { ListProblemAcoordion } from "@/modules/list/components/ListProblemAcoordion";
import { useGetClassroomById } from "../../hooks/useGetClassroomById";
import { useParams } from "next/navigation";
import { getRange } from "@/utils/getRange";
import { Skeleton } from "@/components/ui/feedback/Skeleton";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";
import { Breadcrumbs } from "@/components/ui/dataDisplay/Breadcrumb";
import { ClassroomListsTable } from "@/modules/list/components/ClassroomListsTable";
import { Button } from "@/components/ui/buttons/Button";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { IconButton } from "@/components/ui/buttons/IconButton";
import { BsThreeDots } from "react-icons/bs";
import { Dropdown } from "@/components/ui/overlay/Dropdown/Dropdown";
import { FaFileCirclePlus } from "react-icons/fa6";
import useQueryParams from "@/hooks/useQueryParams";
// import { ListsModal } from "@/modules/list/components/AddClassroomLists/AddClassroomLists";
import { useState } from "react";
import { Dialog } from "@/components/ui/overlay/Dialog";
import ProgressLink from "@/components/ui/navigation/ProgressLink/ProgressLink";

export function ClassroomLists() {
  const params = useParams<{ classroomId: string }>();

  const { classroom, errorClassroom, isLoadingClassroom, refetchClassroom } =
    useGetClassroomById(params?.classroomId);

  const { setQueryParams, queryParams } = useQueryParams<{
    showModal: string;
  }>();

  const { loggedUser } = useAuth();

  const [showModal, setShowModal] = useState(queryParams?.showModal === "true");

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
                {/* <ListsModal classroom={classroom}> */}
                <Dropdown.Item
                  // onClick={() => {
                  //   // setQueryParams({ showModal: "true" });
                  //   setShowModal(true);
                  // }}
                  asChild
                >
                  <ProgressLink
                    href={`/classroom/${classroom?.uuid}/lists/add`}
                  >
                    <FaFileCirclePlus className="mr-2" />
                    Adicionar listas
                  </ProgressLink>
                </Dropdown.Item>
                {/* </ListsModal> */}
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
        {/* <div className="flex flex-col">
        {errorClassroom && <FeedBackError onTryAgain={refetchClassroom} />}
        {isLoadingClassroom &&
          getRange(0, 5).map((index) => (
            <Skeleton
              key={`loading-class-${index}`}
              className="rounded-lg w-full h-20 mb-3"
            />
          ))}
        {classroom?.listsProblems?.map((listProblem) => (
          <ListProblemAcoordion
            key={`${listProblem?.uuid}-list-problem`}
            data={{ ...listProblem, classroom }}
          />
        ))}
      </div> */}
      </div>
      {/* <ListsModal
        show={showModal}
        onClose={() => setShowModal(false)}
        classroom={classroom}
      /> */}

      {/* <ListsModal
        show={showModal}
        onClose={() => setShowModal(false)}
        classroom={classroom}
      /> */}
    </>
  );
}
