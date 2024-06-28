import Avatar from "@/components/UI/Avatar";
import Chip from "@/components/UI/Chip";
import GroupAvatar from "@/components/UI/GroupAvatar";
import { tagsColor } from "@/constant/enum";
import { UserDTO } from "@/dto/user.dto";
import { getUUid } from "@/helper";
import { users } from "@/views/private/task/dumy";
import { useState } from "react";

const teamInfo = {
  name: "Team Name",
  description: "Team Description",
  thumbnail:
    "https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/8ef7f30e1b7edb3b1cade79e6da07d0b?_a=AQAEuiZ",
  tags: ["Dev", "Backend", "Front-end", "DevOps"],
  members: users,
};
const lstTeams = [
  {
    id: getUUid(),
    name: "Team 1",
    description: "Team Description",
    thumbnail:
      "https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/8ef7f30e1b7edb3b1cade79e6da07d0b?_a=AQAEuiZ",
    tags: ["Dev", "Backend", "Front-end", "DevOps"],
    members: users,
  },
  {
    id: getUUid(),
    name: "Team VCT",
    description: "Team Description",
    thumbnail:
      "https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/8ef7f30e1b7edb3b1cade79e6da07d0b?_a=AQAEuiZ",
    tags: ["Dev", "Backend", "Front-end", "DevOps"],
    members: users,
  },
  {
    id: getUUid(),
    name: "Team DEVOPS",
    description: "Team Description",
    thumbnail:
      "https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/8ef7f30e1b7edb3b1cade79e6da07d0b?_a=AQAEuiZ",
    tags: ["Dev", "Backend", "Front-end", "DevOps"],
    members: users,
  },
];

const TeamInfo = () => {
  const [currentTeam] = useState(teamInfo);

  return (
    <div
      onClick={() => {
        const modal = document.getElementById(
          "modal_switch_teams"
        ) as HTMLDialogElement;

        if (modal) {
          modal.showModal();
        }
      }}
      className="w-full relative flex flex-col  p-4 cursor-pointer hover:bg-primary/5"
    >
      <div className="flex items-center gap-2">
        <Avatar
          url={currentTeam.thumbnail}
          width={40}
          height={40}
          isOnline
          isStatus={false}
        />
        <div className="flex flex-col justify-center items-start">
          <h3 className="text-lg font-semibold">{currentTeam.name}</h3>
          <p className="text-sm text-primary/50 truncate">
            {currentTeam.description}
          </p>
        </div>
      </div>

      <GroupAvatar
        lstAvatar={currentTeam.members?.map((mem) => {
          return {
            avatar: mem.avatar,
            tooltip: mem.name,
          };
        })}
      />

      <div className="flex justify-start pl-2 gap-2 items-center">
        {currentTeam.tags.map((tag, index) => {
          if (index < 2) {
            return (
              <Chip
                name={tag}
                key={tag}
                color={tagsColor[index].color}
                background={tagsColor[index].background}
              />
            );
          }

          if (index === 2) return "...";
        })}
      </div>

      <dialog id="modal_switch_teams" className="modal">
        <div className="modal-box">
          <form method="dialog" className="w-full">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <LstTeamToSelected />
        </div>
      </dialog>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TeamItemToSelecte = ({ team }: { team: any }) => {
  return (
    <div className="flex border-b w-full flex-col p-4 gap-4 rounded-md hover:bg-primary/5 cursor-pointer">
      <div className="flex justify-start items-center gap-4">
        <div className="flex items-center gap-4">
          <Avatar
            url={team.thumbnail}
            width={40}
            height={40}
            isOnline
            isStatus={false}
          />
          <div className="flex flex-col justify-center items-start">
            <h3 className="text-sm font-semibold">{team.name}</h3>
            <p className="text-xs text-primary/50 truncate">
              {team.description}
            </p>
          </div>
        </div>

        <GroupAvatar
          lstAvatar={team.members?.map((mem: UserDTO) => {
            return {
              avatar: mem.avatar,
              tooltip: mem.name,
            };
          })}
        />
      </div>

      <div className="flex justify-start pl-2 gap-2 items-center">
        {team.tags.map((tag: string, index: number) => {
          return (
            <Chip
              name={tag}
              key={tag}
              color={tagsColor[index].color}
              background={tagsColor[index].background}
            />
          );
        })}
      </div>
    </div>
  );
};

const LstTeamToSelected = () => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`flex rounded-md overflow-hidden flex-col `}
    >
      {lstTeams.map((team) => (
        <TeamItemToSelecte key={team.id} team={team} />
      ))}
    </div>
  );
};

export default TeamInfo;
