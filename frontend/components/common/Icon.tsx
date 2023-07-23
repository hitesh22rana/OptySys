import { IconProps } from "@/types/common";

export default function Icon({ onClick, children }: IconProps) {
  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer bg-slate-50 hover:bg-gray-100 border-[1px] border-gray-200 p-2  text-gray-800 rounded-full duration-150 transition-all ease-out"
    >
      {children}
    </div>
  );
}
