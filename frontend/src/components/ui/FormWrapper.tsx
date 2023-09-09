import { FormProps } from "@/src/types/auth";

export default function FormWrapper({
  title,
  subtitle,
  buttonText,
  disabled,
  className,
  onSubmit,
  children,
}: FormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className={`relative m-auto flex h-auto w-full max-w-md flex-col justify-between gap-8 rounded-md bg-white p-3 shadow-lg outline-none ring-2 ring-gray-200 sm:gap-10 sm:p-5 ${className}`}
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-3xl font-bold text-[#28282B]">{title}</h3>
        <h4 className="text-sm font-normal text-gray-500 sm:font-medium">
          {subtitle}
        </h4>
      </div>
      {children}
      <button
        name="submit"
        className="rounded bg-[#28282B] px-2 py-2 text-lg text-white transition-all duration-300 hover:bg-[#353935] focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed hover:disabled:blur-[1px] sm:py-3 sm:text-xl"
        type="submit"
        disabled={disabled}
      >
        {buttonText}
      </button>
    </form>
  );
}
