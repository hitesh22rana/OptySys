import { ModalProps } from "@/types/common";

export default function Modal({ bgMaskColor, isOpen, children }: ModalProps) {
  return (
    <div
      className={`fixed w-screen h-screen flex items-center justify-center z-[9999] p-3 ${
        isOpen ? "block" : "hidden"
      }`}
      style={{ backgroundColor: bgMaskColor }}
    >
      {children}
    </div>
  );
}
