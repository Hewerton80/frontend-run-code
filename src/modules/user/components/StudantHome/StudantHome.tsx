"use client";
import { Card } from "@/components/ui/cards/Card";
import ProgressLink from "@/components/ui/navigation/ProgressLink/ProgressLink";
import { Button } from "@/components/ui/buttons/Button";
import { FaUsers } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";
import { Tooltip } from "@/components/ui/overlay/Tooltip";
import { Skeleton } from "@/components/ui/feedback/Skeleton";
import { getRange } from "@/utils/getRange";
import { useGetMyClassrooms } from "../../../classroom/hooks/useGetMyClassrooms";

export const StudantHome = () => {
  const {
    classrooms,
    errorClassrooms,
    isLoadingClassrooms,
    refetchClassrooms,
  } = useGetMyClassrooms();

  return (
    <div className="flex flex-col gap-4 w-full p-8">
      {errorClassrooms && <FeedBackError onTryAgain={refetchClassrooms} />}
      <div className="grid grid-cols-3 gap-4">
        {isLoadingClassrooms &&
          getRange(0, 5).map((index) => (
            <Skeleton
              key={`loading-class-${index}`}
              className="rounded-lg w-full h-36"
            />
          ))}
        {classrooms?.map((classInfo, index) => (
          <Card.Root
            key={`class-info-${index}-${classInfo?.uuid}`}
            className="p-4"
          >
            <div className="flex gap-1 group">
              <div className="flex flex-col w-full">
                <div className="flex items-center gap-2 mb-4">
                  <span className="flex justify-center items-center size-8 bg-blue-500 rounded-full">
                    <FaUsers className="text-white" />
                  </span>
                  <Tooltip
                    align="center"
                    side="bottom"
                    textContent={classInfo?.name}
                  >
                    <h4 className="line-clamp-1 w-fit">{classInfo?.name}</h4>
                  </Tooltip>
                </div>
                <Tooltip
                  align="center"
                  side="bottom"
                  textContent={classInfo?.author?.email}
                >
                  <p className="text-sm w-fit line-clamp-1 text-muted-foreground">
                    Professor: {classInfo?.author?.email}
                  </p>
                </Tooltip>
                <Button
                  rightIcon={<FaArrowRight />}
                  asChild
                  className="mt-4 ml-auto"
                  variantStyle="dark-ghost"
                >
                  <ProgressLink href={`/classroom/${classInfo?.uuid}/lists`}>
                    Acessar
                  </ProgressLink>
                </Button>
              </div>
            </div>
          </Card.Root>
        ))}
      </div>
    </div>
  );
};
