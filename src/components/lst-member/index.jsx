import { Stack } from "@mui/system";
import UserInfoPopover from "../user-info-popover";

function LstMember({members}) {
    return <Stack direction="row" gap={1}>
        {members.map((member) => <UserInfoPopover key={member.id} />)}
        </Stack>
}

export default LstMember;