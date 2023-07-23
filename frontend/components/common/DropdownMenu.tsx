import { DropdownMenuProps } from "@/types/common";

export default function DropdownMenu({
  className,
  children,
}: DropdownMenuProps) {
  return (
    <div className="hidden group-hover:block absolute top-8 right-0 z-50 p-4">
      <div
        className={`flex flex-col items-start justify-start bg-white shadow-sm border-[1px] border-gray-200 p-2 gap-2 rounded-md rounded-tr-none ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
