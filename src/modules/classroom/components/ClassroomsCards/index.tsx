import { useGetMyClassrooms } from "../../hooks/useGetMyClassrooms";
import { Card } from "@/components/ui/cards/Card";
import { Button } from "@/components/ui/buttons/Button";
import { FaUsers } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";
import { Tooltip } from "@/components/ui/overlay/Tooltip";
import { Skeleton } from "@/components/ui/feedback/Skeleton";
import { getRange } from "@/utils/getRange";
import { IClassroom } from "../../classroomType";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { IUser, RoleUser } from "@/modules/user/userTypets";
import { languagesConfig } from "@/modules/language/utils/languagesConfig";
import { ClassroomFormDialog } from "../ClassroomFormDialog";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ClasrromActionsTriggerButton } from "../ClasrromActionsTriggerButton";
import { Link } from "react-router-dom";

interface IClassRoomCardProps {
  classroom: IClassroom;
  loggedUser: IUser;
  onClickToEdit?: (classroomId: string) => void;
}

const ClassRoomsCard = ({
  classroom,
  loggedUser,
  onClickToEdit,
}: IClassRoomCardProps) => {
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
            <span className="ml-auto">
              <ClasrromActionsTriggerButton
                onClickToEditClassroom={() => onClickToEdit?.(classroom?.uuid!)}
              />
            </span>
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
                    <img
                      src={languagesConfig[lang].url}
                      alt={lang}
                      width={16}
                      height={16}
                    />
                  </Tooltip>
                ))}
              </span>
            </p>
            {loggedUser?.role === RoleUser.TEACHER && (
              <p className="inline-flex gap-2 items-center text-sm w-fit line-clamp-1 text-muted-foreground">
                Visibilidate:{" "}
                <Tooltip
                  textContent={
                    classroom?.status === 1
                      ? "Visível para os alunos"
                      : "Não visível para os alunos"
                  }
                  side="top"
                  align="center"
                >
                  {classroom?.status === 1 ? (
                    <FaEye className="text-foreground" />
                  ) : (
                    <FaEyeSlash className="text-foreground" />
                  )}
                </Tooltip>
              </p>
            )}
          </div>
          <Button
            rightIcon={<FaArrowRight />}
            asChild
            className="mt-4 ml-auto"
            variantStyle="dark-ghost"
          >
            <Link to={`/classroom/${classroom?.uuid}/lists`}>Acessar</Link>
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
  const [openDialog, setOpenDialog] = useState(false);
  const [classroomIdToEdit, setClassroomIdToEdit] = useState<string | null>(
    null
  );

  return (
    <>
      {errorClassrooms && <FeedBackError onTryAgain={refetchClassrooms} />}
      <div className="grid grid-cols-3 gap-4">
        {loggedUser?.role !== RoleUser.STUDENT && (
          <div className="flex justify-end col-span-3">
            <Button onClick={() => setOpenDialog(true)}>Criar turma</Button>
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
            loggedUser={loggedUser!}
            key={`classroom-${index}`}
            classroom={classroom}
            onClickToEdit={(classroomId) => {
              setOpenDialog(true);
              setClassroomIdToEdit(classroomId);
            }}
          />
        ))}
      </div>
      <ClassroomFormDialog
        isOpen={openDialog}
        classroomId={classroomIdToEdit}
        onClose={() => {
          setOpenDialog(false);
          setClassroomIdToEdit(null);
        }}
      />
    </>
  );
};
