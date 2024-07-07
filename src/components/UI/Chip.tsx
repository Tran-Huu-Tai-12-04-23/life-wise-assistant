function Chip({
  background,
  name,
  color,
  onClick,
  className,
  size = "sm",
}: {
  name: string;
  background: string;
  color: string;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div
      onClick={() => {
        onClick && onClick();
      }}
      className={`${
        size === "sm"
          ? "pl-2 pr-2 p-[2px]"
          : size === "md"
          ? "p-[8px] pl-4 pr-4"
          : "text-sm"
      }  rounded-full text-center ${className}`}
      style={{
        color,
        background: background,
      }}
    >
      <h5 className="text-xs">{name}</h5>
    </div>
  );
}

export default Chip;
