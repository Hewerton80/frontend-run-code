import { useFetchMyClassrooms } from "../../hooks/useFetchMyClassrooms";
import { Card } from "@/components/ui/cards/Card";
import { Button } from "@/components/ui/buttons/Button";
import { FaUsers } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";
import { Tooltip } from "@/components/ui/overlay/Tooltip";
import { Skeleton } from "@/components/ui/feedback/Skeleton";
import { getRange } from "@/utils/getRange";
import { IClassroom } from "../../classroomType";
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { IUser, RoleUser } from "@/modules/user/userTypets";
import { LANGUAGES_CONFIG_MAP } from "@/modules/language/utils/languagesConfig";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ClasrromActionsTriggerButton } from "../ClasrromActionsTriggerButton";
import { ClassroomForm } from "../ClassroomFormDrawer";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { toast } from "@/hooks/useToast";
import { cn } from "@/utils/cn";
import { LanguageBadge } from "@/modules/language/components/LanguageBadge";
import { ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/ui/dataDisplay/Avatar";
import { getRandomHexColor } from "@/utils/colorHelpers";
import { emojis } from "@/utils/emojis";

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
              {/* <span className="flex justify-center items-center size-11 bg-blue-500 rounded-full">
                <FaUsers className="text-white" />
              </span> */}
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
              {/* <p className="inline-flex items-center text-sm w-fit line-clamp-1 text-muted-foreground">
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
                          src={LANGUAGES_CONFIG_MAP[lang].url}
                          alt={lang}
                          width={16}
                          height={16}
                        />
                      </Tooltip>
                    ))}
                  </span>
                </p> */}
              {/* {loggedUser?.role === RoleUser.TEACHER && (
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
                )} */}
            </div>
            {/* <Button
                rightIcon={<FaArrowRight />}
                asChild
                className="mt-4 ml-auto"
                variantStyle="dark-ghost"
              >
                <Link to={ROUTES.CLASSROOM_LISTS(classroom?.uuid!)}>
                  Acessar
                </Link>
              </Button> */}
            <Separator className="h-px pt-1 border-b border-border/60 bg-transparent" />
            <div className="flex items-center justify-between">
              {/* <span className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{turma.pending}</span> pendentes
        </span> */}
              <span />
              <span className="inline-flex items-center gap-1 text-sm font-bold text-primary transition group-hover:gap-2">
                Acessar <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
          {/* <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <UserAvatar name={turma.name} hue={turma.hue} emoji={turma.emoji} size={44} />
          <div className="min-w-0">
            <div className="truncate text-base font-extrabold tracking-tight">
              {turma.name}
            </div>
            <div className="truncate text-xs text-muted-foreground">
              Prof. {turma.professor}
            </div>
          </div>
        </div>
        {turma.streak > 0 && (
          <span className="inline-flex items-center gap-1 rounded-full bg-warning/15 px-2 py-0.5 text-[11px] font-bold text-warning">
            <Flame className="h-3 w-3" /> {turma.streak}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Linguagens
        </span>
        <div className="flex gap-1.5">
          {turma.languages.map((l) => (
            <LanguageBadge key={l} lang={l} />
          ))}
        </div>
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Progresso da turma</span>
          <span className="font-semibold text-foreground">
            {Math.round(turma.progress * 100)}%
          </span>
        </div>
        <XPBar value={turma.progress * 100} max={100} />
      </div>

      <div className="mt-1 flex items-center justify-between border-t border-border/60 pt-3">
        <span className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{turma.pending}</span> pendentes
        </span>
        <span className="inline-flex items-center gap-1 text-sm font-bold text-primary transition group-hover:gap-2">
          Acessar <ArrowRight className="h-4 w-4" />
        </span>
      </div> */}
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

  return (
    <>
      {errorClassrooms && <FeedBackError onTryAgain={refetchClassrooms} />}
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
      <Button onClick={() => toast.success("This is a success message!")}>
        Toast
      </Button>
      <ClassroomForm.Drawer />
    </>
  );
};
