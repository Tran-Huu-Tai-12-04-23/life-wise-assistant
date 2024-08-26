import { useTheme } from '@emotion/react';
import { LinearProgress, Stack, Typography } from '@mui/material';
import moment from 'moment';
import EmptyBoardView from 'src/components/empty/empty-boar-view';
import UserInfoPopover from 'src/components/user-info-popover';

function Activity({ isLoading, data }) {
  return (
    <Stack direction="column" gap={1} sx={{ width: '100%' }} alignItems="flex-start">

{isLoading && <LinearProgress/>}

      {data?.length <= 0 && <EmptyBoardView title="No activity" />}
      {data?.map((item) => (
        <ActivityItem key={item.id} data={item} />
      ))}
    </Stack>
  );
}

const ActivityItem = ({ data }) => {
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      gap={1}
      alignItems="start"
      sx={{
        borderRadius: 1,
        background: theme.palette.background.default,
        padding: 1,
        width: '100%',
      }}
    >
      
      <UserInfoPopover data={data?.owner} />
      <Stack direction="column">
        <Typography variant="h7">{data?.owner?.username}</Typography>
        <Typography variant="h7">{data?.description}</Typography>

        <Typography color="gray" component="span" fontSize={12}>
          {moment(data?.createdAt).format('DD/MM/YYYY HH:mm')}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Activity;
