import { WrapperProps } from "@/src/types/common";

export default function Wrapper({ children }: WrapperProps) {
  return (
    <div className="flex flex-col gap-4 max-w-7xl p-3 w-full mx-auto min-h-screen">
      {children}
    </div>
  );
}
