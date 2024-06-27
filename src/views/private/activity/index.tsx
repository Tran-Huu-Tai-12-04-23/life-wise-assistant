import ActivityContent from "./activity-content";
import SideBar from "./sidebar";

function Activity() {
  return (
    <div className="w-full h-full flex justify-start items-start">
      <SideBar />
      <ActivityContent />
    </div>
  );
}

export default Activity;
