import { useEffect } from "react";

import { ModalProps } from "@/src/types/common";

export default function Modal({ isOpen, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex h-full min-h-screen w-screen items-center justify-center overflow-auto bg-[url('/images/noise.png')] p-3 backdrop-blur ${
        isOpen ? "block" : "hidden"
      }`}
    >
      {children}
    </div>
  );
}
