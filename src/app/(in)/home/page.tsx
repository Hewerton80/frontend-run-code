"use client";
import { Card } from "@/components/ui/cards/Card";
import { TypeWriterText } from "@/components/ui/typography/TypeWriterText";
import { twMerge } from "tailwind-merge";
import ProgressLink from "@/components/ui/navigation/ProgressLink/ProgressLink";
import { Button } from "@/components/ui/buttons/Button";
import { FaUsers } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { useGetMyClassrooms } from "@/modules/classroom/hooks/useGetMyClassrooms";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";
import { Tooltip } from "@/components/ui/overlay/Tooltip";
import { Skeleton } from "@/components/ui/feedback/Skeleton";
import { getRange } from "@/utils/getRange";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { Hello } from "@/components/ui/typography/Hello/Hello";

export default function HomePage() {
  const {
    classrooms,
    errorClassrooms,
    isLoadingClassrooms,
    refetchClassrooms,
  } = useGetMyClassrooms();

  const { loggedUser } = useAuth();

  return (
    <div className="flex flex-col w-full gap-4">
      <div
        className={twMerge(
          "flex flex-col w-full gap-4 py-8 px-16",
          "text-white",
          "bg-linear-to-r from-blue-500 to-blue-800"
        )}
      >
        <div className="flex">
          <h1 className="text-4xl font-bold animate-pulse">
            Bem vindo, {loggedUser?.username}!{" "}
          </h1>
          <Hello className="text-4xl " />
        </div>
        Acesse{" "}
        <TypeWriterText text="suas turmas e resolva problemas de programação!" />
      </div>
      <div className="flex flex-col w-full gap-4 px-16 py-4">
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
              key={`class-info-${index}-${classInfo?.id}`}
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
                  {/* <p className="text-sm line-clamp-1 text-muted-foreground">
                    Alunos: {classInfo.students}
                  </p> */}
                  <Button
                    rightIcon={<FaArrowRight />}
                    asChild
                    className="mt-4 ml-auto"
                    variantStyle="dark-ghost"
                  >
                    <ProgressLink href={`/classroom/${classInfo?.id}/lists`}>
                      Acessar
                    </ProgressLink>
                  </Button>
                </div>
              </div>
            </Card.Root>
          ))}
        </div>
      </div>
    </div>
  );
}
