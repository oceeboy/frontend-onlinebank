import React from "react";

import Toast from "./Toast";
import { useToaster } from "@/context/toast/ToastContext";

const Toaster: React.FC = () => {
  const { toasts, removeToast } = useToaster();

  return (
    <div className="fixed bottom-10 w-[25em]  px-4 pt-5 z-50">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={removeToast}
          id={toast.id}
        />
      ))}
    </div>
  );
};

export default Toaster;
