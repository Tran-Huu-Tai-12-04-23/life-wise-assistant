import { ChangeEvent, useState } from "react";
import uploadImage from "@/services/firebase";
import Spinner from "./Spinner";
import { IoMdClose } from "react-icons/io";
const UploadFile = ({
  value,
  onChangeFile,
  isRequired,
  label,
}: {
  onChangeFile: (val: string) => void;
  value: string;
  isRequired?: boolean;
  label?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsLoading(true);
      const url = await uploadImage(file);
      url && onChangeFile(url);
      setIsLoading(false);
    }
  };
  return (
    <div
      className={`flex flex-col justify-start items-start h-[9rem] w-full rounded-md relative `}
    >
      {label && (
        <span className="label-text flex mb-2">
          {label}
          {isRequired && <sup className="text-red-500">*</sup>}
        </span>
      )}

      {value && !isLoading && (
        <IoMdClose
          onClick={() => onChangeFile("")}
          size={24}
          className="hover:text-red-500 scale-animate absolute top-2 right-2 cursor-pointer"
        />
      )}
      {!value && !isLoading && (
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full border-2  border-dashed rounded-lg cursor-pointer  hover:bg-primary/5 dark:border-primary/5 dark:hover:border-primary/10 dark:hover:bg-primary/5"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            onChange={handleAddFile}
            id="dropzone-file"
            type="file"
            className="hidden"
          />
        </label>
      )}

      {isLoading && <Spinner />}

      {value && !isLoading && (
        <img
          className="w-full h-full bg-contain object-contain"
          src={value}
          alt={value}
        ></img>
      )}
    </div>
  );
};

export default UploadFile;
