import { IExercise } from "@/modules/exercise/exerciseTypes";
import { Code } from "@/components/ui/dataDisplay/Code";
import { cn } from "@/utils/cn";
import { CustomDataTable } from "@/components/ui/dataDisplay/CustomDataTable";
import { Table } from "@/components/ui/dataDisplay/Table";
import { renderTiptapHtml } from "@/utils/tiptapHelpers";

interface ExerciseDescriptionProps {
  exercise: IExercise;
  orientation?: "horizontal" | "vertical";
}

export const ExerciseDescription = ({
  exercise,
  orientation = "vertical",
}: ExerciseDescriptionProps) => {
  return (
    <div
      className={cn(
        "grid gap-4 h-fit",
        orientation === "vertical" ? "grid-cols-1" : "grid-cols-12",
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-2 w-full",
          orientation === "horizontal" && "col-span-8",
        )}
      >
        <div
          className="text-sm tiptap"
          dangerouslySetInnerHTML={{
            __html: renderTiptapHtml(exercise?.description || ""),
          }}
        />
      </div>
      <div className={orientation === "horizontal" ? "col-span-4" : ""}>
        <CustomDataTable
          columns={["Entrada(s)", "Saída esperada"]}
          data={exercise?.testCases || []}
          idExtractor={(item) => `${item?.input}-${exercise?.id}`}
          renderItem={({ item }) => (
            <Table.Row>
              <Table.Data>
                <Code htmlContent={item?.input} />
              </Table.Data>
              <Table.Data>
                <Code htmlContent={item?.expectedOutput} />
              </Table.Data>
            </Table.Row>
          )}
        />
      </div>
    </div>
  );
};
