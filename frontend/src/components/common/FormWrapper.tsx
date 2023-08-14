import { FormProps } from "@/src/types/auth";

export default function FormWrapper({
  title,
  subtitle,
  buttonText,
  className,
  onSubmit,
  children,
}: FormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className={`relative m-auto flex h-auto w-full max-w-md flex-col justify-between gap-8 rounded-md border-2 border-gray-200 bg-white p-3 shadow-lg drop-shadow-sm sm:gap-10 sm:p-5 ${className}`}
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-3xl font-bold text-[#28282B]">{title}</h3>
        <h4 className="text-sm font-normal text-gray-500 sm:font-medium">
          {subtitle}
        </h4>
      </div>
      {children}
      <button
        className="rounded bg-[#28282B] px-2 py-2 text-lg text-white transition-all duration-300 hover:bg-[#353935] sm:py-3 sm:text-xl"
        type="submit"
      >
        {buttonText}
      </button>
    </form>
  );
}
