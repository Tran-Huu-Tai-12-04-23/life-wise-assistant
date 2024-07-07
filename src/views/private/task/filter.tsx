/* eslint-disable react-hooks/exhaustive-deps */
import SelectMember from "@/components/UI/SelectMember";
import { useAuthState } from "@/redux/features/auth/authSlice";
import { useColumnAction } from "@/redux/features/column/action";
import { useColumnState } from "@/redux/features/column/columnSlice";
import { useTeamState } from "@/redux/features/team/teamSlice";
import { useEffect, useMemo } from "react";
import { AiOutlineClear } from "react-icons/ai";

function Filter() {
  const { onChangeFilter, onGetAllColumnOfTeam, onClearColumnFilter } =
    useColumnAction();
  const { currentTeam } = useTeamState();
  const { enumData } = useAuthState();
  const { filter } = useColumnState();

  const taskStatus = useMemo(() => {
    return Object.keys(enumData?.taskStatus).map(
      (key) => enumData?.taskStatus[key]
    );
  }, [enumData?.taskStatus]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onGetAllColumnOfTeam();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [filter.searchKey]);

  useEffect(() => {
    currentTeam && onGetAllColumnOfTeam();
  }, [filter.members, filter.status]);

  useEffect(() => {
    currentTeam && onGetAllColumnOfTeam();
  }, [currentTeam]);

  return (
    <>
      <SelectMember
        lstMember={currentTeam.members}
        onSelect={(val) => {
          const memberIsExist = filter.members?.find(
            (item) => item.id === val.id
          );
          !memberIsExist && onChangeFilter("members", [...filter.members, val]);
          memberIsExist &&
            onChangeFilter(
              "members",
              filter.members.filter((v) => v.id !== val.id)
            );
        }}
        value={filter.members}
      />
      <div className="join rounded-md">
        <div>
          <div>
            <input
              value={filter.searchKey}
              onChange={(e) => onChangeFilter("searchKey", e.target.value)}
              className="input  min-w-[20rem] input-bordered outline-none join-item"
              placeholder="Search"
            />
          </div>
        </div>
        <select
          onChange={(e) => onChangeFilter("status", e.target.value)}
          value={filter.status}
          className="select  select-bordered join-item outline-none w-40"
        >
          <option disabled value={""}>
            Status of task
          </option>
          {taskStatus.map((item) => (
            <option key={item.code} value={item.code}>
              {item.name}
            </option>
          ))}
        </select>
        <div className="indicator">
          <button
            onClick={onClearColumnFilter}
            className="btn btn-outline join-item"
          >
            <AiOutlineClear />
          </button>
        </div>
      </div>
    </>
  );
}

export default Filter;
