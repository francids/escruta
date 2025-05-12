import { useState } from "react";
import Cookies from "js-cookie";

export default function useCookie<T>(keyName: string, defaultValue?: T) {
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    try {
      const value = Cookies.get(keyName);
      if (value) {
        return JSON.parse(value) as T;
      } else {
        Cookies.set(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err: unknown) {
      console.error("Error getting cookie:", err);
      return undefined;
    }
  });

  const setValue = (newValue: T) => {
    try {
      Cookies.set(keyName, JSON.stringify(newValue));
    } catch (err: unknown) {
      console.error("Error setting cookie:", err);
    }
    setStoredValue(newValue);
  };

  return [storedValue, setValue] as const;
}
