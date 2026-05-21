import * as Ably from "ably";

export const realtimeClient = new Ably.Realtime({
  key: import.meta.env.VITE_ABLY_API_KEY,
});

// TODO Adicionar em um provider global
realtimeClient.clientId = `client-${Math.random().toString(16).slice(2)}`;
