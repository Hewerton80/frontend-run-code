import { apiBase as _apiBase } from "@/utils/axiosConfig";
import { envConfig } from "@/utils/envConfig";
import axios, { CreateAxiosDefaults } from "axios";

export const useAxios = () => {
  const axiosConfig: CreateAxiosDefaults = {
    baseURL: envConfig.BASE_API_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  };
  const apiBase = axios.create(axiosConfig);
  return { apiBase, axiosConfig };
};
