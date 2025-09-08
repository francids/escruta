import { createContext } from "react";

type ToastType = "success" | "error" | "info" | "warning";

export interface ToastData {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
  icon?: React.ReactNode;
}

export interface ToastContextType {
  toasts: ToastData[];
  showToast: (
    message: string,
    type?: ToastType,
    options?: Partial<Omit<ToastData, "id" | "message" | "type">>
  ) => void;
  hideToast: (id: string) => void;
  clearToasts: () => void;
}

export default createContext<ToastContextType | null>(null);
