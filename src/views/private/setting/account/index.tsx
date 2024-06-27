import EditProfile from "./edit-profile";
import ResetPassword from "./reset-password";

function Account() {
  return (
    <div className="p-4 w-full flex flex-col gap-4">
      <EditProfile />
      <ResetPassword />
    </div>
  );
}

export default Account;
