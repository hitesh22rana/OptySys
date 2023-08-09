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
      className={`fixed w-screen h-screen flex items-center justify-center z-[9999] p-3 backdrop-blur inset-0 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      {children}
    </div>
  );
}
