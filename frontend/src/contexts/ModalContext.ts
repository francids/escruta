import { createContext } from "react";

interface ModalContextType {
  isAnyModalOpen: boolean;
  modalCount: number;
  openModal: (id: string) => void;
  closeModal: (id: string) => void;
  getModalZIndex: (id: string) => number;
  isTopModal: (id: string) => boolean;
}

export default createContext<ModalContextType | undefined>(undefined);
