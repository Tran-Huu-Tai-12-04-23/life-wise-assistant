import UseModal from "@/Layouts/PrivateLayout/ModalUtil/useModal";
import MultiselectMember from "@/components/UI/MultiselectMember";
import SelectItem, { IItemSelect } from "@/components/UI/SelectItem";
import UploadFile from "@/components/UI/UploadFile";
import { IUser } from "@/dto/user.dto";
import { useAuthState } from "@/redux/features/auth/authSlice";
import { useColumnAction } from "@/redux/features/column/action";
import { useColumnState } from "@/redux/features/column/columnSlice";
import { useTeamState } from "@/redux/features/team/teamSlice";
import { ITaskToCreate } from "@/services/column/dto";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useMemo, useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { toast } from "sonner";
interface ITaskState {
  title: string;
  description: string;
  dateExpire: DateValueType | null;
  taskType: IItemSelect | null;
  taskPriority: IItemSelect | null;
  lstPersonInCharge: IUser[];
  fileLink: string;
  sourceCodeLink: string;
}
const initState: ITaskState = {
  title: "",
  description: "",
  dateExpire: null,
  taskType: null,
  taskPriority: null,
  lstPersonInCharge: [],
  fileLink: "",
  sourceCodeLink: "",
};
function ModalAddTask() {
  const { onCreateTask } = useColumnAction();
  const { currentColumn } = useColumnState();
  const { currentTeam } = useTeamState();
  const { enumData } = useAuthState();
  const { closeModal } = UseModal();

  const [userInput, setUserInput] = useState<ITaskState>(initState);

  const taskType = useMemo(() => {
    return Object.keys(enumData?.taskType || {}).map((key) => {
      return enumData?.taskType[key as keyof typeof enumData.taskType];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enumData?.taskType]);

  const taskPriority = useMemo(() => {
    return Object.keys(enumData?.taskPriority || {}).map((key) => {
      return enumData?.taskPriority[key as keyof typeof enumData.taskPriority];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enumData?.taskPriority]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeInput = (key: string, value: any) => {
    setUserInput((prev: ITaskState) => ({ ...prev, [key]: value }));
  };

  const verifyInput = () => {
    const missingFiled = [];
    if (!userInput.title) missingFiled.push("title");
    if (!userInput.description) missingFiled.push("description");
    if (!userInput.dateExpire) missingFiled.push("dateExpire");
    if (!userInput.taskPriority) missingFiled.push("taskPriority");
    if (!userInput.taskType) missingFiled.push("taskType");

    return missingFiled;
  };

  const handleAddTask = async () => {
    const missingField = verifyInput();
    if (missingField.length) {
      toast.error(`Missing field: ${missingField.join(", ")}`);
      return;
    }

    if (!userInput.dateExpire) return;
    const body: ITaskToCreate = {
      title: userInput.title,
      description: userInput.description,
      dateExpire: new Date(userInput.dateExpire.startDate?.toString() || ""),
      priority: userInput.taskPriority?.code || "",
      type: userInput.taskType?.code || "",
      lstPersonInCharge: userInput.lstPersonInCharge.map((item) => item.id),
      fileLink: userInput.fileLink,
      sourceCodeLink: userInput.sourceCodeLink,
      columnId: "",
    };

    await onCreateTask(body).then(() => {
      setUserInput(initState);
      closeModal("add_task");
    });
  };

  const handleClose = () => {
    closeModal("add_task");
  };
  return (
    <dialog
      onClick={handleClose}
      id="add_task"
      className="modal z-[100000000] bg-black/10 backdrop-blur-xl"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-base-300 w-[90vw] p-6 shadow-xl rounded-md "
      >
        <div className="flex pb-4  w-full justify-between items-start gap-4">
          <div className="w-2/3 flex flex-col gap-4 border-r-[1px] pr-4 border-solid border-primary/5">
            <div className="flex flex-col border-b pb-2">
              <h3 className="font-bold text-lg">Add new task!</h3>
              <p className="pb-4">Click the button below to close</p>
            </div>
            <div className="flex justify-between gap-4  pt-4">
              <label className="form-control w-full">
                <span className="label-text mb-2 ">
                  Title
                  <sup className="text-red-500">*</sup>
                </span>
                <input
                  value={userInput.title}
                  onChange={(e) => handleChangeInput("title", e.target.value)}
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full"
                />
              </label>
              <label className="form-control w-full">
                <span className="label-text mb-2 flex">Source github</span>
                <input
                  value={userInput.sourceCodeLink}
                  onChange={(e) =>
                    handleChangeInput("sourceCodeLink", e.target.value)
                  }
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full"
                />
              </label>
            </div>
            <span className="label-text ">
              Description
              <sup className="text-red-500">*</sup>
            </span>
            <CKEditor
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              editor={ClassicEditor as { create: any }}
              config={{}}
              data={userInput.description}
              onChange={(_event, editor) => {
                handleChangeInput("description", editor.getData());
              }}
            />
          </div>

          <div className="flex flex-col h-full  mt-auto gap-4 w-1/3  ">
            <div className="flex justify-between items-center">
              <h6 className="text-sm">Teams:</h6>
              <h6 className="text-sm font-bold text-primary">
                {currentTeam.name}
              </h6>
            </div>

            <div className="flex justify-between gap-2 items-center">
              <h6 className="text-sm ">
                Date to complete: <sup className="text-red-500">*</sup>
              </h6>
              <div className="bg-primary/10 border-[1px] border-primary/20 border-solid rounded-lg">
                <Datepicker
                  value={userInput.dateExpire}
                  asSingle={true}
                  useRange={false}
                  onChange={(value: DateValueType) => {
                    handleChangeInput("dateExpire", value);
                  }}
                />
              </div>
            </div>
            <SelectItem
              value={userInput.taskPriority?.code}
              isRequired
              title={"Task priority"}
              items={taskPriority}
              onChange={(item) => handleChangeInput("taskPriority", item)}
            />
            <SelectItem
              value={userInput.taskType?.code}
              isRequired
              title={"Pick the type of task"}
              items={taskType}
              onChange={(item) => handleChangeInput("taskType", item)}
            />

            {currentColumn?.statusCode !==
              enumData?.taskStatus.TO_ASSIGN.code && (
              <MultiselectMember
                value={userInput.lstPersonInCharge}
                title="Assign to"
                onChangeSelectMember={(val) =>
                  handleChangeInput("lstPersonInCharge", val)
                }
              />
            )}

            <UploadFile
              label="Upload file"
              onChangeFile={(val) => handleChangeInput("fileLink", val)}
              value={""}
            />
          </div>
        </div>
        <div className="modal-action border-t pt-4">
          <form method="dialog" className="flex gap-4">
            <button className="btn">Close</button>
            <button
              className="btn btn-primary focus:scale-105 transition-all"
              onClick={async (e) => {
                e.stopPropagation();
                e.preventDefault();
                await handleAddTask();
              }}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default ModalAddTask;
