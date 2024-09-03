import { CloseOutlined } from '@mui/icons-material';
import { Box, CircularProgress, IconButton, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { EffectBtn } from 'src/components/EffectBtn';
import { ButtonPrimary } from 'src/components/button';
import InputCustom from 'src/components/input';
import UploadBtn from 'src/components/upload';
import { useTeamAction } from 'src/redux/features/team/action';
import { useTeamState } from 'src/redux/features/team/teamSlice';
import SelectMember from './select-member';
import SelectTag from './select-tags';

export default function FormAddNewBoard({ onClose }) {
  const [state, setState] = useState({
    name: '',
    description: '',
    thumbnails: '',
    isNameError: false,
  });
  const { createNewTeam, onLoadUserOfSystem } = useTeamAction();
  const { isLoadingCreateNew } = useTeamState();

  const handleCreateTeam = async () => {
    setState({ ...state, isNameError: state.name === '' });

    if (state.name !== '') {
      await createNewTeam({
        ...state,
        tags: state.tags.join(','),
        thumbnails:
          state.thumbnails ||
          'https://firebasestorage.googleapis.com/v0/b/travelappsu.appspot.com/o/undraw_choose_card_n0x0.png?alt=media&token=a3d7f996-ee91-4cfc-9c71-2f2ad7866d03',
      }).then(() => {
        onClose();
      });
    }
  };

  useEffect(() => {
    onLoadUserOfSystem();
  }, []);
  return (
    <Stack direction="column" gap={2} pt={2} sx={{ width: 350, p: 2 }} role="presentation">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Add new board</Typography>
        <IconButton color="primary" onClick={onClose} sx={{ width: 40, height: 40 }}>
          <CloseOutlined />
        </IconButton>
      </Stack>
      <EffectBtn sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box
          sx={{
            width: '100%',
            background: 'rgba(0,0,0,0.05)',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <img
            src={
              state?.thumbnails ||
              'https://firebasestorage.googleapis.com/v0/b/travelappsu.appspot.com/o/undraw_choose_card_n0x0.png?alt=media&token=a3d7f996-ee91-4cfc-9c71-2f2ad7866d03'
            }
            alt="thumbnail"
            style={{ width: '100%', objectFit: 'contain', height: 150, borderRadius: 5 }}
          />
        </Box>
      </EffectBtn>{' '}
      <Stack direction="row" gap={2} alignItems="center" justifyContent="space-evenly">
        <UploadBtn onChangeFile={(file) => setState({ ...state, thumbnails: file })} />
      </Stack>
      <Stack direction="column">
        <InputCustom
          label="Name of board"
          placeholder="Enter name of board"
          onChange={(e) => setState({ ...state, name: e.target.value, isNameError: false })}
        />
        {state.isNameError && (
          <Typography sx={{ ml: 1 }} color="error" variant="h7" fontSize={12}>
            Name is required!
          </Typography>
        )}
      </Stack>
      <SelectTag onChangeValue={(value) => setState({ ...state, tags: value })} />
      <SelectMember onChangeValue={(value) => setState({ ...state, members: value })} />
      <Stack direction="row" gap={2} justifyContent="center">
        <ButtonPrimary disabled={isLoadingCreateNew} onClick={handleCreateTeam}>
          {isLoadingCreateNew && <CircularProgress size={20} />}Create
        </ButtonPrimary>
      </Stack>
    </Stack>
  );
}
