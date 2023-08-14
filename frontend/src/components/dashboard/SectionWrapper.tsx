import { SectionWrapperProps } from "@/src/types/common";

export default function SectionWrapper({
  heading,
  subHeading,
  children,
}: SectionWrapperProps) {
  return (
    <section className="flex h-full w-full flex-col items-center">
      <div className="my-6 flex flex-col items-center justify-center gap-2 p-2 md:my-4">
        <h2 className="text-3xl font-bold md:text-4xl">{heading}</h2>
        <p className="text-base font-light text-gray-500 md:text-lg">
          {subHeading}
        </p>
      </div>
      {children}
    </section>
  );
}
