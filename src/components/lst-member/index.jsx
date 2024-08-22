import { Stack } from '@mui/system';
import UserInfoPopover from '../user-info-popover';

function LstMember({ members }) {
  return (
    <Stack direction="row" gap={1}>
      {members.map((member) => (
        <UserInfoPopover key={member.id} data={member} />
      ))}
    </Stack>
  );
}

export default LstMember;
