"use client";
import { Select, SelectOption } from "@/components/ui/forms/selects";
import { ComponentPropsWithoutRef, useCallback, useState } from "react";
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
  const [isLoadingTeachers, setIsLoadingTeachers] = useState(false);

  const [autocompliteOptions, setAutocompliteOptions] =
    useState<SelectOption[]>(defaultOptions);

  const getTeachers = useCallback(
    async (keyword: string) => {
      try {
        const { data } = await apiBase.get<IUser[]>("/user/teachers", {
          params: { keyword },
        });

        const teachersResponseOptions = data?.map((teacher) => ({
          label: `${teacher?.email} - ${teacher?.name} ${teacher?.surname}`,
          // label: <GroupedUserInfo user={teacher} />,
          value: teacher?.uuid,
        }));

        setAutocompliteOptions([...defaultOptions, ...teachersResponseOptions]);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      } finally {
        setIsLoadingTeachers(false);
      }
    },
    [apiBase, defaultOptions]
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

  return (
    <Select
      isLoading={isLoadingTeachers}
      options={autocompliteOptions}
      isSearchable
      onInputChange={onInputChange}
      {...restProps}
    />
  );
};
