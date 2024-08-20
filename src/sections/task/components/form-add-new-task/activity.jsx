import { Stack, Typography } from '@mui/material';
import EmptyBoardView from 'src/components/empty/empty-boar-view';
import UserInfoPopover from 'src/components/user-info-popover';

function Activity() {
  return (
    <Stack direction="column" gap={1} sx={{ width: '100%' }} alignItems="flex-start">
      <EmptyBoardView title="No activity" />
      {[].map((item) => (
        <ActivityItem key={item} />
      ))}
    </Stack>
  );
}

const ActivityItem = () => (
  <Stack direction="row" gap={1} alignItems="start">
    <UserInfoPopover />
    <Stack direction="column">
      <Typography variant="h7">
        Huy Nguyen<Typography variant="h7">Da tham gia the nay</Typography>
      </Typography>
      <Typography color="gray" component="span" fontSize={12}>
        13:18 13 thg 8, 2024
      </Typography>
    </Stack>
  </Stack>
);

export default Activity;
