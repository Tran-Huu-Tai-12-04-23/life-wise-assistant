import { useState } from 'react';

import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';

import { useTheme } from '@emotion/react';
import { CircularProgress, Stack } from '@mui/material';
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
  const {onGenerateInviteLink} = useTeamAction()
  const theme = useTheme();
  const {currentTeam, inviteLink, isLoadingGenerateInviteLink} = useTeamState()


  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };


  const handleGenerateInviteLink = () => {
    if(currentTeam)
     onGenerateInviteLink(currentTeam.id)
  }


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
            width: 500,
            p: 1,
          },
        }}
      >
        <Stack spacing={2} direction="column">
          <InputCustom placeholder="Search member" />
          <InviteIcon width="100%" height={100} />
          <ButtonPrimary sx={{ width: '100%' }}>Invite</ButtonPrimary>

          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              borderTop: () => `dashed 1px ${theme.palette.divider}`,
              pt: 2,
            }}
          >
          
          {
            inviteLink && <InputCopy sx={{ width:300 }} text={inviteLink}/>
          }
            {
              !inviteLink && 
            <ButtonOutlined onClick={handleGenerateInviteLink}>{isLoadingGenerateInviteLink && <CircularProgress/>}Generate link invite</ButtonOutlined>

            }
          </Stack>

        </Stack>
      </Popover>
    </>
  );
}
