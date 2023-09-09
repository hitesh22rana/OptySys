import { InputFieldProps } from "@/src/types/common";

export default function InputField({
  name,
  type,
  value,
  placeholder,
  onChange,

  IconLeft,
  IconRight,

  onLeftIconClick,
  onRightIconClick,
}: InputFieldProps) {
  return (
    <div className="relative h-full w-full">
      {IconLeft && (
        <IconLeft
          className="absolute left-2 top-3 text-xl text-gray-400"
          onClick={onLeftIconClick}
        />
      )}

      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        onCopy={(e) => {
          e.preventDefault();
          return false;
        }}
        onCut={(e) => {
          e.preventDefault();
          return false;
        }}
        onPaste={(e) => {
          e.preventDefault();
          return false;
        }}
        onDrag={(e) => {
          e.preventDefault();
          return false;
        }}
        onDrop={(e) => {
          e.preventDefault();
          return false;
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          return false;
        }}
        className="peer/input-field h-full w-full rounded border-[1px] px-9 py-[10px] text-gray-500 outline-none placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:placeholder:text-transparent"
        onChange={onChange}
      />

      <span className="absolute -top-[10px] left-[37px] hidden bg-white text-sm text-gray-400 peer-focus/input-field:block">
        {placeholder}
      </span>

      {IconRight && (
        <IconRight
          className="absolute right-2 top-3 cursor-pointer text-xl text-gray-400"
          onClick={onRightIconClick}
        />
      )}
    </div>
  );
}
