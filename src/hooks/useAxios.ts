import { envConfig } from "@/utils/envConfig";
import axios, { CreateAxiosDefaults } from "axios";
import { useSessionStorage } from "./useSessionStorage";

export const useAxios = () => {
  const [access_token] = useSessionStorage("access_token");

  const axiosConfig: CreateAxiosDefaults = {
    baseURL: envConfig.BASE_API_URL,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  const apiBase = axios.create(axiosConfig);
  return { apiBase };
};
