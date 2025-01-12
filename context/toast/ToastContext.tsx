import React, { createContext, useState, useContext, ReactNode } from "react";

type Toast = {
  id: string;
  message: { title: string; description: string };
  type?: "success" | "error" | "info";
};

export type ToasterContextType = {
  toasts: Toast[];
  addToast: (
    message: { title: string; description: string },
    type?: "success" | "error" | "info"
  ) => void;
  removeToast: (id: string) => void;
};

// Create context
const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

// Provider component
export const ToasterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Function to add a toast
  const addToast = (
    message: { title: string; description: string },
    type: "success" | "error" | "info" = "info"
  ) => {
    const id = Date.now().toString(); // Unique ID based on timestamp
    setToasts((prev) => [...prev, { id, message, type }]);

    // Automatically remove toast after 5 seconds
    setTimeout(() => removeToast(id), 5000);
  };

  // Function to remove a toast by ID
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToasterContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToasterContext.Provider>
  );
};

// Hook to use ToasterContext
export const useToaster = () => {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error("useToaster must be used within a ToasterProvider");
  }
  return context;
};
