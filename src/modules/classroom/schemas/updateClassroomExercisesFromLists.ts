import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";

export const updateClassroomExercisesFromListsSchema = z.object({
  exercises: z.array(
    z
      .object({
        removed: z.boolean(),
        id: z.number(),
        uuid: z.string(),
        title: z.string(),
        category: z
          .object({
            id: z.string(),
            name: z.string(),
          })
          .partial(),
        createdAt: z.string(),
        author: z
          .object({
            avatarBgColor: z.string(),
            avatarFontColor: z.string(),
            avatarUrl: z.string(),
            email: z.string(),
            name: z.string(),
            surname: z.string(),
            uuid: z.string(),
          })
          .partial(),
      })
      .partial()
  ),
});

export type IUpdateClassroomExercisesFromListFrom = z.infer<
  typeof updateClassroomExercisesFromListsSchema
>;

export const useUdateClassroomExercisesFromListsSchema = () => {
  const {
    control,
    formState: formStateExercisesForm,
    reset: resetExercisesForm,
    getValues: getValuesExercisesForm,
  } = useForm<IUpdateClassroomExercisesFromListFrom>({
    defaultValues: { exercises: [] },
    resolver: zodResolver(updateClassroomExercisesFromListsSchema),
    mode: "onSubmit",
  });

  const {
    update: updateExerciseState,
    append: appendExercise,
    remove: removeExercise,
    fields: exercisesToAdd,
  } = useFieldArray({
    control,
    name: "exercises",
  });

  return {
    exercisesToAdd,
    updateExerciseState,
    appendExercise,
    removeExercise,
    resetExercisesForm,
    getValuesExercisesForm,
    formStateExercisesForm,
  };
};
