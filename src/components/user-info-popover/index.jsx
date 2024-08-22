import { useState } from 'react';

import Popover from '@mui/material/Popover';

import { useTheme } from '@emotion/react';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import { EffectBtn } from '../EffectBtn';
// ----------------------------------------------------------------------

export default function UserInfoPopover({data}) {
  const [open, setOpen] = useState(null);
  const theme = useTheme();
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <EffectBtn
        onClick={handleOpen}
        aria-label="fingerprint"
        color="primary"
        size="large"
        sx={{ borderRadius: 100 }}
      >
        <Avatar
          alt={data?.username}
          src={data?.avatar}
        />
      </EffectBtn>
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          sx: {
            background: 'transparent',
            border: 'none',
            boxShadow: 'none',
            width: 200,
          },
        }}
      >
        <Box
          sx={{
            p: 1,
            position: 'relative',
            borderRadius: 1,
            background: theme.palette.background.paper,
            border: () => `1px dashed ${theme.palette.divider}`,
          }}
        >
          <Stack direction="column" alignItems="center">
            <Avatar
              alt={data?.username}
              src={data?.avatar}
            />
            <Stack direction="column" alignItems="center">
              <Typography variant="h7">{data?.username}</Typography>
              <Typography color="gray" component="span" fontSize={12}>
                @{data?.username}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Popover>
    </>
  );
}
