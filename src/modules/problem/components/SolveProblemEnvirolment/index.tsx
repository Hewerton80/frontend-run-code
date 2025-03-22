import { IProblem } from "../../problemTypes";
import { ProblemDescription } from "./ProblemDescription";
import { IDEProblem } from "./IDEProblem";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/feedback/Skeleton";

interface SolveProblemEnvirolmentProps {
  problem?: IProblem;
  isLoading?: boolean;
}

export const SolveProblemEnvirolment = ({
  isLoading,
  problem,
}: SolveProblemEnvirolmentProps) => {
  const skeleton = <Skeleton className="h-full w-full" />;

  return (
    <div className="flex h-ful w-full gap-4 ">
      <div className="grid grid-cols-12 gap-4 h-full w-full">
        <div className="col-span-3 h-full">
          {isLoading ? (
            skeleton
          ) : (
            <Suspense fallback={skeleton}>
              <ProblemDescription problem={problem!} />
            </Suspense>
          )}
        </div>
        <div className="flex flex-col col-span-9 h-full gap-4">
          {isLoading ? (
            skeleton
          ) : (
            <Suspense fallback={skeleton}>
              <IDEProblem problem={problem!} />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
};
