import { ModalProps } from "@/types/common";

export default function Modal({ bgMaskColor, children }: ModalProps) {
  return (
    <div
      className="fixed w-screen h-screen flex items-center justify-center z-[9999] p-3"
      style={{ backgroundColor: bgMaskColor }}
    >
      {children}
    </div>
  );
}
