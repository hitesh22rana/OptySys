import { SectionWrapperProps } from "@/src/types/common";

export default function SectionWrapper({
  heading,
  subHeading,
  children,
}: SectionWrapperProps) {
  return (
    <section className="flex h-full w-full flex-col items-center">
      <div className="mb-8 mt-4 flex flex-col items-center justify-center gap-2 p-2 md:mt-0">
        <h2 className="text-center text-4xl font-bold md:text-5xl">
          {heading}
        </h2>
        <p className="text-center text-sm font-light text-gray-500 md:text-xl">
          {subHeading}
        </p>
      </div>
      {children}
    </section>
  );
}
