import { useFetchMyClassrooms } from "../../hooks/useFetchMyClassrooms";
import { Card } from "@/components/ui/cards/Card";
import { Button } from "@/components/ui/buttons/Button";
import { Tooltip } from "@/components/ui/overlay/Tooltip";
import { Skeleton } from "@/components/ui/feedback/Skeleton";
import { getRange } from "@/utils/getRange";
import { IClassroom } from "../../classroomType";
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { IUser, RoleUser } from "@/modules/user/userTypets";
import { ClasrromActionsTriggerButton } from "../ClasrromActionsTriggerButton";
import { ClassroomForm } from "../ClassroomFormDrawer";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { cn } from "@/utils/cn";
import { LanguageBadge } from "@/modules/language/components/LanguageBadge";
import { ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/ui/dataDisplay/Avatar";
import { emojis } from "@/utils/emojis";
import { ApiErrorState } from "@/components/ui/feedback/EmptyState";

interface IClassRoomCardProps {
  classroom: IClassroom;
  loggedUser: IUser;
}

const ClassRoomsCard = ({ classroom, loggedUser }: IClassRoomCardProps) => {
  return (
    <div className="relative">
      <span className="absolute top-5 right-5 z-10">
        <ClasrromActionsTriggerButton classroomId={classroom?.uuid} />
      </span>
      <Card.Root
        className={cn(
          "group gap-4 p-5 shadow-card transition hover:-translate-y-0.5",
          "hover:border-primary/40 hover:shadow-glow",
        )}
        asChild
      >
        <Link to={ROUTES.CLASSROOM_LISTS(classroom?.uuid!)}>
          <div className="flex flex-col gap-4 group">
            <div className="flex items-center gap-2">
              <Avatar
                name={classroom?.name}
                bgColor={classroom?.color}
                emoji={emojis[parseInt(classroom?.emoji)]}
              />
              <div className="min-w-0">
                <Tooltip align="start" side="top" textContent={classroom?.name}>
                  <h4 className="truncate pr-8 text-base font-extrabold tracking-tight">
                    {classroom?.name}
                  </h4>
                </Tooltip>
                <Tooltip
                  align="start"
                  side="top"
                  textContent={classroom?.author?.email}
                >
                  <p className="truncate text-xs text-muted-foreground">
                    Prof. {classroom?.author?.email}
                  </p>
                </Tooltip>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Linguagens
              </span>
              <div className="flex gap-1.5">
                {classroom.languages?.split(",")?.map((l) => (
                  <LanguageBadge key={l} lang={l} />
                ))}
              </div>
            </div>

            <Separator className="h-px pt-1 border-b border-border/60 bg-transparent" />
            <div className="flex items-center justify-between">
              <span />
              <span className="inline-flex items-center gap-1 text-sm font-bold text-primary transition group-hover:gap-2">
                Acessar <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </Link>
      </Card.Root>
    </div>
  );
};

export const ClassRoomsCards = () => {
  const {
    myClassroomsRecords: classrooms,
    myClassroomsError: errorClassrooms,
    isFetchingMyClassrooms: isLoadingClassrooms,
    refetchMyClassrooms: refetchClassrooms,
  } = useFetchMyClassrooms();

  const { loggedUser } = useLoggedUser();

  if (errorClassrooms) {
    return (
      <ApiErrorState
        title="Erro ao carregar suas turmas"
        onRetry={refetchClassrooms}
        message={errorClassrooms.message}
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex col-span-3">
          <div className="flex items-end justify-between w-full">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Suas turmas
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight">
                🏰 Escolha uma turma para entrar
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {classrooms?.length} turmas
              </span>
              {loggedUser?.role !== RoleUser.STUDENT && (
                <div className="flex">
                  <ClassroomForm.TriggerButton classroomId={null}>
                    <Button>Criar turma</Button>
                  </ClassroomForm.TriggerButton>
                </div>
              )}
            </div>
          </div>
        </div>
        {isLoadingClassrooms &&
          getRange(0, 5).map((index) => (
            <Skeleton
              key={`loading-class-${index}`}
              className="rounded-lg w-full h-36"
            />
          ))}
        {(classrooms || [])?.map((classroom, index) => (
          <ClassRoomsCard
            loggedUser={loggedUser!}
            key={`classroom-${index}`}
            classroom={classroom}
          />
        ))}
      </div>

      <ClassroomForm.Drawer />
    </>
  );
};
