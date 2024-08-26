import { useEffect, useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';

import { useTheme } from '@emotion/react';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { Box, Chip, LinearProgress, ListItemButton, Stack, Typography } from '@mui/material';
import { account } from 'src/_mock/account';
import { EffectBtn } from 'src/components/EffectBtn';
import EmptyBoardView from 'src/components/empty/empty-boar-view';
import InputCustom from 'src/components/input';
import { useTeamAction } from 'src/redux/features/team/action';
import { useTeamState } from 'src/redux/features/team/teamSlice';
// ----------------------------------------------------------------------

export default function SelectBoardPopover() {
  const [open, setOpen] = useState(null);
  const { teams, currentTeam, isLoadingPagination } = useTeamState();
  const { paginationTeamOfUser, changeCurrent } = useTeamAction();
  const [dataSelect, setDataSelect] = useState(teams);
  const [search, setSearch] = useState('');
  const theme = useTheme();

  useEffect(() => {
    paginationTeamOfUser();
  }, []);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {
    if (search) {
      const newData = teams.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setDataSelect(newData);
    } else {
      setDataSelect(teams);
    }
  }, [search, teams]);

  return (
    <>
      <EffectBtn
        color="primary"
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          height: 40,
          p: 2,
          pt: 4,
          pb: 3,
        }}
      >
        <Stack onClick={handleOpen} direction="row" alignItems="center" gap={2}>
          <Avatar
            src={currentTeam ? currentTeam?.thumbnails : account.photoURL}
            alt={currentTeam?.name}
            sx={{
              width: 20,
              height: 40,
              minWidth: 50,
              borderRadius: 1,
              border: () => `solid 2px ${theme.palette.background.default}`,
            }}
          >
            {currentTeam?.name?.charAt(0).toUpperCase()}
          </Avatar>
          {currentTeam?.name || 'Select board'}
          <Stack direction="row" alignItems="center" gap={1}>
            {currentTeam?.tags.map((tag, index) => {
              if (index < 2) {
                return (
                  <Chip
                    key={index}
                    label={tag.name}
                    sx={{ background: tag.background, color: tag.color }}
                  />
                );
              }
              if (index === 2) return '...';
              return null;
            })}
          </Stack>
          <UnfoldMoreIcon size={8} color={theme.palette.text.primary} />
        </Stack>
      </EffectBtn>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        className="hide-scroll"
        PaperProps={{
          sx: {
            mt: 1,
            ml: 0.75,
            width: 400,
            p: 2,
            maxHeight: 400,
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          },
        }}
      >
        <InputCustom
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Select board"
        />

        <Box sx={{ my: 1.5, px: 2, pt: 1 }}>{isLoadingPagination && <LinearProgress />}</Box>
        {dataSelect.length === 0 && !isLoadingPagination && <EmptyBoardView />}
        {!isLoadingPagination &&
          dataSelect.map((option, index) => (
            <ListItemButton
              onClick={() => {
                setOpen(null);
                if(currentTeam?.id === option.id) return;
                changeCurrent(option);
              }}
              sx={{
                borderRadius: 1,
                mt: 1,
                mb: 1,
                background:
                  currentTeam?.id === option.id
                    ? theme.palette.background.neutral
                    : 'transparent',
              }}
              key={index}
            >
              <Avatar src={option.thumbnails} sx={{ mr: 2, minWidth: 50, borderRadius: 0.5 }} />
              <Typography sx={{ fontSize: 14 }}>{option.name}</Typography>
            </ListItemButton>
          ))}
      </Popover>
    </>
  );
}
