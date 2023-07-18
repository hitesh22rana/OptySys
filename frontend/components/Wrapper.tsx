import { JSX } from "react";

type Props = {
  children: string | JSX.Element | Array<JSX.Element> | React.ReactNode;
};

export default function Wrapper({ children }: Props) {
  return (
    <div className="flex flex-col gap-4 max-w-7xl p-5 w-full mx-auto min-h-screen">
      {children}
    </div>
  );
}
