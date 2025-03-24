import axios, { CreateAxiosDefaults } from "axios";
import { envConfig } from "./envConfig";

export const axiosConfig: CreateAxiosDefaults = {
  baseURL: envConfig.BASE_API_URL,
};

export const apiBase = axios.create(axiosConfig);
