import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import CardIcon from 'src/components/icons/card-icon';
import { useTeamState } from 'src/redux/features/team/teamSlice';
import Filter from '../components/filter';
import Header from '../header';
import WrapperTaskLayout, { EViewType } from '../wrapper-task-layout';

// ----------------------------------------------------------------------

export default function TaskView() {
  const { currentTeam } = useTeamState();
  const [viewType, setViewType] = useState(EViewType.BOARD);
  return (
    <Box>
      <Header />
      {currentTeam && <Filter onChangeViewType={(vt) => setViewType(vt)} viewType={viewType} />}
      {!currentTeam && (
        <Stack
          direction="column"
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{ height: '100%', mt: 10 }}
        >
          <CardIcon />
          <Typography>Please select a board</Typography>
        </Stack>
      )}
      {currentTeam && <WrapperTaskLayout viewType={viewType} />}
    </Box>
  );
}
