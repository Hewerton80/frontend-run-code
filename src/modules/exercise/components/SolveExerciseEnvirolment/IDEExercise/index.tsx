import { Button } from "@/components/ui/buttons/Button";
import { IExercise } from "@/modules/exercise/exerciseTypes";
import { IDE } from "@/modules/submission/components/IDE";
import { useIDEExercise } from "./useIDEExercises";
import { TerminalCode } from "@/components/ui/dataDisplay/TerminalCode";

interface IDEExerciseProps {
  exercise: IExercise;
}

export const IDEExercise = ({ exercise }: IDEExerciseProps) => {
  // console.log(exercise);

  const {
    sourceCode,
    isSubmitting,
    avaliableLanguages,
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
            Submeter 🚀
          </Button>
        </div>
      </div>
    </>
  );
};
