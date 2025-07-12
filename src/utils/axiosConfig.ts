import axios, { CreateAxiosDefaults } from "axios";
import { envConfig } from "./envConfig";
import { getRequestHeaders } from "./getRequestHeaders";

export const axiosConfig: CreateAxiosDefaults = {
  baseURL: envConfig.BASE_API_URL,
  headers: { ...getRequestHeaders() },
};

export const apiBase = axios.create(axiosConfig);
