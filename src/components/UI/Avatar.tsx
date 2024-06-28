function Avatar({
  isOnline,
  url,
  isStatus,
  className,
}: {
  isOnline: boolean;
  url?: string;
  isStatus?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`avatar ${
        isOnline && isStatus ? "online" : isStatus ? "offline" : ""
      } ${className} cursor-pointer w-[2rem] h-[2rem] hover:scale-95 transition-all rounded-full`}
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
