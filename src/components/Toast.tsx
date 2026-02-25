"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2">
      <div
        className={`animate-toast-in rounded-xl px-6 py-3 font-semibold shadow-lg ${
          type === "success"
            ? "bg-emerald-500 text-white"
            : "bg-red-500 text-white"
        }`}
      >
        {message}
      </div>
    </div>
  );
}
