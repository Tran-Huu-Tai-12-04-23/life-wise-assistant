import Avatar from "@/components/UI/Avatar";
import Chip from "@/components/UI/Chip";
import GroupAvatar from "@/components/UI/GroupAvatar";
import { tagsColor } from "@/constant/enum";
import { ITeam } from "@/dto/team.dto";
import { IUser } from "@/dto/user.dto";
import UseModal from "@/Layouts/PrivateLayout/ModalUtil/useModal";
import { useTeamAction } from "@/redux/features/team/action";
import { useTeamState } from "@/redux/features/team/teamSlice";
import { Fragment } from "react/jsx-runtime";

const TeamInfo = () => {
  const { currentTeam } = useTeamState();
  const { showModal } = UseModal();

  return (
    <Fragment>
      {!currentTeam && (
        <button
          className="btn btn-secondary m-5"
          onClick={() => showModal("modal_switch_teams")}
        >
          Select team
        </button>
      )}

      {currentTeam && (
        <div
          onClick={() => showModal("modal_switch_teams")}
          className="rounded-lg bg-black/10 relative flex items-center gap-4 p-4 cursor-pointer hover:bg-primary/5"
        >
          <GroupAvatar
            lstAvatar={currentTeam.members?.map((mem: IUser) => {
              return {
                avatar: mem.avatar,
                tooltip: mem.username,
              };
            })}
          />
          <h6 className=" font-semibold">{currentTeam.name}</h6>

          <div className="flex justify-start gap-2 items-center">
            {currentTeam.tags.split(",").map((tag: string, index: number) => {
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
        </div>
      )}
      <dialog id="modal_switch_teams" className="modal">
        <div className="modal-box  bg-secondary">
          <form method="dialog" className="w-full">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <LstTeamToSelected />
        </div>
      </dialog>
    </Fragment>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TeamItemToSelect = ({ team }: { team: any }) => {
  const { changeCurrent } = useTeamAction();
  const { closeModal } = UseModal();
  return (
    <div
      onClick={() => {
        closeModal("modal_switch_teams");
        changeCurrent(team);
      }}
      className="flex mt-6 border-b w-full flex-col p-4 gap-4 rounded-md hover:bg-primary/5 cursor-pointer"
    >
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
          </div>
        </div>

        <GroupAvatar
          lstAvatar={team.members?.map((mem: IUser) => {
            return {
              avatar: mem.avatar,
              tooltip: mem.username,
            };
          })}
        />
      </div>

      <div className="flex justify-start pl-2 gap-2 items-center">
        {team.tags?.split(",").map((tag: string, index: number) => {
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
  const { teams } = useTeamState();
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`flex rounded-md overflow-hidden flex-col`}
    >
      {teams.map((team: ITeam) => (
        <TeamItemToSelect key={team.id} team={team} />
      ))}
    </div>
  );
};

export default TeamInfo;
