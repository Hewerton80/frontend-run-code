import { Card } from "@/components/ui/cards/Card";
import ProgressLink from "@/components/ui/navigation/ProgressLink/ProgressLink";
import { twMerge } from "tailwind-merge";
import { IProblem } from "../../problemTypes";
import { FaCode } from "react-icons/fa";
import { Tooltip } from "@/components/ui/overlay/Tooltip";

interface ProblemCardProps {
  data: IProblem;
}

const problemSolveStatusEmojis: Record<number, { icon: string; name: string }> =
  {
    1: { icon: "✅", name: "Resolvida" },
    2: { icon: "❌", name: "Errada" },
    3: { icon: "🕒", name: "Aguardando submissão" },
  };

export function ProblemCard({ data: problem }: ProblemCardProps) {
  const status = problem?.status as number;

  const solveStatusEmoji = problemSolveStatusEmojis?.[status]?.icon;

  const solveStatusName = problemSolveStatusEmojis?.[status]?.name;

  return (
    <Card.Root
      asChild
      className={twMerge(
        "p-4 shadow-md border-none group",
        "bg-linear-to-r from-blue-500 to-blue-700",
        "hover:from-blue-500/80 hover:to-blue-700/80",
        "duration-300 ease-in-out transition"
      )}
    >
      <ProgressLink
        href={`/classroom/${problem?.classroom?.uuid}/lists/${problem?.listProblem?.uuid}/problem/${problem?.uuid}`}
      >
        <div className="flex gap-1 ">
          <div className="flex flex-col">
            <Tooltip align="start" textContent={problem?.title}>
              <h4 className="text-lg font-bold text-white mb-4 line-clamp-1">
                {problem?.title}
              </h4>
            </Tooltip>
            {solveStatusEmoji && (
              <Tooltip
                align="start"
                textContent={
                  <div className="flex flex-col gap-1">
                    <p className="font-bold">
                      {solveStatusName} {solveStatusEmoji}
                    </p>
                    {/* <p>
                      {totalSubmissionsCount === 1
                        ? `${totalSubmissionsCount} Submissão`
                        : `${totalSubmissionsCount} Submissões`}
                    </p> */}
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
              "duration-500 ease-in-out"
            )}
          />
        </div>
      </ProgressLink>
    </Card.Root>
  );
}
