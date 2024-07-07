import Background from "./background";
import Header from "@/Layouts/PrivateLayout/Header";
import Button from "@/components/UI/Button";
import { useTeamState } from "@/redux/features/team/teamSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTeamAction } from "@/redux/features/team/action";
import { BsArrowRight } from "react-icons/bs";
import Spinner from "@/components/UI/Spinner";
import Avatar from "@/components/UI/Avatar";
import GroupAvatar from "@/components/UI/GroupAvatar";
import { ITeam } from "@/dto/team.dto";
import Chip from "@/components/UI/Chip";
import { tagsColor } from "@/constant/enum";

function GetStartScreen() {
  const navigate = useNavigate();
  const { paginationTeamOfUser } = useTeamAction();
  const teamState = useTeamState();
  const handleOpenAddNewTeam = () => {
    const modal = document.getElementById(
      "modal_create_teams"
    ) as HTMLDialogElement;

    if (modal) {
      modal.showModal();
    }
  };

  useEffect(() => {
    paginationTeamOfUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (teamState.currentTeam) {
      navigate("/");
    }
  }, [navigate, teamState.currentTeam]);

  return (
    <div className="w-screen fixed top-0 bottom-0 right-0 left-0 overflow-hidden h-screen flex-col gap-4 flex bg-gradient-to-r from-blue-500 to-green-500">
      <Header />
      <Background />

      <div className="flex overflow-hidden flex-col p-[10%] gap-4 w-full z-[10]">
        <h1 className="text-3xl text-white font-bold">Welcome back, tran.</h1>
        {teamState.teams.length <= 0 && teamState.isLoadingPagination && (
          <Spinner />
        )}
        {teamState.teams.length > 0 &&
          teamState.teams.map((team: ITeam) => (
            <TeamItem key={team.id} team={team} />
          ))}

        {teamState.isHasNextPage && (
          <button className="btn-link btn" onClick={paginationTeamOfUser}>
            Load more {teamState.isLoadingPagination && <Spinner />}
          </button>
        )}
        <div className="flex justify-start items-center">
          <div className="tooltip" data-tip="Create new team">
            <button className="btn" onClick={handleOpenAddNewTeam}>
              <h5 className="text-primary">
                Start with your work place with your friend, colleague,...
              </h5>
              <BsArrowRight size={32} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const TeamItem = ({ team }: { team: ITeam }) => {
  const { changeCurrent } = useTeamAction();
  return (
    <div className="backdrop-blur-3xl bg-[rgba(0,0,0,0.05)] flex justify-between p-2 pl-4 pr-4 min-w-[10rem] rounded-md items-center border-primary/5 hover:border-primary/60 border cursor-pointer">
      <div className="flex justify-start gap-2 items-center">
        <Avatar
          url={team.thumbnails}
          isOnline
          isStatus={false}
          height={100}
          width={100}
        />
        <h5 className="text-white font-bold">
          {team.name.substring(0, 1).toUpperCase() + team.name.substring(1)}
        </h5>
        {team.tags.split(",").map((tag, index) => (
          <Chip
            key={index}
            name={tag}
            background={tagsColor[index].background}
            color={tagsColor[index].color}
          />
        ))}
      </div>

      <div className="flex justify-end items-center gap-10">
        <GroupAvatar
          lstAvatar={team.members.map((user) => {
            return { avatar: user.avatar, tooltip: user.username };
          })}
        />
        <Button
          type={"primary"}
          name="Go to teams"
          onClick={() => changeCurrent(team)}
        />
      </div>
    </div>
  );
};
export default GetStartScreen;
