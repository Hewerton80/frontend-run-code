import * as Ably from "ably";
import { envConfig } from "./envConfig";
import axios from "axios";

export const realtimeClient = new Ably.Realtime({
  authCallback: async (_tokenParams, callback) => {
    const accessToken = sessionStorage.getItem("access_token"); // seu store/context
    console.log("accessToken", accessToken);
    try {
      const res = await axios.get(`${envConfig.BASE_API_URL}/auth/ably-token`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const tokenRequest = res.data;
      console.log("tokenRequest", tokenRequest);
      callback(null, tokenRequest); // SDK troca com o Ably automaticamente
    } catch (err) {
      callback(err as any, null);
    }
  },
});
