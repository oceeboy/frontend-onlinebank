import React from "react";

type ToastProps = {
  id: string;
  message: { title: string; description: string };
  type?: "success" | "error" | "info";
  onClose: (id: string) => void;
};

const Toast: React.FC<ToastProps> = ({
  id,
  message,
  type = "info",
  onClose,
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-100 border-green-400 text-green-700";
      case "error":
        return "bg-red-100 border-red-400 text-red-700";
      case "info":
      default:
        return "bg-blue-100 border-blue-400 text-blue-700";
    }
  };

  return (
    <div
      className={`flex items-center justify-between border p-4 rounded-md  shadow-md mb-3 ${getTypeStyles()}`}
      //   role="alert"
    >
      <div className=" flex-row gap-3">
        <h3 className="text-lg font-bold">{message.title}</h3>
        <p className="text-sm">{message.description}</p>
      </div>

      <button
        onClick={() => onClose(id)}
        className="ml-4 text-gray-700 hover:text-gray-900 focus:outline-none"
        aria-label="Close"
      >
        &times;
      </button>
    </div>
  );
};

export default Toast;
