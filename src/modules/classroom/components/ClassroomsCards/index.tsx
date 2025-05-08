"use client";
import { useGetMyClassrooms } from "../../hooks/useGetMyClassrooms";
import { Card } from "@/components/ui/cards/Card";
import ProgressLink from "@/components/ui/navigation/ProgressLink/ProgressLink";
import { Button } from "@/components/ui/buttons/Button";
import { FaGear, FaUsers } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";
import { Tooltip } from "@/components/ui/overlay/Tooltip";
import { Skeleton } from "@/components/ui/feedback/Skeleton";
import { getRange } from "@/utils/getRange";
import { IClassroom } from "../../classroomType";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { IconButton } from "@/components/ui/buttons/IconButton";
import { BsThreeDots } from "react-icons/bs";
import { Dropdown } from "@/components/ui/overlay/Dropdown/Dropdown";
import { IUser } from "@/modules/user/userTypets";
import Image from "next/image";
import { languagesConfig } from "@/modules/language/utils/languagesConfig";

const ClassRoomsCard = ({
  classroom,
  user,
}: {
  classroom: IClassroom;
  user: IUser;
}) => {
  return (
    <Card.Root className="p-4">
      <div className="flex gap-1 group">
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex justify-center items-center size-8 bg-blue-500 rounded-full">
              <FaUsers className="text-white" />
            </span>
            <Tooltip align="center" side="top" textContent={classroom?.name}>
              <h4 className="line-clamp-1 w-fit">{classroom?.name}</h4>
            </Tooltip>
            {user?.role === 2 && (
              <Dropdown.Root>
                <Dropdown.Trigger asChild>
                  <IconButton
                    className="ml-auto"
                    variantStyle="dark-ghost"
                    icon={<BsThreeDots />}
                  />
                </Dropdown.Trigger>

                <Dropdown.Content>
                  <Dropdown.Item
                    asChild
                    // onClick={onOpenEditModal}
                    className="gap-2"
                  >
                    <ProgressLink href={`/update-classroom/${classroom?.uuid}`}>
                      <FaGear />
                      Editar
                    </ProgressLink>
                  </Dropdown.Item>
                  {/* <Dropdown.Item asChild className="gap-2">
                  <ProgressLink
                    href={`/classroom/${list?.classroom?.uuid}/lists/${list?.uuid}/update-exercises`}
                  >
                    <RiArrowUpDownFill />
                    Atualizar exercícios
                    {totalExercises === 0 && <Ping />}
                  </ProgressLink>
                </Dropdown.Item> */}
                </Dropdown.Content>
              </Dropdown.Root>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Tooltip
              align="center"
              side="top"
              textContent={classroom?.author?.email}
            >
              <p className="text-sm w-fit line-clamp-1 text-muted-foreground">
                Professor: {classroom?.author?.email}
              </p>
            </Tooltip>

            <p className="inline-flex items-center text-sm w-fit line-clamp-1 text-muted-foreground">
              Linguagens:{" "}
              <span className="inline-flex gap-2 ml-2">
                {classroom?.languages?.split(",")?.map((lang, i) => (
                  <Tooltip
                    key={`${classroom?.uuid}-${i}-${lang}`}
                    textContent={lang}
                    side="top"
                    align="center"
                  >
                    <Image
                      src={languagesConfig[lang].url}
                      alt={lang}
                      width={16}
                      height={16}
                    />
                  </Tooltip>
                ))}
              </span>
            </p>
          </div>
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
          <ClassRoomsCard
            user={loggedUser!}
            key={`classroom-${index}`}
            classroom={classroom}
          />
        ))}
      </div>
    </>
  );
};
