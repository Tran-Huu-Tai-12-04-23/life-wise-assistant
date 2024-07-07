import UseModal from "@/Layouts/PrivateLayout/ModalUtil/useModal";
import { IoAddOutline } from "react-icons/io5";
function GroupButtonUtils() {
  const { showModal } = UseModal();
  return (
    <div
      onClick={() => showModal("modal_add_new_columns")}
      className="transition-all hover:w-[15rem] duration-500 ease-in-out w-20 overflow-hidden  cursor-pointer flex group justify-center items-center fixed z-[100000] rounded-l-xl right-4 bottom-10"
    >
      <button className="btn btn-primary btn-outline">
        <IoAddOutline size={32} />
        <h6 className="transition-all duration-500 group-hover:block group-hover:w-fit w-0 max-h-6 hidden cursor-pointer overflow-hidden">
          Add New Column
        </h6>
      </button>
    </div>
  );
}

export default GroupButtonUtils;
