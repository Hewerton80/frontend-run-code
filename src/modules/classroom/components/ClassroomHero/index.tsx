import { memo } from "react";
import { useGetCachedClassromById } from "../../hooks/useGetCachedClassromById";
import { Card } from "@/components/ui/cards/Card";
import { Avatar } from "@/components/ui/dataDisplay/Avatar";
import { emojis } from "@/utils/emojis";
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { RoleUser } from "@/modules/user/userTypets";
import { Trophy, Zap } from "lucide-react";
import { isNumber } from "@/utils/isType";
import { ClassroomHeroStat } from "./ClassroomHeroStat";

export const ClassroomHero = memo(
  ({ classroomUuid }: { classroomUuid: string }) => {
    const { cachedClassroom: classroom } =
      useGetCachedClassromById(classroomUuid);
    const { loggedUser } = useLoggedUser();

    const completedExercises = classroom?.userStats?.completedExercises;
    const totalXp = classroom?.userStats?.totalXp;
    const totalExercisesCount = classroom?.totalExercisesCount;

    return (
      <Card.Root className="bg-gradient-classroom-hero">
        <Card.Body className="p-0 sm:p-0">
          <div className="flex items-center gap-4 flex-row justify-between p-5">
            <div className="flex min-w-0 items-center gap-4">
              <Avatar
                name={classroom?.name}
                emoji={
                  classroom?.emoji
                    ? emojis[parseInt(classroom?.emoji)]
                    : undefined
                }
                bgColor={classroom?.color}
                size={64}
              />

              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-white/90">
                  Turma
                </p>

                <h1 className="truncate text-2xl font-black tracking-tight sm:text-3xl">
                  🏰 {classroom?.name}
                </h1>
                <p className="mt-0.5 truncate text-sm text-white/90">
                  Prof. {classroom?.author?.email}
                </p>
              </div>
            </div>

            <div className="flex">
              {loggedUser?.role === RoleUser.STUDENT && (
                <div className="grid grid-cols-2 gap-3">
                  {isNumber(totalXp) && (
                    <ClassroomHeroStat
                      value={totalXp.toString()}
                      icon={<Zap className="size-5" />}
                      label="XP"
                      color="oklch(0.62 0.22 275)"
                    />
                  )}
                  {isNumber(completedExercises) && (
                    <ClassroomHeroStat
                      value={`${completedExercises}/${totalExercisesCount}`}
                      icon={<Trophy className="size-5" />}
                      label="Troféus"
                      color="oklch(0.75 0.17 55)"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </Card.Body>
      </Card.Root>
    );
  },
);
ClassroomHero.displayName = "ClassroomHero";
