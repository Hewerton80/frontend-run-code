import axios, { CreateAxiosDefaults } from "axios";

export const axiosConfig: CreateAxiosDefaults = {
  baseURL: "http://localhost:3100/api",
};

export const apiBase = axios.create(axiosConfig);
