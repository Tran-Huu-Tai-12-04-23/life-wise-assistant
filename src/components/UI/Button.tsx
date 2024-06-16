import Spinner from "./Spinner";

type PropTypes = {
  type: "primary" | "secondary" | "outlined" | "text" | "link";
  isLoading?: boolean;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  name?: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

function Button({
  type = "text",
  isLoading,
  rightIcon,
  leftIcon,
  name,
  onClick = () => {},
  disabled = false,
  className = "",
}: PropTypes) {
  return (
    <button
      onClick={onClick}
      className={`${className} ${type === "primary" && "btn_primary "}  ${
        type === "secondary" && "btn_secondary"
      } ${type === "outlined" && "btn_outlined"} ${
        type === "text" && "btn_text"
      } 
      ${type === "link" && "btn_link"}
      btn_effect`}
      style={{ backgroundColor: disabled ? "bg-[#E0E0E0]" : "" }}
    >
      {!isLoading && (
        <>
          {leftIcon}
          {name}
          {rightIcon}
        </>
      )}
      {isLoading && <Spinner />}
    </button>
  );
}

export default Button;
