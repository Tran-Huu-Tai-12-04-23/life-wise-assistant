import GroupAvatar from "@/components/UI/GroupAvatar";
import { AiOutlineClear } from "react-icons/ai";
function Filter() {
  return (
    <>
      <GroupAvatar
        lstAvatar={[
          {
            avatar:
              "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png",
            tooltip: "Huutai",
          },
          {
            avatar:
              "https://static.vecteezy.com/system/resources/previews/009/398/577/non_2x/man-avatar-clipart-illustration-free-png.png",
            tooltip: "ChuCatTuong",
          },
          {
            avatar:
              "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
            tooltip: "HoangKHoa",
          },
        ]}
      />
      <div className="join rounded-md">
        <div>
          <div>
            <input
              className="input  min-w-[20rem] input-bordered outline-none join-item"
              placeholder="Search"
            />
          </div>
        </div>
        <select
          defaultValue="Filter"
          className="select  select-bordered join-item outline-none w-40"
        >
          <option disabled>Filter</option>
          <option>All</option>
          <option>Sci-fi</option>
          <option>Drama</option>
          <option>Action</option>
        </select>
        <div className="indicator">
          <button className="btn btn-outline join-item">
            <AiOutlineClear />
          </button>
        </div>
      </div>
    </>
  );
}

export default Filter;
