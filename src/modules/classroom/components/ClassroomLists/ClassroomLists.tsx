"use client";
import { Breadcrumbs } from "@/components/ui/dataDisplay";
import { ListProblemAcoordion } from "@/modules/listProblem/components/ListProblemAcoordion";
import { useGetClassroomById } from "../../hooks/useGetClassroomById";
import { useParams } from "next/navigation";
import { getRange } from "@/utils/getRange";
import { Skeleton } from "@/components/ui/feedback/Skeleton";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";

export function ClassroomLists() {
  const params = useParams<{ classroomId: string }>();
  const { classroom, errorClassroom, isLoadingClassroom, refetchClassroom } =
    useGetClassroomById(params?.classroomId);

  return (
    <div className="flex flex-col w-full gap-4 p-8">
      <Breadcrumbs
        isLoading={isLoadingClassroom}
        items={[
          { label: "🏠 Home", href: "/home" },
          { label: classroom?.name || "-" },
          { label: "Listas" },
        ]}
      />
      <div className="flex flex-col">
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
            key={`${listProblem?.id}-list-problem`}
            data={{ ...listProblem, classroom }}
          />
        ))}
      </div>
    </div>
  );
}
