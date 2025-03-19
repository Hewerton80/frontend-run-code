import axios, { CreateAxiosDefaults } from "axios";

export const axiosConfig: CreateAxiosDefaults = {
  baseURL: "http://localhost:3500/api",
};

export const apiBase = axios.create(axiosConfig);
