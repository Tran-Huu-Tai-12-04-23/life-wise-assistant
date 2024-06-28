import Avatar from "@/components/UI/Avatar";
import Button from "@/components/UI/Button";
import { useState } from "react";
import { FaFacebook, FaGithub, FaPhone, FaTelegram } from "react-icons/fa";
import { FaCameraRetro } from "react-icons/fa";
function EditProfile() {
  const [isDisabledProfile, setIsDisabledProfile] = useState(true);

  return (
    <>
      <div className="pl-10 pr-10 pt-10 pb-5 m-auto relative">
        <Avatar isOnline isStatus url="" className="w-[16rem] h-[16rem]" />
        <button className="btn absolute  right-10 bottom-2">
          <FaCameraRetro size={32} />
        </button>
      </div>

      <div className=" w-full grid grid-cols-2 gap-10 p-10 pt-0">
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            disabled={isDisabledProfile}
            type="text"
            className="grow"
            placeholder="Email"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            disabled={isDisabledProfile}
            type="text"
            className="grow"
            placeholder="Full Name"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <FaPhone />
          <input
            disabled={isDisabledProfile}
            type="text"
            className="grow"
            placeholder="Phone number"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <FaTelegram />
          <input
            disabled={isDisabledProfile}
            type="text"
            className="grow"
            placeholder="Phone number"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <FaFacebook />
          <input
            disabled={isDisabledProfile}
            type="text"
            className="grow"
            placeholder="Facebook link"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <FaGithub />
          <input
            disabled={isDisabledProfile}
            type="text"
            className="grow"
            placeholder="Github link"
          />
        </label>
        {isDisabledProfile ? (
          <Button
            name="Edit profile"
            onClick={() => setIsDisabledProfile(!isDisabledProfile)}
            type="primary"
            className="max-w-[10rem]"
          />
        ) : (
          <Button
            name="Save"
            onClick={() => setIsDisabledProfile(!isDisabledProfile)}
            type="primary"
            className="max-w-[10rem]"
          />
        )}
      </div>
    </>
  );
}

export default EditProfile;
