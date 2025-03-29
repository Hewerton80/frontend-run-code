"use client";
import { Breadcrumbs } from "@/components/ui/dataDisplay";
import { ListProblemAcoordion } from "@/modules/listProblem/components/ListProblemAcoordion";

export default function ClassroomPage() {
  const listsProblems: IListProblem[] = [
    {
      id: "1",
      title: "Lista 1 - Operações lógicas básicas",
      startDate: "2024-01-01",
      endData: "2024-01-15",
      solved: 0,
      total: 3,
    },
    {
      id: "2",
      title: "Lista 2 - Estruturas de repetição",
      startDate: "2024-01-16",
      endData: "2024-01-30",
      solved: 3,
      total: 3,
    },
    {
      id: "3",
      title: "Lista 3 - Estruturas condicionais",
      startDate: "2024-02-01",
      endData: "2024-02-15",
      solved: 1,
      total: 3,
    },
    {
      id: "4",
      title: "Lista 4 - Funções e Recursão",
      startDate: "2024-02-16",
      endData: "2024-03-01",
      solved: 2,
      total: 8,
    },
  ];

  return (
    <div className="flex flex-col w-full gap-4 p-8">
      <Breadcrumbs
        items={[
          { label: "🏠 Home", href: "/" },
          { label: "Turma de programação 2024.2" },
          { label: "Listas" },
        ]}
      />
      <div className="flex flex-col">
        {listsProblems.map((listProblem) => (
          <ListProblemAcoordion
            key={`${listProblem?.id}-list-problem`}
            data={listProblem}
          />
        ))}
      </div>
    </div>
  );
}
