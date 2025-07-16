import { useState } from "react";

interface ISessionStorage {
  access_token: string;
}

type SessionsStorageKey = keyof ISessionStorage;

export const useSessionStorage = (key: SessionsStorageKey) => {
  const [storedValue, setStoredValue] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem(key) || null;
    }
    return null;
  });

  const handleSetStoredValue = (value: string) => {
    setStoredValue(value);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("access_token", value);
    }
  };

  const clearStoredValue = () => {
    setStoredValue(null as unknown as SessionsStorageKey);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("access_token");
    }
  };

  return [storedValue, handleSetStoredValue, clearStoredValue] as const;
};
