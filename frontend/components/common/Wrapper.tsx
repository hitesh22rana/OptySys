import { WrapperProps } from "@/types/common";

export default function Wrapper({ children }: WrapperProps) {
  return (
    <div className="flex flex-col items-center justify-center max-w-7xl p-5 w-full mx-auto min-h-screen">
      {children}
    </div>
  );
}
