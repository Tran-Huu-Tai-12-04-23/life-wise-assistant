import { Stack, Typography } from '@mui/material';
import EmptyBoardIcon from '../icons/empty-board-icon';

function EmptyBoardView() {
  return (
    <Stack sx={{ p: 2 }} direction="column" alignItems="center" gap={2}>
      <Typography variant="h6" color="gray">
        No board
      </Typography>
      <EmptyBoardIcon />
    </Stack>
  );
}

export default EmptyBoardView;
