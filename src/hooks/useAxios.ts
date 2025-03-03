import { apiBase as _apiBase } from "@/utils/axiosConfig";

export const useAxios = () => {
  const apiBase = _apiBase;
  return { apiBase };
};
