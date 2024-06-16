import { useState } from "react";
import { v4 as uuid } from "uuid";
function Input({
  label,
  placeholder,
  keyInput,
  value,
  onChange,
  isPassword = false,
}: {
  label?: string;
  placeholder?: string;
  keyInput: string;
  value?: string;
  onChange: (key: string, value: string) => void;
  isPassword?: boolean;
}) {
  const [id] = useState(uuid());
  return (
    <div className="justify-start flex flex-col">
      <label htmlFor={id} className="font-bold">
        {label}
      </label>
      <input
        type={isPassword ? "password" : "text"}
        id={id}
        value={value}
        onChange={(e) => onChange(keyInput, e.target.value)}
        placeholder={placeholder}
        className="h-[3rem] rounded-full p-2 hover:border-light-primary focus:outline-none dark:hover:border-dark-primary border-solid border-[1px] pl-4 pr-4 border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0,1)] focus:border-light-primary dark:focus-dark-primary focus:ring-0 focus:ring-transparent"
      />
    </div>
  );
}

export default Input;
