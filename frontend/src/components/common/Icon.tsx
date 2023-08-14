import { IconProps } from "@/src/types/common";

export default function Icon({ disabled, onClick, children }: IconProps) {
  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={`relative flex items-center justify-center rounded-full border-[1px]  border-transparent p-2 text-gray-800 transition-all duration-150 ease-out hover:border-gray-200 hover:bg-gray-50 ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {children}
    </div>
  );
}
