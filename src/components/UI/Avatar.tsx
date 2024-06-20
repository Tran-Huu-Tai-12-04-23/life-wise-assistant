function Avatar({
  isOnline,
  url,
  isStatus,
}: {
  isOnline: boolean;
  url?: string;
  isStatus?: boolean;
}) {
  return (
    <div
      className={`avatar ${
        isOnline && isStatus ? "online" : isStatus ? "offline" : ""
      } cursor-pointer hover:scale-95 transition-all border-dashed border-[1px] border-primary rounded-full`}
    >
      <div className="w-8 rounded-full">
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
