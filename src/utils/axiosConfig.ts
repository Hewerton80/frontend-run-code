import axios, { CreateAxiosDefaults } from "axios";
import { config } from "./config";

export const axiosConfig: CreateAxiosDefaults = {
  baseURL: config.BASE_API_URL,
};

export const apiBase = axios.create(axiosConfig);
