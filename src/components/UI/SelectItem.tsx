/* eslint-disable @typescript-eslint/no-explicit-any */
import Chip from "./Chip";
import { IoMdClose } from "react-icons/io";

export interface IItemSelect {
  name: string;
  code: string;
  color: string;
  background: string;
}

function SelectItem({
  items,
  onChange,
  title,
  isRequired,
  value,
}: {
  className?: string;
  onChange: (item: IItemSelect) => void;
  items: IItemSelect[];
  title: string;
  isRequired?: boolean;
  position?: "top" | "bottom";
  value?: string;
}) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">
          {title} {isRequired && <sup className="text-red-500">*</sup>}
        </span>
      </div>
      <select
        value={value}
        defaultValue={undefined}
        onChange={(event: any) => {
          const selectedItem = items.find(
            (item) => item.code === event.target?.value
          );
          if (selectedItem) {
            onChange(selectedItem);
          }
        }}
        className="select select-bordered"
      >
        <option disabled value={undefined}>
          Pick one
        </option>
        {items.map((item) => (
          <option key={item.code} value={item.code}>
            {item.name}
          </option>
        ))}
      </select>
    </label>
  );
}

export const Item = ({
  full = false,
  onClick,
  isSelected,
  item,
}: {
  full?: boolean;
  onClick: () => void;
  isSelected?: boolean;
  item: IItemSelect;
}) => {
  return (
    <div
      onClick={() => onClick()}
      className={`${full ? "w-full" : "w-[10rem]"} ${
        isSelected ? "bg-primary/10" : ""
      } flex justify-start items-center gap-4 p-2 hover:bg-primary/5 rounded-md cursor-pointer`}
    >
      <Chip
        size="md"
        className="w-full p-4"
        name={item.name}
        background={item.background}
        color={item.color}
      />
      {isSelected && (
        <IoMdClose
          size={20}
          className="text-primary absolute right-2 top-1/2 -translate-y-1/2"
        />
      )}
    </div>
  );
};

export default SelectItem;
