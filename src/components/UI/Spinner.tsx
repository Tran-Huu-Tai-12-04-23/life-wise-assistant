function Spinner({ color = "#000" }: { color?: string }) {
  return (
    <span
      className={`loading loading-spinner duration-[100] text-[${color}]`}
    ></span>
  );
}

export default Spinner;
