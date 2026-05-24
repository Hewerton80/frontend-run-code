import { Card } from "@/components/ui/cards/Card";
import { twMerge } from "tailwind-merge";
import { ExerciseSubmissionStatusType } from "../../exerciseTypes";
import { FaCode } from "react-icons/fa";
import { Tooltip } from "@/components/ui/overlay/Tooltip";
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { Link } from "react-router-dom";
import { memo, useMemo } from "react";
import { RoleUser } from "@/modules/user/userTypets";
import { ROUTES } from "@/routes/routes";
import { useGetCachedExerciseOfList } from "../../hooks/useGetCachedExerciseOfList";

interface ExerciseCardProps {
  exerciseId: string;
  listId: string;
  classroomId: string;
}

const exerciseSolveStatusEmojis: Record<
  ExerciseSubmissionStatusType,
  { icon: string; name: string }
> = {
  SOLVED: { icon: "✅", name: "Resolvida" },
  WRONG: { icon: "❌", name: "Errada" },
  PENDING: { icon: "🕒", name: "Aguardando submissão" },
};

export const ExerciseCard = memo(
  ({ exerciseId, listId, classroomId }: ExerciseCardProps) => {
    const { loggedUser } = useLoggedUser();
    const { exerciseOfList } = useGetCachedExerciseOfList(exerciseId, listId);

    const status = useMemo(
      () => exerciseOfList?.status!,
      [exerciseOfList?.status],
    );

    const solveStatusEmoji = useMemo(
      () => exerciseSolveStatusEmojis?.[status]?.icon,
      [status],
    );

    const solveStatusName = useMemo(
      () => exerciseSolveStatusEmojis?.[status]?.name,
      [status],
    );

    return (
      <Card.Root
        asChild
        className={twMerge(
          "p-4 shadow-md border-none group",
          "bg-linear-to-r from-blue-500 to-blue-700",
          "hover:from-blue-500/80 hover:to-blue-700/80",
          "duration-300 ease-in-out transition",
        )}
      >
        <Link
          to={ROUTES.CLASSROOM_LIST_EXERCISE(classroomId, listId, exerciseId)}
        >
          <div className="flex gap-1 ">
            <div className="flex flex-col">
              <Tooltip align="start" textContent={exerciseOfList?.title}>
                <h4 className="text-lg font-bold text-white mb-4 line-clamp-1">
                  {exerciseOfList?.title}
                </h4>
              </Tooltip>
              {loggedUser?.role === RoleUser.STUDENT && solveStatusEmoji && (
                <Tooltip
                  align="start"
                  textContent={
                    <div className="flex flex-col gap-1">
                      <p className="font-bold">
                        {solveStatusName} {solveStatusEmoji}
                      </p>
                    </div>
                  }
                >
                  <p className="text-base text-white line-clamp-1 w-fit">
                    Status: {solveStatusEmoji}
                  </p>
                </Tooltip>
              )}
            </div>
            <FaCode
              className={twMerge(
                "my-auto ml-auto text-7xl text-white opacity-80",
                "rotate-x-45 rotate-z-43 transform-3d",
                "group-hover:rotate-x-0 group-hover:rotate-z-0",
                "duration-500 ease-in-out",
              )}
            />
          </div>
        </Link>
      </Card.Root>
    );
  },
);
