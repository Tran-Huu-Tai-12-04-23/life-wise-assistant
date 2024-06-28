function Avatar({
  isOnline,
  url,
  isStatus,
  className,
  width,
  height,
}: {
  isOnline: boolean;
  url?: string;
  isStatus?: boolean;
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <div
      style={{
        width: width,
        height: height,
      }}
      className={`avatar ${
        isOnline && isStatus ? "online" : isStatus ? "offline " : ""
      } ${className} border border-primary/10 cursor-pointer  hover:scale-95 w-[2rem] h-[2rem] transition-all rounded-full`}
    >
      <div className="w-full rounded-full">
        <img
          src={
            url
              ? url
              : "https://png.pngtree.com/png-clipart/20240318/original/pngtree-bussinesman-cartoon-avatar-png-image_14617022.png"
          }
        />
      </div>
    </div>
  );
}

export default Avatar;
