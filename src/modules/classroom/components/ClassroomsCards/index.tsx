"use client";
import { useGetMyClassrooms } from "../../hooks/useGetMyClassrooms";
import { Card } from "@/components/ui/cards/Card";
import ProgressLink from "@/components/ui/navigation/ProgressLink/ProgressLink";
import { Button } from "@/components/ui/buttons/Button";
import { FaUsers } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";
import { Tooltip } from "@/components/ui/overlay/Tooltip";
import { Skeleton } from "@/components/ui/feedback/Skeleton";
import { getRange } from "@/utils/getRange";
import { IClassroom } from "../../classroomType";
import { useAuth } from "@/modules/auth/hooks/useAuth";

const ClassRoomsCard = ({ classroom }: { classroom: IClassroom }) => {
  return (
    <Card.Root className="p-4">
      <div className="flex gap-1 group">
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex justify-center items-center size-8 bg-blue-500 rounded-full">
              <FaUsers className="text-white" />
            </span>
            <Tooltip align="center" side="bottom" textContent={classroom?.name}>
              <h4 className="line-clamp-1 w-fit">{classroom?.name}</h4>
            </Tooltip>
          </div>
          <Tooltip
            align="center"
            side="bottom"
            textContent={classroom?.author?.email}
          >
            <p className="text-sm w-fit line-clamp-1 text-muted-foreground">
              Professor: {classroom?.author?.email}
            </p>
          </Tooltip>
          <Button
            rightIcon={<FaArrowRight />}
            asChild
            className="mt-4 ml-auto"
            variantStyle="dark-ghost"
          >
            <ProgressLink href={`/classroom/${classroom?.uuid}/lists`}>
              Acessar
            </ProgressLink>
          </Button>
        </div>
      </div>
    </Card.Root>
  );
};

export const ClassRoomsCards = () => {
  const {
    classrooms,
    errorClassrooms,
    isLoadingClassrooms,
    refetchClassrooms,
  } = useGetMyClassrooms();

  const { loggedUser } = useAuth();

  return (
    <>
      {errorClassrooms && <FeedBackError onTryAgain={refetchClassrooms} />}
      <div className="grid grid-cols-3 gap-4">
        {loggedUser?.role !== 1 && (
          <div className="flex col-span-3">
            <Button asChild>
              <ProgressLink href="/create-classroom">Criar turma</ProgressLink>
            </Button>
          </div>
        )}
        {isLoadingClassrooms &&
          getRange(0, 5).map((index) => (
            <Skeleton
              key={`loading-class-${index}`}
              className="rounded-lg w-full h-36"
            />
          ))}
        {classrooms?.map((classroom, index) => (
          <ClassRoomsCard key={`classroom-${index}`} classroom={classroom} />
        ))}
      </div>
    </>
  );
};
