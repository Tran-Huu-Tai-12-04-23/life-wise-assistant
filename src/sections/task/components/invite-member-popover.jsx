import { useState } from 'react';

import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';

import { useTheme } from '@emotion/react';
import { Stack } from '@mui/material';
import { ButtonOutlined, ButtonPrimary } from 'src/components/button';
import Iconify from 'src/components/iconify';
import InviteIcon from 'src/components/icons/invite-icon';
import InputCustom from 'src/components/input';

// ----------------------------------------------------------------------

export default function InviteColumnPopover() {
  const [open, setOpen] = useState(null);
  const theme = useTheme()

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };


  return (
    <>
              <IconButton
              onClick={handleOpen}
            aria-label="fingerprint"
            color="primary"
            size="large"
            sx={{
              border: () => `dashed 1px ${theme.palette.divider}`,
               width: 50, height: 50 
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
            p: 1
          },
        }}
      >
         <Stack spacing={2} direction="column">
          <InputCustom placeholder="Search member"/>
          <InviteIcon width='100%' height={100}/>
          <Stack direction="row" justifyContent="space-between" sx={{
            borderTop: () => `dashed 1px ${theme.palette.divider}`,
            pt: 2
          }}>
            <ButtonOutlined> 
            Generate link invite
            </ButtonOutlined>
            <ButtonPrimary  sx={{width: '35%'}}>
              Invite
            </ButtonPrimary>
          </Stack>
             
         </Stack>
      </Popover>
    </>
  );
}
