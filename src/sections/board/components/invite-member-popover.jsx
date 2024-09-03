import { useEffect, useState } from 'react';

import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';

import { useTheme } from '@emotion/react';
import {
  alpha,
  Avatar,
  Box,
  CircularProgress,
  LinearProgress,
  ListItemButton,
  Stack,
  Typography,
} from '@mui/material';
import { ButtonOutlined, ButtonPrimary } from 'src/components/button';
import Iconify from 'src/components/iconify';
import InviteIcon from 'src/components/icons/invite-icon';
import InputCustom from 'src/components/input';
import InputCopy from 'src/components/input-copy';
import { useTeamAction } from 'src/redux/features/team/action';
import { useTeamState } from 'src/redux/features/team/teamSlice';

// ----------------------------------------------------------------------

export default function InviteColumnPopover() {
  const [open, setOpen] = useState(null);
  const { onGenerateInviteLink, onGetLstUserToInvite, onInviteUsersToTeam } = useTeamAction();
  const theme = useTheme();
  const [searchKey, setSearchKey] = useState('');
  const { currentTeam, inviteLink, isLoadingGenerateInviteLink, lstUser } = useTeamState();
  const [userSelect, setUserSelect] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleGenerateInviteLink = () => {
    if (currentTeam) onGenerateInviteLink(currentTeam.id);
  };

  const handleInviteUsersToTeam = async () => {
    handleClose();
    if (currentTeam.isOwner) {
      const lstUserId = userSelect.map((item) => item.id);
      setUserSelect([]);
      await onInviteUsersToTeam({
        teamId: currentTeam.id,
        lstUserId,
      });
    }
  };

  useEffect(() => {
    if (!currentTeam) return null;
    setIsLoading(true);
    const timer = setTimeout(async () => {
      await onGetLstUserToInvite(
        currentTeam?.members?.map((item) => item.id),
        searchKey
      )
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchKey]);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        aria-label="fingerprint"
        size="large"
        color="primary"
        sx={{
          border: () => `dashed 1px ${theme.palette.divider}`,
          width: 50,
          height: 50,
        }}
      >
        <Iconify icon="eva:plus-fill" />
      </IconButton>
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          sx: {
            width: 300,
            p: 1,
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          },
        }}
      >
        <Stack spacing={2} direction="column">
          <InputCustom
            placeholder="Search member"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <Box sx={{ height: 1.5 }}>{isLoading && <LinearProgress />}</Box>
          {lstUser?.length <= 0 && <InviteIcon width="100%" height={100} />}

          {lstUser.length > 0 && (
            <Stack
              sx={{
                overflowY: 'scroll',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
              }}
              spacing={1}
              direction="column"
            >
              {lstUser.map((item) => {
                const isChecked = userSelect.find((user) => user.id === item.id);
                return (
                  <ListItemButton
                    sx={{
                      overflow: 'hidden',
                      pr: 2,
                      p: 1,
                      borderRadius: 0.5,
                      backgroundColor: isChecked
                        ? alpha(theme.palette.primary.main, 0.5)
                        : 'transparent',
                    }}
                    key={item.id}
                    onClick={() => {
                      if (isChecked) {
                        setUserSelect(userSelect.filter((user) => user.id !== item.id));
                      } else {
                        setUserSelect([...userSelect, item]);
                      }
                    }}
                  >
                    <Avatar
                      alt={item.username}
                      src={item.avatar}
                      sx={{ width: 24, height: 24, mr: 2 }}
                    />
                    <Typography>{item.username}</Typography>
                  </ListItemButton>
                );
              })}
            </Stack>
          )}

          {userSelect.length > 0 && (
            <ButtonPrimary onClick={handleInviteUsersToTeam}>Invite</ButtonPrimary>
          )}

          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              borderTop: () => `dashed 1px ${theme.palette.divider}`,
              width: '100%',
            }}
          >
            {inviteLink && <InputCopy sx={{ width: 300 }} text={inviteLink} />}
            {!inviteLink && (
              <ButtonOutlined
                sx={{
                  width: '100%',
                }}
                onClick={handleGenerateInviteLink}
              >
                {isLoadingGenerateInviteLink && <CircularProgress />}Generate link invite
              </ButtonOutlined>
            )}
          </Stack>
        </Stack>
      </Popover>
    </>
  );
}
