"use client";
import { Select, SelectOption } from "@/components/ui/forms/selects";
import {
  ComponentPropsWithoutRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAxios } from "@/hooks/useAxios";
import { IUser } from "../../userTypets";
import { useDebouncedCallback } from "use-debounce";

interface IAsyncTeacherSelectProps
  extends ComponentPropsWithoutRef<typeof Select> {
  defaultOptions?: SelectOption[];
}

export const AsyncTeacherSelect = ({
  defaultOptions = [],
  ...restProps
}: IAsyncTeacherSelectProps) => {
  const { apiBase } = useAxios();
  const [responseTeachers, setResponseTeachers] = useState<IUser[]>([]);
  const [isLoadingTeachers, setIsLoadingTeachers] = useState(false);

  const defaultOptionsRecords = useMemo<Record<string, SelectOption>>(
    () =>
      defaultOptions.reduce((acc, option) => {
        acc[option?.value!] = option;
        return acc;
      }, {} as Record<string, SelectOption>),
    [defaultOptions]
  );

  const [autocompliteOptions, setAutocompliteOptions] =
    useState<SelectOption[]>(defaultOptions);

  useEffect(() => {
    setAutocompliteOptions([
      ...defaultOptions,
      ...(responseTeachers?.map((teacher) => ({
        label: `${teacher?.email} - ${teacher?.name} ${teacher?.surname}`,
        value: String(teacher?.id),
      })) || []),
    ]);
  }, [responseTeachers, defaultOptions]);

  // const autocompliteOptions = useMemo<SelectOption[]>(() => {
  //   return (
  //     responseTeachers?.map((teacher) => ({
  //       label: `${teacher?.email} - ${teacher?.name} ${teacher?.surname}`,
  //       value: String(teacher?.id),
  //     })) || []
  //   );
  // }, [responseTeachers]);

  const getTeachers = useCallback(
    async (keyword: string) => {
      try {
        const { data } = await apiBase.get<IUser[]>(`/user/teachers`, {
          params: { keyword },
        });
        setResponseTeachers(
          (data || []).filter((teacher) => !defaultOptionsRecords[teacher?.id!])
        );
      } catch (error) {
        console.error("Error fetching teachers:", error);
      } finally {
        setIsLoadingTeachers(false);
      }
    },
    [apiBase, defaultOptionsRecords]
  );

  const handleChangeInputTextDebounced = useDebouncedCallback(
    useCallback(
      (keyword: string) => {
        if (!keyword) {
          setIsLoadingTeachers(false);
          return;
        }
        getTeachers(keyword);
      },
      [getTeachers]
    ),
    1000
  );

  const onInputChange = useCallback(
    (keyword: string) => {
      handleChangeInputTextDebounced(keyword);
      setIsLoadingTeachers(true);
    },
    [handleChangeInputTextDebounced]
  );

  useEffect(() => {
    console.log("autocompliteOptions", autocompliteOptions);
  }, [autocompliteOptions]);

  return (
    <Select
      // inputValue={restProps?.value ? undefined : restProps?.inputValue}
      isLoading={isLoadingTeachers}
      options={autocompliteOptions}
      isSearchable
      onInputChange={onInputChange}
      {...restProps}
    />
  );
};
