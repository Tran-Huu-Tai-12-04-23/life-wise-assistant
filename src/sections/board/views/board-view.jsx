import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import CardIcon from 'src/components/icons/card-icon';
import { useResponsive } from 'src/hooks/use-responsive';
import { HEADER } from 'src/layouts/dashboard/config-layout';
import { useTeamState } from 'src/redux/features/team/teamSlice';
import Filter from '../components/filter';
import Header from '../header';
import WrapperTaskLayout, { EViewType } from '../wrapper-task-layout';

// ----------------------------------------------------------------------

export default function BoardView() {
  const { currentTeam } = useTeamState();
  const [viewType, setViewType] = useState(EViewType.BOARD);

  const lgUp = useResponsive('up', 'lg');
  return (
    <Box
      sx={{
        height: `calc(100% - ${HEADER.H_MOBILE}px)`,
        ...(lgUp && {
          height: `calc(100% - ${HEADER.H_DESKTOP + 5}px)`,
        }),
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      <Header />
      {currentTeam && <Filter onChangeViewType={(vt) => setViewType(vt)} viewType={viewType} />}
      {!currentTeam && (
        <Stack
          direction="column"
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{ height: '70%', mt: 10 }}
        >
          <CardIcon />
          <Typography>Please select a board</Typography>
        </Stack>
      )}
      {currentTeam && <WrapperTaskLayout viewType={viewType} />}
    </Box>
  );
}
