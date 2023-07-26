import { IconProps } from "@/types/common";

export default function Icon({ disabled, onClick, children }: IconProps) {
  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={`relative bg-slate-50 hover:bg-gray-100 border-[1px] border-gray-200 p-2  text-gray-800 rounded-full duration-150 transition-all ease-out flex items-center justify-center ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {children}
    </div>
  );
}
