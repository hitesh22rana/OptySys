import { WrapperProps } from "@/src/types/common";

export default function Wrapper({ children }: WrapperProps) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-4 p-3">
      {children}
    </div>
  );
}
