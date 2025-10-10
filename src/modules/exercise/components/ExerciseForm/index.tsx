import { Breadcrumbs } from "@/components/ui/dataDisplay/Breadcrumb";
import { BackLink } from "@/components/ui/navigation/BackLink";

export const ExerciseForm = () => {
  return (
    <>
      <div className="flex flex-col w-full gap-4 p-8">
        <Breadcrumbs
          // isLoading={isExercisesLoading}
          items={[
            { label: "🧩 Exercícios", href: "/exercises" },
            {
              label: "Criar Exercício",
            },
          ]}
        />
        <div className="flex">
          <BackLink to="/exercises">Voltar para lista de exercícios</BackLink>
        </div>
      </div>
    </>
  );
};
