interface FormProps {
  title: string;
  subtitle: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: JSX.Element | Array<JSX.Element>;
}

export default function Form({
  title,
  subtitle,
  onSubmit,
  children,
}: FormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col justify-between h-full gap-10 p-5 border-2 border-gray-100 shadow-md rounded max-w-md m-auto w-full"
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold">{title}</h3>
        <h4 className="text-sm font-semibold">{subtitle}</h4>
      </div>
      <div>{children}</div>
      <button
        className="bg-blue-500 text-white p-2 rounded text-lg hover:brightness-90 transition-all duration-300"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
