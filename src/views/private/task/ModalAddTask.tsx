import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import AssignUtil from "./AssignUtils";
import Avatar from "@/components/UI/Avatar";
import UploadFile from "@/components/UI/UploadFile";
function ModalAddTask() {
  const [value, setValue] = useState<DateValueType>(null);

  return (
    <dialog id="add_task" className="modal">
      <div className="modal-box w-11/12 max-w-7xl rounded-md ">
        <div className="flex w-full justify-between items-start gap-4">
          <div className="w-2/3 flex flex-col gap-4 border-r-[1px] pr-4 border-solid border-primary/5">
            <h3 className="font-bold text-lg">Add new task!</h3>
            <p className="pb-4">Click the button below to close</p>
            <CKEditor
              editor={ClassicEditor}
              config={{}}
              data=""
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event) => {
                console.log(event);
              }}
              onBlur={(event, editor) => {
                console.log("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                console.log("Focus.", editor);
              }}
            />
          </div>

          <div className="flex flex-col h-full  mt-auto gap-4 w-1/3  ">
            <div className="flex justify-between items-center">
              <h5 className="text-sm">Places:</h5>
              <h5 className="text-sm font-bold">Your workspace</h5>
            </div>

            <div className="flex justify-between items-center">
              <h5 className="text-sm">Date to complete:</h5>
              <div className="bg-primary/10 border-[1px] border-primary/20 border-solid rounded-lg">
                <Datepicker
                  value={value}
                  asSingle={true}
                  useRange={false}
                  onChange={function (value: DateValueType): void {
                    setValue(value);
                  }}
                />
              </div>
            </div>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">
                  Pick the priority for the task
                </span>
              </div>
              <select
                defaultValue={"Select one"}
                className="select select-bordered w-full rounded-lg"
              >
                <option disabled>Select one</option>
                <option>HIGH</option>
                <option>NORMAL</option>
                <option>LOW</option>
              </select>
            </label>

            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Pick the type of task</span>
              </div>
              <select
                defaultValue={"Select one"}
                className="h-8 select select-bordered w-full rounded-lg"
              >
                <option disabled>Select one</option>
                <option>Work</option>
                <option>English</option>
                <option>Chill</option>
              </select>
            </label>

            <div className="flex justify-between items-center">
              <h5 className="text-sm">Assign to:</h5>
              <div className="justify-end flex items-center gap-2">
                <Avatar
                  isOnline={false}
                  isStatus={false}
                  url={
                    "https://cdn.dribbble.com/users/4236296/screenshots/19223467/media/6e65d6cf423bccf489558755faacc6d4.png?resize=1000x750&vertical=center"
                  }
                />
                <AssignUtil
                  lstMember={[
                    {
                      name: "Nguyễn Văn A",
                      avatar:
                        "https://cdn.dribbble.com/users/4236296/screenshots/19223467/media/6e65d6cf423bccf489558755faacc6d4.png?resize=1000x750&vertical=center",
                    },
                    {
                      name: "Nguyễn Văn A",
                      avatar:
                        "https://cdn.dribbble.com/users/4236296/screenshots/19223467/media/6e65d6cf423bccf489558755faacc6d4.png?resize=1000x750&vertical=center",
                    },
                    {
                      name: "Nguyễn Văn A",
                      avatar:
                        "https://cdn.dribbble.com/users/4236296/screenshots/19223467/media/6e65d6cf423bccf489558755faacc6d4.png?resize=1000x750&vertical=center",
                    },
                    {
                      name: "Nguyễn Văn A",
                      avatar:
                        "https://cdn.dribbble.com/users/4236296/screenshots/19223467/media/6e65d6cf423bccf489558755faacc6d4.png?resize=1000x750&vertical=center",
                    },
                  ]}
                />
              </div>
            </div>
            <UploadFile />
          </div>
        </div>
        <div className="modal-action">
          <form method="dialog" className="flex gap-4">
            <button className="btn">Close</button>
            <button
              className="btn btn-primary focus:scale-105 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
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
