import { useEffect, useState } from "react";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import Chip from "./Chip";
import { tags, tagsColor } from "@/constant/enum";

function MultiselectTag({
  className,
  onChangeTag,
}: {
  className?: string;
  onChangeTag: (tag: string) => void;
}) {
  const [isFocus, setIsFocus] = useState(false);
  const [selectTag, setSelectTags] = useState<string[]>([]);

  useEffect(() => {
    const handleBlur = () => {
      setIsFocus(false);
    };

    window.addEventListener("click", handleBlur);

    return () => {
      window.removeEventListener("click", handleBlur);
    };
  }, []);

  useEffect(() => {
    onChangeTag(selectTag.join(","));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectTag]);
  return (
    <div className={className + " w-full"}>
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">Select tags</span>
        </div>
        <div
          className="dropdown w-full relative "
          onClick={(e) => {
            e.stopPropagation();
            setIsFocus(true);
          }}
        >
          <div className="flex justify-start gap-2 absolute bottom-1/2 pl-4 pr-4 translate-y-1/2">
            {selectTag.map((tag, index) => (
              <Chip
                key={index}
                name={tag}
                background={tagsColor[index].background}
                color={tagsColor[index].color}
              />
            ))}
          </div>
          <button
            onFocus={() => setIsFocus(true)}
            tabIndex={0}
            role="button"
            className={`input input-bordered w-full `}
          />
          {!isFocus && (
            <MdOutlineExpandMore
              size={24}
              className=" absolute top-1/2 right-2 -translate-y-1/2"
            />
          )}
          {isFocus && (
            <MdOutlineExpandLess
              size={24}
              className="text-primary absolute top-1/2 right-2 -translate-y-1/2"
            />
          )}
          <ul
            onClick={(e) => {
              e.stopPropagation();
              setIsFocus(true);
            }}
            tabIndex={0}
            className={
              "dropdown-content flex flex-col gap-2 bg-transparent menu backdrop-blur-2xl w-full rounded-box z-[1] p-2 shadow-2xl bottom-[100%]"
            }
          >
            {tags.map((tag) => (
              <TagItem
                isSelected={selectTag.includes(tag)}
                onClick={(tag) => {
                  if (selectTag.includes(tag)) {
                    setSelectTags(selectTag.filter((u) => u !== tag));
                  } else {
                    setSelectTags([...selectTag, tag]);
                  }
                }}
                key={tag}
                full={true}
                tag={tag}
              />
            ))}
          </ul>
        </div>
      </label>
    </div>
  );
}

export const TagItem = ({
  full = false,
  onClick,
  isSelected,
  tag,
}: {
  full?: boolean;
  onClick: (tag: string) => void;
  isSelected?: boolean;
  tag: string;
}) => {
  return (
    <div
      onClick={() => onClick(tag)}
      className={`${full ? "w-full" : "w-[10rem]"} ${
        isSelected ? "bg-primary/10" : ""
      } relative flex justify-start items-center gap-4 p-2 hover:bg-primary/5 rounded-md cursor-pointer`}
    >
      <h5 className="text-sm">{tag}</h5>

      {isSelected && (
        <IoMdClose
          size={20}
          className="text-primary absolute right-2 top-1/2 -translate-y-1/2"
        />
      )}
    </div>
  );
};

export default MultiselectTag;
