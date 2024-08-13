import { Box } from '@mui/material';
import { useState } from 'react';
import { useTeamState } from 'src/redux/features/team/teamSlice';
import Filter from '../components/filter';
import Header from '../header';
import WrapperTaskLayout, { EViewType } from '../wrapper-task-layout';

// ----------------------------------------------------------------------

export default function TaskView() {
  const {currentTeam} = useTeamState()
  const [viewType, setViewType] = useState(EViewType.BOARD);
  console.log(viewType)
  return (
    <Box>
      <Header />
      {
        currentTeam && <Filter onChangeViewType={vt => setViewType(vt)} viewType={viewType} />
      }
      <WrapperTaskLayout viewType={viewType} />
    </Box>
  );
}
