import { Button } from "@/components/ui/buttons/Button";
import { IExercise } from "@/modules/exercise/exerciseTypes";
import { IDE } from "@/modules/submission/components/IDE";
import { useIDEExercise } from "./useIDEExercises";
import { TerminalCode } from "@/components/ui/dataDisplay/TerminalCode";
import { ThreeDotsLoading } from "@/components/ui/feedback/ThreeDotsLoading";
import {
  SUBMISSION_META,
  SubmissionStatus,
} from "@/modules/submission/submissionType";
import { Badge } from "@/components/ui/dataDisplay/Badge";
import { Tabs } from "@/components/ui/navigation/Tabs";
import { useMemo } from "react";
import { Alert } from "@/components/ui/feedback/Alert";
import { Tooltip } from "@/components/ui/overlay/Tooltip";
import { TestCasesResultsDisplay } from "../TestCasesResultsDisplay";

interface IDEExerciseProps {
  exercise: IExercise;
}

export const IDEExercise = ({ exercise }: IDEExerciseProps) => {
  // console.log(exercise);

  const {
    sourceCode,
    isSubmitting,
    submitError,
    avaliableLanguages,
    submissionsResult,
    createSubmission,
    changeSourceCode,
  } = useIDEExercise(exercise);

  // TODO adicionar salvar rascunho

  return (
    <>
      <div className="flex flex-col w-full col-span-8 h-full gap-4">
        <IDE
          value={sourceCode}
          avaliableLanguages={avaliableLanguages}
          onChange={changeSourceCode}
        />
        <div className="flex justify-end ">
          <Button
            variantStyle="info"
            isLoading={isSubmitting}
            onClick={createSubmission}
            disabled={!sourceCode?.trim()}
          >
            Executar 🚀
          </Button>
        </div>

        {isSubmitting && (
          <div className="pl-0.5 pb-0.5">
            <ThreeDotsLoading />
          </div>
        )}
        {submitError && (
          <TerminalCode content={submitError?.description || ""} />
        )}
      </div>
    </>
  );
};
