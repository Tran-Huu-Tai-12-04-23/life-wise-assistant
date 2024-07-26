import { MemberItem } from "@/components/UI/MultiselectMember";
import Spinner from "@/components/UI/Spinner";
import { IUser } from "@/dto/user.dto";
import { useChatAction } from "@/redux/features/chat/action";
import { useChatState } from "@/redux/features/chat/chatSlice";
import { getLstUserToInviteTeam } from "@/services/team";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ModalNewGroupChat = () => {
  const { onCreateNewChat } = useChatAction();
  const { isLoadingCreateNew } = useChatState();
  const [search, setSearch] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lstUser, setLstUser] = useState<IUser[]>([]);
  const [userSelected, setUserSelected] = useState<IUser | null>(null);

  const handleActionGroupChat = async () => {
    if (userSelected === null) {
      toast.warning("Please select at least one user");
      return;
    }
    await onCreateNewChat({
      userTargetId: userSelected?.id,
    }).then(() => {
      const modal = document.getElementById(
        "modal_new_group_chat"
      ) as HTMLDialogElement;
      setUserSelected(null);
      if (modal) {
        modal.close();
      }
    });
  };

  const handleClose = () => {
    const modal = document.getElementById(
      "modal_new_group_chat"
    ) as HTMLDialogElement;

    setUserSelected(null);
    if (modal) {
      modal.close();
    }
  };

  useEffect(() => {
    const getLstUser = async () => {
      const lstUser = await getLstUserToInviteTeam({
        page: 0,
        take: 100000000,
        lstUserExist: [],
        name: search,
      });
      setLstUser(lstUser);
      setIsSearching(false);
      setIsLoading(false);
    };
    getLstUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearching]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsSearching(true);
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  return (
    <dialog
      id="modal_new_group_chat"
      className="modal z-[100000000] bg-black/10 backdrop-blur-xl"
      onClick={handleClose}
    >
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="full flex gap-2  center">
          <h5>To: </h5>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            placeholder="enter user name or email"
            className="input input-bordered w-full"
          />
        </div>

        <div className="h-[20rem] overflow-scroll pt-4 pb-4">
          {isLoading && (
            <div className="w-full h-full center">
              <Spinner color="primary" />
            </div>
          )}
          {!isLoading &&
            lstUser.map((user: IUser, index) => (
              <MemberItem
                key={index}
                isSelected={userSelected?.id === user.id}
                userData={user}
                onClick={(val) => setUserSelected(val)}
              />
            ))}
        </div>
        <div className="mt-4 border-t w-full flex justify-between pt-4">
          <div className="flex justify-end items-center gap-4 w-full">
            <form method="dialog">
              <button className="btn btn-outline pl-6 pr-6">Close</button>
            </form>

            <button
              disabled={!userSelected}
              className="btn btn-primary pl-6 pr-6"
              onClick={handleActionGroupChat}
            >
              {isLoadingCreateNew && <Spinner color="white" />}
              Create
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default ModalNewGroupChat;
