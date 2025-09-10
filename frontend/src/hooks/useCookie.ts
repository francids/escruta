import { useState } from "react";
import Cookies from "js-cookie";

const cookieOptions: Cookies.CookieAttributes = {
  expires: 30,
  secure: true,
};

export default function useCookie<T>(
  keyName: string,
  defaultValue?: T,
  options: Cookies.CookieAttributes = cookieOptions
): [T | undefined, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    try {
      const value = Cookies.get(keyName);
      if (value && value !== "undefined") {
        return JSON.parse(value) as T;
      } else {
        if (defaultValue !== undefined) {
          Cookies.set(keyName, JSON.stringify(defaultValue), options);
        }
        return defaultValue;
      }
    } catch (err: unknown) {
      console.error("Error getting cookie:", err);
      return defaultValue;
    }
  });

  const setValue = (newValue: T) => {
    try {
      if (newValue !== undefined) {
        Cookies.set(keyName, JSON.stringify(newValue), options);
      } else {
        Cookies.remove(keyName);
      }
    } catch (err: unknown) {
      console.error("Error setting cookie:", err);
    }
    setStoredValue(newValue);
  };

  return [storedValue, setValue] as const;
}
