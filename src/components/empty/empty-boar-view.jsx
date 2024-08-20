import { Stack, Typography } from '@mui/material';
import EmptyBoardIcon from '../icons/empty-board-icon';

function EmptyBoardView({ title }) {
  return (
    <Stack sx={{ p: 2 }} direction="column" alignItems="center" gap={2}>
      <Typography variant="h6" color="gray">
        {title || 'No data'}
      </Typography>
      <EmptyBoardIcon />
    </Stack>
  );
}

export default EmptyBoardView;
