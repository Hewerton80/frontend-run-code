import { useLanguage } from "@/modules/language/hooks/useLanguage";
import { useGetExercise } from "@/modules/exercise/hooks/useGetExercise";
import { IExercise } from "@/modules/exercise/exerciseTypes";
import { useSubmissionCode } from "@/modules/submission/hooks/useSubmitCode";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useGetClassroomById } from "@/modules/classroom/hooks/useGetClassroomById";
import { ClassroomKeys, IClassroom } from "@/modules/classroom/classroomType";
import { useQueryClient } from "@tanstack/react-query";

export const useIDEExercise = (exercise: IExercise) => {
  const params = useParams<{
    listId?: string;
    classroomId?: string;
  }>();
  const queryClient = useQueryClient();

  const { classroom } = useGetClassroomById(params?.classroomId!);

  const { submitCode, isSubmitting, submitError, submitResponse } =
    useSubmissionCode(exercise?.uuid || "");

  const { languageMode, changeLanguageMode } = useLanguage();

  const [sourceCode, setSourceCode] = useState("");

  const avaliableLanguages = useMemo(() => {
    return classroom?.languages?.split(",");
  }, [classroom]);

  // const sourceCodeRef = useRef(sourceCode);

  // useEffect(() => {
  //   sourceCodeRef.current = sourceCode;
  // }, [sourceCode]);

  useEffect(() => {
    if (exercise?.submissionStats?.sourceCode) {
      setSourceCode(exercise?.submissionStats?.sourceCode || "");
    }
    if (exercise?.submissionStats?.language) {
      changeLanguageMode(exercise.submissionStats?.language);
    }
  }, [exercise, changeLanguageMode]);

  // useEffect(() => {
  //   const isInterval = setInterval(() => {
  //     const drafts = getDraftsCodeFromLocalStorage() || {};
  //     if (exercise?.id) {
  //       drafts[exercise.id] = sourceCodeRef.current;
  //     }
  //     setCookie(CONSTANTS.LOCAL_STORAGE_KEYS.CODE_DRAFTS, JSON.stringify(drafts));
  //   }, 5000);

  //   return () => {
  //     clearInterval(isInterval);
  //   };
  // }, [exercise?.id]);

  const changeSourceCode = (value: string) => {
    setSourceCode(value);
  };

  //TODO ao submeter com sucesso, atualizar da lista, contabilizar o solved (solved)
  const handleSubmitCode = useCallback(() => {
    submitCode(
      {
        sourceCode,
        language: languageMode,
        classroomId: params?.classroomId,
        listId: params?.listId,
      },
      {
        onSuccess: (data) => {
          if (data?.isFirstCorrectSubmission && classroom?.uuid) {
            queryClient.setQueryData<IClassroom>(
              [ClassroomKeys.Details, classroom?.uuid],
              (currentClassroom) => {
                const listsRmp = [...(currentClassroom?.lists || [])]?.map(
                  (list) => {
                    return {
                      ...list,
                      solved:
                        list?.uuid === params?.listId
                          ? (list?.solved || 0) + 1
                          : list?.solved || 0,
                    };
                  }
                ) as IClassroom;
                return {
                  ...currentClassroom,
                  lists: listsRmp,
                } as IClassroom;
              }
            );
          }
        },
      }
    );
  }, [
    submitCode,
    sourceCode,
    languageMode,
    params?.classroomId,
    params?.listId,
    classroom?.uuid,
    queryClient,
  ]);

  return {
    sourceCode,
    isSubmitting,
    submitError,
    submitResponse,
    avaliableLanguages,
    changeSourceCode,
    submitCode: handleSubmitCode,
  };
};
