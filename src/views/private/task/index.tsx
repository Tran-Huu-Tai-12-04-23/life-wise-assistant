/* eslint-disable react-refresh/only-export-components */
import { useAuthState } from "@/redux/features/auth/authSlice";
import { useTeamState } from "@/redux/features/team/teamSlice";
import { useState } from "react";
import { BsLayoutThreeColumns } from "react-icons/bs";
import { CiLineHeight } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import Filter from "./filter";
import GroupButtonUtils from "./group-button-utils";
import ModalAddTask from "./ModalAddTask";
import TeamInfo from "./TeamInfo";
import WrapperTaskLayout from "./WrapperTaskLayout";
export enum EViewType {
  BOARD,
  LIST,
}

function Task() {
  const [viewType, setViewType] = useState(EViewType.BOARD);
  const { currentUser } = useAuthState();
  const { currentTeam } = useTeamState();

  return (
    <>
      <div className="w-full flex flex-col gap-4 ">
        <GroupButtonUtils />
        <div className="p-4 no-scrollbar border-b flex items-center justify-between sticky top-[0rem] backdrop-blur-xl z-50 shadow-sm pt-4 pb-4">
          <div className="flex items-end">
            <h1 className="font-bold text-[24px]">
              Hi {currentUser?.userDetail?.fullName || currentUser?.username},
            </h1>
            <h6 className="text-sm text-[#6B7280] font-bold">
              here's your current tasks
            </h6>
          </div>

          <TeamInfo />

          {currentTeam && (
            <div className="justify-end items-center gap-4 flex">
              <Filter />
              <div className="join">
                <button
                  onClick={() => setViewType(EViewType.BOARD)}
                  className={`btn join-item ${
                    viewType === EViewType.BOARD && "bg-primary"
                  }`}
                >
                  <BsLayoutThreeColumns
                    className={`${
                      viewType === EViewType.BOARD && "text-primary-content"
                    }`}
                  />
                </button>
                <button
                  onClick={() => setViewType(EViewType.LIST)}
                  className={`btn join-item ${
                    viewType === EViewType.LIST && "bg-primary"
                  }`}
                >
                  <CiLineHeight
                    className={`${
                      viewType === EViewType.LIST && "text-primary-content"
                    }`}
                  />
                </button>
              </div>
            </div>
          )}
          <button className="btn-outline ml-4">
            <IoMdAdd
              onClick={() => {
                const addTaskElement = document.getElementById("add_task");
                if (addTaskElement) {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (addTaskElement as any)?.showModal();
                }
              }}
              size={24}
              className="hover:text-primary/50"
            />
          </button>
        </div>

        {currentTeam && (
          <>
            <WrapperTaskLayout viewType={viewType} />
            <ModalAddTask />
          </>
        )}
      </div>
    </>
  );
}

export default Task;
