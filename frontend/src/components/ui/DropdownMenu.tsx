import { DropdownMenuProps } from "@/src/types/common";

export default function DropdownMenu({
  className,
  children,
}: DropdownMenuProps) {
  return (
    <div className="absolute right-1 top-8 z-50 hidden p-4 group-hover:block">
      <div
        className={`flex flex-col items-start justify-start gap-2 rounded-lg rounded-tr-none border-[1px] border-gray-300 bg-white p-2 pt-0 shadow ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
