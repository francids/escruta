import { createContext, useContext, useState, useCallback } from "react";

interface ModalContextType {
  isAnyModalOpen: boolean;
  modalCount: number;
  openModal: (id: string) => void;
  closeModal: (id: string) => void;
  getModalZIndex: (id: string) => number;
  isTopModal: (id: string) => boolean;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalStack, setModalStack] = useState<string[]>([]);

  const openModal = useCallback((id: string) => {
    setModalStack((prev) => [...prev, id]);
  }, []);

  const closeModal = useCallback((id: string) => {
    setModalStack((prev) => prev.filter((modalId) => modalId !== id));
  }, []);

  const getModalZIndex = useCallback(
    (id: string) => {
      const index = modalStack.indexOf(id);
      return index >= 0 ? 9999 + index * 10 : 9999;
    },
    [modalStack]
  );

  const isTopModal = useCallback(
    (id: string) => {
      return modalStack.length > 0 && modalStack[modalStack.length - 1] === id;
    },
    [modalStack]
  );

  const value = {
    isAnyModalOpen: modalStack.length > 0,
    modalCount: modalStack.length,
    openModal,
    closeModal,
    getModalZIndex,
    isTopModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
