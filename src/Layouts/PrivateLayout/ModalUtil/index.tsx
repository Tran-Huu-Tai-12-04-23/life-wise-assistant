import MultiselectMember from "@/components/UI/MultiselectMember";
import MultiselectTag from "@/components/UI/MultiselectTag";
import UploadFile from "@/components/UI/UploadFile";

const ModalUtil = () => {
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
            <UploadFile />
            <button className="btn glass btn-sm">Use default thumbnails</button>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Name of team</span>
              </div>
              <input
                type="text"
                placeholder="Enter name of team"
                className="input input-bordered w-full "
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Description</span>
              </div>
              <textarea
                placeholder=""
                className="input min-h-[5rem] pt-4 pb-2 input-bordered w-full "
              />
            </label>
            <MultiselectMember />
            <MultiselectTag />

            <div className="mt-2 border-t w-full flex justify-between pt-2">
              <button className="btn btn-outline pl-6 pr-6">Settings</button>

              <div className="flex justify-end items-center gap-4">
                <form method="dialog" className="w-full">
                  <button className="btn btn-error pl-6 pr-6">Cancel</button>
                </form>
                <button className="btn btn-primary pl-6 pr-6">Create</button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ModalUtil;
