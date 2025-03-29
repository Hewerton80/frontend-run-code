import { Card } from "@/components/ui/cards/Card";
import { Accordion } from "@/components/ui/dataDisplay/Accordion";
import ProgressLink from "@/components/ui/navigation/ProgressLink/ProgressLink";
import { twMerge } from "tailwind-merge";
import { FaCode } from "react-icons/fa";
import { ProgressBar } from "@/components/ui/feedback/ProgressBar";

interface ListProblemAcoordionProps {
  data: IListProblem;
}

export function ListProblemAcoordion({
  data: listProblem,
}: ListProblemAcoordionProps) {
  const problems = [
    {
      title: "Soma de a + b",
      avaliation: "✅",
    },
    {
      title: "Subtração de a - b",
      avaliation: "❌",
    },
    {
      title: "Multiplicação de a * b",
      avaliation: "🕒",
    },
  ];

  const solved = listProblem?.solved || 0;
  const total = listProblem?.total || 0;

  const progress = solved ? Math.round((solved / total) * 100) : 0;

  return (
    <Accordion.Root
      onValueChange={(value) => console.log({ value })}
      collapsible
      type="single"
    >
      <Accordion.Item className="line-clamp-1" value={listProblem?.id}>
        <div className="flex flex-col w-full pb-3 gap-2">
          <Accordion.Trigger className="pb-0">
            {listProblem?.title}
          </Accordion.Trigger>
          <ProgressBar
            showValue
            value={progress}
            customValueText={`(${solved}/${total})`}
          />
        </div>
        <Accordion.Content>
          <div className="grid grid-cols-3 gap-4">
            {problems.map((problem, index) => (
              <Card.Root
                key={index}
                asChild
                className={twMerge(
                  "p-4 shadow-md border-none",
                  "bg-linear-to-r from-blue-500 to-blue-700",
                  "hover:from-blue-400 hover:to-blue-600",
                  "duration-300 ease-in-out"
                )}
              >
                <ProgressLink href="/classroom">
                  <div className="flex gap-1 group">
                    <div className="flex flex-col">
                      <h4 className="text-xl font-bold text-white mb-4 line-clamp-1">
                        {problem.title}
                      </h4>
                      <p className="text-base text-white line-clamp-1">
                        Situação: {problem.avaliation}
                      </p>
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
            ))}
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}
