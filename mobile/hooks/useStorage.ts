import { MMKV } from "react-native-mmkv";

export default function useStorage() {
  const storage = new MMKV();

  function setItem<T>(key: string, value: T) {
    storage.set(key, JSON.stringify(value));
  }

  function getItem<T>(key: string): T | null {
    const value = storage.getString(key);
    return value ? JSON.parse(value) : null;
  }

  function removeItem(key: string) {
    storage.delete(key);
  }

  return { setItem, getItem, removeItem };
}
