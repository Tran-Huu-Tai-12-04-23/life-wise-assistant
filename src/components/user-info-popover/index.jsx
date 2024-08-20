import { useState } from 'react';

import Popover from '@mui/material/Popover';

import { useTheme } from '@emotion/react';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import { EffectBtn } from '../EffectBtn';
// ----------------------------------------------------------------------

export default function UserInfoPopover() {
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
          alt="Remy Sharp"
          src="https://cdn.dribbble.com/userupload/9486882/file/original-e8bdcf5e6d9a8de357f50c56c6049dc9.png?crop=347x260-2854x2140&resize=400x300&vertical=center"
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
              alt="Remy Sharp"
              src="https://cdn.dribbble.com/userupload/9486882/file/original-e8bdcf5e6d9a8de357f50c56c6049dc9.png?crop=347x260-2854x2140&resize=400x300&vertical=center"
            />
            <Stack direction="column" alignItems="center">
              <Typography variant="h7">Huy Nguyen</Typography>
              <Typography color="gray" component="span" fontSize={12}>
                @huy_nguyen
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Popover>
    </>
  );
}
