import { useState } from "react";
import Cookies from "js-cookie";

export const useCookie = (keyName: string, defaultValue: object) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = Cookies.get(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        Cookies.set(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err: unknown) {
      console.error("Error getting cookie:", err);
      return defaultValue;
    }
  });

  const setValue = (newValue: object) => {
    try {
      Cookies.set(keyName, JSON.stringify(newValue));
    } catch (err: unknown) {
      console.error("Error setting cookie:", err);
    }
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};
