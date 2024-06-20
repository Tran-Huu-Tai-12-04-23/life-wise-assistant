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
    <div className="relative justify-start flex flex-col">
      <label htmlFor={id} className="font-bold">
        {label}
      </label>
      {isPassword && (
        <div className="absolute top-2/3 -translate-y-1/2 right-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
      <input
        type={isPassword ? "password" : "text"}
        id={id}
        value={value}
        onChange={(e) => onChange(keyInput, e.target.value)}
        placeholder={placeholder}
        className="grow h-[3rem] rounded-lg p-2 hover:border-light-primary focus:outline-none dark:hover:border-dark-primary border-solid border-[1px] pl-4 pr-4 border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0,1)] focus:border-light-primary dark:focus-dark-primary focus:ring-0 focus:ring-transparent"
      />
    </div>
  );
}

export default Input;
