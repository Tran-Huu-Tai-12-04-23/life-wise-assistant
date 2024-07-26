/* eslint-disable @typescript-eslint/no-explicit-any */
import MultiselectMember from "@/components/UI/MultiselectMember";
import MultiselectTag from "@/components/UI/MultiselectTag";
import Spinner from "@/components/UI/Spinner";
import UploadFile from "@/components/UI/UploadFile";
import { IUser } from "@/dto/user.dto";
import { useTeamAction } from "@/redux/features/team/action";
import { useTeamState } from "@/redux/features/team/teamSlice";
import { useState } from "react";
import { toast } from "sonner";
import useModal from "./useModal";

export interface ITeamToCreate {
  name: string;
  description: string;
  thumbnails: string;
  members: any[];
  tags: string;
  isWorkPlace?: boolean;
}
const initState: ITeamToCreate = {
  name: "",
  description: "",
  thumbnails: "",
  members: [],
  tags: "",
};

const verifyTeam = (
  team: ITeamToCreate
): { isValid: boolean; message?: string[] } => {
  const messages: string[] = [];
  if (team.name === "") {
    messages.push("Please fill in Team Name");
  }
  if (team.description === "") {
    messages.push("Please fill in Team Description");
  }
  if (team.thumbnails === "") {
    messages.push("Please fill in Team Thumbnail");
  }
  if (team.members.length === 0) {
    messages.push("Please add at least one member");
  }
  if (team.tags.length === 0) {
    messages.push("Please add at least one tag");
  }
  return {
    isValid: messages.length === 0,
    message: messages,
  };
};
const defaultThumbnail =
  "https://firebasestorage.googleapis.com/v0/b/travelappsu.appspot.com/o/original-adc8a65153ba2489f1b766e753a984e3.png?alt=media&token=e3ab1006-35be-43c8-96cb-85abe0428a78";
const ModalCreateNewTeam = () => {
  const { closeModal } = useModal();
  const { createNewTeam } = useTeamAction();
  const { isLoadingCreateNew } = useTeamState();
  const [userInput, setUserInput] = useState<ITeamToCreate>(initState);

  const handleChangeUserInput = (key: string, value: string | IUser[]) => {
    setUserInput((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };
  const handleActionTeam = async () => {
    const { isValid, message } = verifyTeam(userInput);
    if (!isValid) {
      toast.warning(message?.join("\n"));
      return;
    }
    await createNewTeam({
      ...userInput,
      members: userInput.members.map((user) => user.id),
    }).then(() => {
      const modal = document.getElementById(
        "modal_create_teams"
      ) as HTMLDialogElement;

      setUserInput(initState);
      if (modal) {
        modal.close();
      }
    });
  };

  const handleClose = () => {
    closeModal("modal_create_teams");
  };
  return (
    <dialog
      onClick={handleClose}
      id="modal_create_teams"
      className="modal z-[100000000] bg-black/10 backdrop-blur-xl"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="p-4 rounded-md  bg-base-300 min-w-[40rem]"
      >
        <form method="dialog" className="w-full relative">
          <button className="btn btn-sm btn-circle btn-outline btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">New teams!</h3>
        <p className="py-4 text-sm text-primary/50">
          Press ESC key or click on ✕ button to close
        </p>

        <div className="w-full  no-scrollbar  gap-4 grid grid-cols-2 pt-2 border-t">
          <div className="flex flex-col gap-2">
            <label className="form-control w-full ">
              <span className="label-text">Thumbnails of team</span>
            </label>
            <UploadFile
              value={userInput.thumbnails}
              onChangeFile={(val) => handleChangeUserInput("thumbnails", val)}
            />
            <button
              className="btn glass btn-sm"
              onClick={() =>
                handleChangeUserInput("thumbnails", defaultThumbnail)
              }
            >
              Use default thumbnails
            </button>
          </div>
          <div className="flex flex-col mt-auto">
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Name of team</span>
              </div>
              <input
                type="text"
                onChange={(e) => handleChangeUserInput("name", e.target.value)}
                value={userInput.name}
                placeholder="Enter name of team"
                className="input input-bordered w-full "
              />
            </label>

            <MultiselectMember
              value={userInput.members}
              onChangeSelectMember={(val) => {
                handleChangeUserInput(
                  "members",
                  val.map((v) => v)
                );
              }}
            />
            <MultiselectTag
              onChangeTag={(val) => handleChangeUserInput("tags", val)}
            />
          </div>
        </div>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <textarea
            onChange={(e) =>
              handleChangeUserInput("description", e.target.value)
            }
            value={userInput.description}
            placeholder=""
            className="input min-h-[5rem] pt-4 pb-2 input-bordered w-full "
          />
        </label>
        <div className="mt-4 border-t w-full flex justify-between pt-4">
          <div className="flex justify-end items-center gap-4 w-full">
            <form method="dialog">
              <button className="btn btn-outline pl-6 pr-6">Close</button>
            </form>

            <button
              className="btn btn-primary pl-6 pr-6"
              onClick={handleActionTeam}
            >
              {isLoadingCreateNew && <Spinner />}
              Create
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default ModalCreateNewTeam;
