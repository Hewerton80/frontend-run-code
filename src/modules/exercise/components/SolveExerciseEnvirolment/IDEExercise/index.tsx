import { Button } from "@/components/ui/buttons/Button";
import { IDE } from "@/modules/submission/components/IDE";
import { FetchExerciseByUuIdResponse } from "@/modules/exercise/hooks/useFetchExerciseByUuId";
import { useIDEExercise } from "./useIDEExercises";

interface IDEExerciseProps {
  exercise: FetchExerciseByUuIdResponse;
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
