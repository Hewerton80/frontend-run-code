import axios, { CreateAxiosDefaults } from "axios";

export const axiosConfig: CreateAxiosDefaults = {
  baseURL: "http://localhost:3001/api",
};

export const apiBase = axios.create(axiosConfig);
