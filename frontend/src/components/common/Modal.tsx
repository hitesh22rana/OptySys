import { ModalProps } from "@/src/types/common";

export default function Modal({ isOpen, children }: ModalProps) {
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
