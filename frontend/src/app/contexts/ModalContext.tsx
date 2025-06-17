import { createContext, useContext, useState, useCallback } from "react";

interface ModalContextType {
  isAnyModalOpen: boolean;
  modalCount: number;
  openModal: () => void;
  closeModal: () => void;
  getModalZIndex: () => number;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalCount, setModalCount] = useState(0);

  const openModal = useCallback(() => {
    setModalCount((prev) => prev + 1);
  }, []);

  const closeModal = useCallback(() => {
    setModalCount((prev) => Math.max(0, prev - 1));
  }, []);

  const getModalZIndex = useCallback(() => {
    return 9999 + modalCount * 10;
  }, [modalCount]);

  const value = {
    isAnyModalOpen: modalCount > 0,
    modalCount,
    openModal,
    closeModal,
    getModalZIndex,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
