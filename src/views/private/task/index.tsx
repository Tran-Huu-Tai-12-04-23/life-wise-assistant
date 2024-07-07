/* eslint-disable react-refresh/only-export-components */
import { CiLineHeight } from "react-icons/ci";
import { BsLayoutThreeColumns } from "react-icons/bs";
import Filter from "./filter";
import { useState } from "react";
import WrapperTaskLayout from "./WrapperTaskLayout";
import ModalAddTask from "./ModalAddTask";
import GroupButtonUtils from "./group-button-utils";
export enum EViewType {
  BOARD,
  LIST,
}

function Task() {
  const [viewType, setViewType] = useState(EViewType.BOARD);

  return (
    <>
      <div className="w-full flex flex-col gap-4 ">
        <GroupButtonUtils />
        <div className="p-4 no-scrollbar border-b flex items-center justify-between sticky top-[0rem] backdrop-blur-xl z-50 shadow-sm pt-4 pb-4">
          <div className="flex items-end">
            <h1 className="font-bold text-[24px]">Hi James,</h1>
            <h5 className="text-sm text-[#6B7280] font-bold">
              here's your current tasks
            </h5>
          </div>

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
        </div>

        <WrapperTaskLayout viewType={viewType} />

        <ModalAddTask />
      </div>
    </>
  );
}

export default Task;
