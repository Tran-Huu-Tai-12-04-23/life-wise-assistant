import MultiselectMember from "@/components/UI/MultiselectMember";
import MultiselectTag from "@/components/UI/MultiselectTag";
import Spinner from "@/components/UI/Spinner";
import UploadFile from "@/components/UI/UploadFile";
import { useTeamAction } from "@/redux/features/team/action";
import { useTeamState } from "@/redux/features/team/teamSlice";
import { useState } from "react";
import { toast } from "sonner";

export interface ITeamToCreate {
  name: string;
  description: string;
  thumbnails: string;
  members: string[];
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
  const { createNewTeam } = useTeamAction();
  const { isLoadingCreateNew } = useTeamState();
  const [userInput, setUserInput] = useState<ITeamToCreate>(initState);

  const handleChangeUserInput = (key: string, value: string | string[]) => {
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
    await createNewTeam(userInput);
    const modal = document.getElementById(
      "modal_create_teams"
    ) as HTMLDialogElement;

    if (modal) {
      modal.close();
    }
  };
  return (
    <>
      <dialog id="modal_create_teams" className="modal">
        <div className="modal-box">
          <form method="dialog" className="w-full">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">New teams!</h3>
          <p className="py-4 text-sm text-primary/50">
            Press ESC key or click on ✕ button to close
          </p>

          <div className="w-full flex flex-col gap-2 pt-2 border-t">
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
            <MultiselectMember
              onChangeSelectMember={(val) => {
                handleChangeUserInput(
                  "members",
                  val.map((v) => v.id)
                );
              }}
            />
            <MultiselectTag
              onChangeTag={(val) => handleChangeUserInput("tags", val)}
            />

            <div className="mt-2 border-t w-full flex justify-between pt-2">
              <button className="btn btn-outline pl-6 pr-6">Settings</button>

              <div className="flex justify-end items-center gap-4">
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
        </div>
      </dialog>
    </>
  );
};

export default ModalCreateNewTeam;
