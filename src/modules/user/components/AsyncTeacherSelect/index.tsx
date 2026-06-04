import { ReactNode, useCallback, useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import { IUser } from "../../userTypets";
import { AsyncSelect } from "@/components/ui/forms/selects/AsyncSelect";
import { GroupedUserInfo } from "../GroupedUserInfo";

export type SelectOption = { label: string; value?: string };

interface IAsyncTeacherSelectProps {
  label?: string;
  error?: string;
  required?: boolean;
  id?: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  disabled?: boolean;
}

export const AsyncTeacherSelect = ({
  value,
  onChange,
  ...restProps
}: IAsyncTeacherSelectProps) => {
  const { apiBase } = useAxios();
  // const [isLoadingTeachers, setIsLoadingTeachers] = useState(false);

  // const [autocompliteOptions, setAutocompliteOptions] =
  //   useState<SelectOption[]>(defaultOptions);

  // const getTeachers = useCallback(
  //   async (keyword: string) => {
  //     try {
  //       const { data } = await apiBase.get<IUser[]>("/user/teachers", {
  //         params: { keyword },
  //       });

  //       setAutocompliteOptions([...defaultOptions, ...teachersResponseOptions]);
  //     } catch (error) {
  //       console.error("Error fetching teachers:", error);
  //     } finally {
  //       setIsLoadingTeachers(false);
  //     }
  //   },
  //   [apiBase, defaultOptions],
  // );

  // const handleChangeInputTextDebounced = useDebouncedCallback(
  //   useCallback(
  //     (keyword: string) => {
  //       if (!keyword) {
  //         setIsLoadingTeachers(false);
  //         return;
  //       }
  //       getTeachers(keyword);
  //     },
  //     [getTeachers],
  //   ),
  //   1000,
  // );

  // const onInputChange = useCallback(
  //   (keyword: string) => {
  //     handleChangeInputTextDebounced(keyword);
  //     setIsLoadingTeachers(true);
  //   },
  //   [handleChangeInputTextDebounced],
  // );

  const [teachersMap, setTeachersMap] = useState<
    Record<string, { label: string; renderReactNode: ReactNode }>
  >({});

  const fetchTeachers = useCallback(
    async (keyword: string, signal: AbortSignal): Promise<string[]> => {
      try {
        const { data } = await apiBase.get<IUser[]>("/user/teachers", {
          params: { keyword },
          signal,
        });
        return (data ?? []).map((teacher) => {
          setTeachersMap((prev) => {
            const newMap = { ...prev };
            newMap[teacher.uuid] = {
              label: `${teacher?.email} - ${teacher?.name} ${teacher?.surname}`,
              renderReactNode: <GroupedUserInfo user={teacher} />,
            };
            return newMap;
          });
          return teacher?.uuid;
        });
      } catch (err) {
        if ((err as { name?: string })?.name !== "AbortError") {
          console.error("Error fetching teachers:", err);
        }
        return [];
      }
    },
    [apiBase],
  );

  return (
    <AsyncSelect<string>
      {...restProps}
      fetchItems={fetchTeachers}
      value={value ?? null}
      displayItem={(s) => teachersMap[s]?.label ?? ""}
      renderItem={(s) => teachersMap[s]?.renderReactNode ?? ""}
      valueExtractor={(s) => s}
      onChangeValue={(s) => onChange?.(s ?? "")}
      hintText="Digite para buscar professores"
      searchingText="Buscando professores…"
    />
  );
};
