import { DropdownMenuProps } from "@/types/common";

export default function DropdownMenu({
  className,
  children,
}: DropdownMenuProps) {
  return (
    <div className="hidden group-hover:block absolute top-8 right-1 z-50 p-4">
      <div
        className={`flex flex-col items-start justify-start bg-white border-[1px] shadow border-gray-300 p-2 pt-0 gap-2 rounded-lg rounded-tr-none ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
