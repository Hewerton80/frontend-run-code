import { Button } from "@/components/ui/buttons/Button";
import { useExercissesTable } from "./useExercissesTable";
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { Link } from "react-router-dom";
import { RoleUser } from "@/modules/user/userTypets";
import { Card } from "@/components/ui/cards/Card";
import { ROUTES } from "@/routes/routes";
import { CustomDataTable } from "@/components/ui/dataDisplay/CustomDataTable";
import { ExerciseTableRow } from "./ExerciseTableRow";
import { Drawer } from "@/components/ui/overlay/Drawer";
import { useState } from "react";
import { ExerciseForm } from "../ExerciseFormDrawer";

export const ExercisesTable = () => {
  const { loggedUser } = useLoggedUser();

  const {
    isFetchingExercises,
    exerciseUuids,
    pagination,
    exercisesError,
    refetchExercises,
  } = useExercissesTable();

  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4 w-full p-8">
        <div className="flex justify-between items-end gap-4">
          <Card.Title>🧩 Exercícios</Card.Title>
          {loggedUser?.role === RoleUser.TEACHER && (
            <Button asChild>
              <Link to={ROUTES.EXERCISES_CREATE}>Criar Exercício</Link>
            </Button>
          )}
        </div>

        <CustomDataTable
          columns={["Título", "Categoria", "Dificuldade", "Autor(a)", ""]}
          data={exerciseUuids}
          idExtractor={(uuid) => uuid}
          isLoading={isFetchingExercises}
          errorMessage={
            exercisesError
              ? (exercisesError as any)?.response?.data?.message ||
                "Erro ao carregar exercícios"
              : undefined
          }
          onRetry={refetchExercises}
          pagination={pagination}
          numberOfSkeletonRows={10}
          renderItem={({ item: uuid }) => (
            <ExerciseTableRow exerciseUuid={uuid} />
          )}
        />
        <Button onClick={() => setOpenDrawer(true)}>Abrir Drawer</Button>
      </div>
      <ExerciseForm.Drawer />
      {/* <Drawer.Root open={openDrawer} onOpenChange={setOpenDrawer}>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Exercício</Drawer.Title>
          </Drawer.Header>
          <p>dsadasd</p>
          <Drawer.Footer>
            <Button
              variantStyle="secondary"
              onClick={() => setOpenDrawer(false)}
            >
              Fechar
            </Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Root> */}
    </>
  );
};
