import Button from "@/components/UI/Button";
import { useState } from "react";
import { FaLock } from "react-icons/fa";

function ResetPassword() {
  const [isDisableEdit, setIsDisabledEdit] = useState(true);
  return (
    <>
      <div className="w-full flex justify-between items-center">
        <div className="w-[44%] h-[1px] bg-primary/10" />
        <h6 className="text-sm font-thin text-primary/50">Reset password</h6>
        <div className="w-[44%] h-[1px] bg-primary/10" />
      </div>

      <div className="grid  grid-cols-1 gap-10 p-10">
        <label className="input input-bordered flex items-center gap-2">
          <FaLock />
          <input
            disabled={isDisableEdit}
            type="text"
            className="grow"
            placeholder="Current password"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <FaLock />
          <input
            disabled={isDisableEdit}
            type="text"
            className="grow"
            placeholder="New password"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <FaLock />
          <input
            disabled={isDisableEdit}
            type="text"
            className="grow"
            placeholder="Confirm new password"
          />
        </label>
        {isDisableEdit ? (
          <Button
            name="Edit password"
            onClick={() => setIsDisabledEdit(!isDisableEdit)}
            type="primary"
            className="max-w-[10rem]"
          />
        ) : (
          <Button
            name="Save"
            onClick={() => setIsDisabledEdit(!isDisableEdit)}
            type="primary"
            className="max-w-[10rem]"
          />
        )}
      </div>
    </>
  );
}

export default ResetPassword;
