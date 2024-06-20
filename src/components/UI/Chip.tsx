function Chip({
  background,
  name,
  color,
}: {
  name: string;
  background: string;
  color: string;
}) {
  return (
    <div
      className={`pl-2 w-fit pr-2 p-[2px] rounded-full`}
      style={{
        color,
        background: background,
      }}
    >
      <h5 className="text-sm">{name}</h5>
    </div>
  );
}

export default Chip;
