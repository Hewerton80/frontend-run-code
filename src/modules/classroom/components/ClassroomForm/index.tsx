"use client";
import { Button } from "@/components/ui/buttons/Button";
import { Card } from "@/components/ui/cards/Card";
import { Breadcrumbs } from "@/components/ui/dataDisplay/Breadcrumb";
import { Checkbox } from "@/components/ui/forms/Checkbox";
import { Input } from "@/components/ui/forms/inputs/Input";
import { useClassroomForm } from "./useClassroomForm";
import { Controller } from "react-hook-form";
import { Switch } from "@/components/ui/forms/Switch";

export const ClassroomForm = () => {
  const {
    teachers,
    classroomFormState,
    classroomFormControl,
    addTeacher,
    registerClassroomForm,
  } = useClassroomForm();

  return (
    <div className="flex flex-col gap-4 w-full p-8">
      <Breadcrumbs
        items={[{ label: "🏠 Home", href: "/home" }, { label: "Criar turma" }]}
      />
      <Card.Root asChild>
        <form onSubmit={(e) => e.preventDefault()}>
          <Card.Header>
            <Card.Title>Criar turma</Card.Title>
          </Card.Header>

          <Card.Body>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12">
                <Input
                  {...registerClassroomForm("name")}
                  id={registerClassroomForm("name").name}
                  label="Nome"
                  placeholder="Turma 2025.2"
                  required
                  error={classroomFormState.errors.name?.message}
                />
              </div>
              <div className="flex items-end col-span-12">
                <Controller
                  name="isVisible"
                  control={classroomFormControl}
                  render={({ field: { onChange, value, ...restField } }) => (
                    <Switch
                      {...restField}
                      id={restField.name}
                      checked={value}
                      onCheckedChange={onChange}
                      label="Visível para os alunos"
                    />
                  )}
                />
              </div>
              {/* <Card.Root className="col-span-12"> */}
              {/* <Card.Body asChild> */}
              <h6 className="font-medium text-base col-span-12">
                Gerenciamento de professores
              </h6>
              <div className="flex flex-col col-span-12 gap-3">
                {teachers.map((teacher, index) => (
                  <Card.Root
                    key={index}
                    className="flex flex-col gap-4 px-3 py-4"
                  >
                    <Input
                      {...registerClassroomForm(`teachers.${index}.id`)}
                      id={registerClassroomForm(`teachers.${index}.id`).name}
                      label="Nome do professor"
                      placeholder="Nome do professor"
                      required
                      error={
                        classroomFormState.errors.teachers?.[index]?.id?.message
                      }
                    />
                    <div className="flex flex-wrap gap-4">
                      <Controller
                        name={`teachers.${index}.canEditClassroom`}
                        control={classroomFormControl}
                        render={({
                          field: { onChange, value, ...restField },
                        }) => (
                          <Checkbox
                            {...restField}
                            id={restField.name}
                            checked={value}
                            onCheckedChange={onChange}
                            label="Pode editar a turma"
                          />
                        )}
                      />
                      <Controller
                        name={`teachers.${index}.canManageTeachers`}
                        control={classroomFormControl}
                        render={({
                          field: { onChange, value, ...restField },
                        }) => (
                          <Checkbox
                            {...restField}
                            id={restField.name}
                            checked={value}
                            onCheckedChange={onChange}
                            label="Pode gerenciar professores"
                          />
                        )}
                      />
                    </div>
                  </Card.Root>
                ))}
                <Button
                  variantStyle="secondary"
                  type="button"
                  onClick={addTeacher}
                >
                  Adicionar professor
                </Button>
              </div>
              {/* </Card.Body> */}
              {/* </Card.Root> */}
            </div>
          </Card.Body>
          <Card.Footer className="gap-4" orientation="end">
            <Button variantStyle="secondary" type="button">
              Cancelar
            </Button>
            <Button type="submit">Criar</Button>
          </Card.Footer>
        </form>
      </Card.Root>
    </div>
  );
};
