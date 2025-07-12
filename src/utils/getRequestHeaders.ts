import { envConfig } from "./envConfig";

export const getRequestHeaders = () => ({
  Authorization: `Bearer ${envConfig.TOKEN}`,
});
