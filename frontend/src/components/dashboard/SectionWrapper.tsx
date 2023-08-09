import { SectionWrapperProps } from "@/src/types/common";

export default function SectionWrapper({
  heading,
  subHeading,
  children,
}: SectionWrapperProps) {
  return (
    <section className="flex flex-col w-full h-full items-center">
      <div className="flex flex-col items-center justify-center p-2 gap-2 md:my-4 my-6">
        <h2 className="md:text-4xl text-3xl font-bold">{heading}</h2>
        <p className="text-gray-500 font-light md:text-lg text-base">
          {subHeading}
        </p>
      </div>
      {children}
    </section>
  );
}
