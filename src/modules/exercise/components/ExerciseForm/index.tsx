import { Button } from "@/components/ui/buttons/Button";
import { IconButton } from "@/components/ui/buttons/IconButton";
import { Card } from "@/components/ui/cards/Card";
import { Breadcrumbs } from "@/components/ui/dataDisplay/Breadcrumb";
import { DivTable } from "@/components/ui/dataDisplay/DivTable";
import { Resizable } from "@/components/ui/dataDisplay/Resizable";
import { Input } from "@/components/ui/forms/inputs/Input";
import { EnterMultSelect } from "@/components/ui/forms/selects";
import { Switch } from "@/components/ui/forms/Switch";
import { Textarea } from "@/components/ui/forms/Textarea/Textarea";
import { BackLink } from "@/components/ui/navigation/BackLink";
import { Tooltip } from "@/components/ui/overlay/Tooltip";
import { IDE } from "@/modules/submission/components/IDE";
import { getRange } from "@/utils/getRange";
import { BsTrash } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

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
        <Resizable.Group
          direction="horizontal"
          className={twMerge(
            "flex size-full min-h-[468px] rounded-lg overflow-hidden border",
            "border-l-3 border-l-info rounded-l-none"
          )}
        >
          <Resizable.Panel
            defaultSize={30}
            minSize={15}
            className="h-full w-full flex-3/4"
          >
            <form
              className="flex flex-col gap-4 p-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                required
                label="Título"
                placeholder="Digite o título do exercício"
              />
              <Textarea
                required
                label="Descrição"
                placeholder="Digite a descrição do exercício"
              />
              <DivTable.Container>
                <DivTable.Row header>
                  <DivTable.Data>Entradas de Teste (inputs)</DivTable.Data>
                  <DivTable.Data>Saídas Esperadas (outputs)</DivTable.Data>
                  <DivTable.Data>Público</DivTable.Data>
                  {/* <DivTable.Data></DivTable.Data> */}
                </DivTable.Row>
                {getRange(0, 8).map((index) => {
                  const isDisabled = index === 2;
                  return (
                    <DivTable.Row
                      disableAccordion
                      key={`test-case-row-${index}-list`}
                    >
                      <DivTable.Data>
                        <div className="w-full">
                          <EnterMultSelect
                            disabled={isDisabled}
                            value={[
                              { label: "10", value: "10" },
                              { label: "20", value: "20" },
                              { label: "30", value: "30" },
                              { label: "110", value: "110" },
                              { label: "210", value: "210" },
                              { label: "310", value: "310" },
                            ]}
                            // value={inputs}
                            // onChange={setInputs}
                            placeholder={`Entrada de Teste (${index + 1})`}
                          />
                        </div>
                      </DivTable.Data>
                      <DivTable.Data>
                        <Textarea
                          disabled={isDisabled}
                          required
                          placeholder={`Saída Esperada (${index + 1})`}
                        />
                      </DivTable.Data>
                      <DivTable.Data className="gap-8 justify-between">
                        <Switch disabled={isDisabled} />
                        <Tooltip textContent="Remover caso de teste">
                          <IconButton
                            variantStyle="danger"
                            icon={<BsTrash />}
                          />
                        </Tooltip>
                      </DivTable.Data>
                      {/* <DivTable.Data>
                      
                    </DivTable.Data> */}
                    </DivTable.Row>
                  );
                })}
              </DivTable.Container>
              <div className="flex justify-end">
                <Button
                // isLoading={isRunningCode} onClick={handleSubmit}
                >
                  Run Code 🚀
                </Button>
              </div>
              <div className="flex flex-col h-full gap-4">
                <p>Output:</p>
                {/* {isRunningCode && <ThreeDotsLoading />}
                {runCodeResponse && (
                  <TerminalCode content={runCodeResponse?.output || ""} />
                )}
                {runCodeError && (
                  <TerminalCode content={runCodeError?.description || ""} />
                )} */}
              </div>
            </form>
          </Resizable.Panel>
          <Resizable.Handle withHandle />
          <Resizable.Panel
            defaultSize={20}
            minSize={15}
            className="flex flex-1/4 w-full flex-col col-span-8 h-full gap-4"
          >
            <div className="p-4">
              <IDE
              // value={editorValue} onChange={setEditorValue}
              />
            </div>
          </Resizable.Panel>
        </Resizable.Group>
      </div>
    </>
  );
};
