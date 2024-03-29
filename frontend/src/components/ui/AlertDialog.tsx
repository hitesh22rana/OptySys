import { useEffect } from "react";

import { AlertDialogProps } from "@/src/types/common";

export default function AlertDialog({ isOpen, children }: AlertDialogProps) {
  useEffect(() => {
    // Add or remove the "overflow: hidden" style to the body based on the dialog's open state
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Clean up the effect
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-[99999] flex h-full min-h-screen w-screen items-center justify-center overflow-auto bg-[url('/images/noise.png')] p-3 backdrop-blur ${
        isOpen ? "block" : "hidden"
      }`}
    >
      {children}
    </div>
  );
}
