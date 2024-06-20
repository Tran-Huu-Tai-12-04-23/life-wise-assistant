import ToolTip from "./Tooltip";

function GroupAvatar({
  lstAvatar,
}: {
  lstAvatar: { avatar: string; tooltip: string }[];
}) {
  return (
    <div className="avatar-group -space-x-2 rtl:space-x-reverse">
      {lstAvatar.map((avatar, index) => {
        if (index === 5)
          return (
            <div key={index} className="avatar placeholder">
              <div className="w-8 bg-neutral text-neutral-content">
                <span>+{lstAvatar.length - 5}</span>
              </div>
            </div>
          );
        else if (index > 5) return null;
        return (
          <div
            className="avatar hover:scale-110 bg-contain object-contain cursor-pointer"
            key={index}
          >
            <ToolTip tip={avatar.tooltip}>
              <div className="w-8 ">
                <img src={avatar.avatar} alt={avatar.tooltip} />
              </div>
            </ToolTip>
          </div>
        );
      })}
    </div>
  );
}

export default GroupAvatar;
