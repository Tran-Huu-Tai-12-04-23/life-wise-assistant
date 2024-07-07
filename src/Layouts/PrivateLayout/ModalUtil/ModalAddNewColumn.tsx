import Spinner from "@/components/UI/Spinner";
import { useColumnAction } from "@/redux/features/column/action";
import { useColumnState } from "@/redux/features/column/columnSlice";
import { useTeamState } from "@/redux/features/team/teamSlice";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import UseModal from "./useModal";
import SelectItem, { IItemSelect } from "@/components/UI/SelectItem";
import { useAuthState } from "@/redux/features/auth/authSlice";

const ModalAddNewColumn = () => {
  // const [nameColumn, setNameColumn] = useState("");
  const [columnStatus, setColumnStatus] = useState<IItemSelect | null>(null);
  const { currentTeam } = useTeamState();
  const { onCreateNewColumn } = useColumnAction();
  const { isLoadingCreateNewColumn } = useColumnState();
  const { closeModal } = UseModal();
  const { enumData } = useAuthState();

  const handleAddColumn = async () => {
    // if (nameColumn === "") {
    //   toast.warning("Name column is required");
    //   return;
    // }
    if (!columnStatus) {
      toast.warning("Status column is required");
      return;
    }
    if (!currentTeam) {
      toast.warning("Please select team");
      return;
    }

    const newColumn = {
      name: enumData?.taskStatus[columnStatus.code].name,
      teamId: currentTeam.id,
      statusCode: columnStatus.code,
    };
    await onCreateNewColumn(newColumn).then(() => {
      closeModal("modal_add_new_columns");
    });
  };

  const taskStatus = useMemo(() => {
    if (!enumData?.taskStatus) return [];
    return Object.keys(enumData?.taskStatus).map(
      (key) => enumData?.taskStatus[key]
    );
  }, [enumData?.taskStatus]);
  return (
    <dialog id="modal_add_new_columns" className="modal">
      <div className="max-w-lg bg-base-300 w-[30rem] backdrop-blur-xl p-4 rounded-lg">
        <form method="dialog" className="w-full">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">New column!</h3>
        <p className="py-4 text-sm text-primary/50">
          Press ESC key or click on ✕ button to close
        </p>

        <div className="w-full flex flex-col gap-2 pt-2 border-t">
          {/* <label htmlFor="name_col" className="form-control w-full ">
            <span className="label-text">Name of column</span>
            <input
              value={nameColumn}
              onChange={(e) => setNameColumn(e.target.value)}
              id="name_col"
              type="text"
              placeholder="Enter name of column"
              className="input mt-2 input-bordered w-full "
            />
          </label> */}

          <SelectItem
            position="bottom"
            onChange={(item) => setColumnStatus(item)}
            items={taskStatus}
            isRequired
            title={"Column with status:"}
          />

          <div className="mt-auto border-t w-full flex justify-end pt-2">
            <div className="flex justify-end items-center gap-4">
              <button
                className="btn btn-primary pl-6 pr-6"
                onClick={handleAddColumn}
              >
                {isLoadingCreateNewColumn && <Spinner />}
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default ModalAddNewColumn;
