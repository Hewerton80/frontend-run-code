import { memo } from "react";
import { useGetCachedClassrom } from "../../hooks/useGetCachedClassrom";
import { Card } from "@/components/ui/cards/Card";
import { Avatar } from "@/components/ui/dataDisplay/Avatar";
import { emojis } from "@/utils/emojis";

export const ClassroomHeader = memo(
  ({ classroomUuid }: { classroomUuid: string }) => {
    const { cachedClassroom: classroom } = useGetCachedClassrom(classroomUuid);
    return (
      <Card.Root>
        <Card.Body className="p-0 sm:p-0">
          <div className="flex items-center gap-4 flex-row justify-between p-5">
            <div className="flex min-w-0 items-center gap-4">
              <Avatar
                name={classroom?.name}
                emoji={emojis[parseInt(classroom?.emoji)]}
                bgColor={classroom?.color}
                size={64}
              />
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Turma
                </p>

                <h1 className="truncate text-2xl font-black tracking-tight sm:text-3xl">
                  🏰 {classroom?.name}
                </h1>
                <p className="mt-0.5 truncate text-sm text-muted-foreground">
                  Prof. {classroom?.author?.email}
                </p>
              </div>
            </div>
            <div></div>
          </div>
        </Card.Body>
      </Card.Root>
    );
  },
);
