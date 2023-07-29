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
      className={`relative flex flex-col justify-between sm:gap-10 gap-8 sm:p-5 p-3 border-2 border-gray-200 bg-white shadow-lg rounded-md max-w-md m-auto w-full h-auto ${className}`}
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-3xl font-bold text-[#28282B]">{title}</h3>
        <h4 className="text-gray-500 text-sm sm:font-medium font-normal">
          {subtitle}
        </h4>
      </div>
      {children}
      <button
        className="bg-[#28282B] text-white px-2 sm:py-3 py-2 rounded sm:text-xl text-lg hover:bg-[#353935] transition-all duration-300"
        type="submit"
      >
        {buttonText}
      </button>
    </form>
  );
}
