import { Box, Button, Drawer, Stack, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import Iconify from 'src/components/iconify';
import { HEADER } from 'src/layouts/dashboard/config-layout';
import { bgBlur } from 'src/theme/css';
import FormAddNewBoard from '../components/form-add-new-board';
import SelectBoardPopover from '../components/select-board-popover';

function Header() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };
  return (
    <>
      <Box
        sx={{
          boxShadow: 'none',
          px: 2,
          ...bgBlur({
            color: theme.palette.background.default,
          }),
          transition: theme.transitions.create(['height'], {
            duration: theme.transitions.duration.shorter,
          }),
          width: `calc(100%)`,
          height: HEADER.H_DESKTOP,
          position: 'sticky',
          top: HEADER.H_DESKTOP + 10,
          right: 0,
          zIndex: 3,
          backdropFilter: 'blur(20px)',
          background: 'transparent',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ height: '100%' }}
        >
          <Stack gap={1} alignItems="center" direction="row">
            <SelectBoardPopover />
          </Stack>
          <Stack direction="row" gap={2}>
            <Button
              color="primary"
              onClick={() => {
                toggleDrawer(true);
              }}
              aria-label="fingerprint"
              size="large"
              sx={{
                border: () => `dashed 1px ${theme.palette.divider}`,
              }}
            >
              <Iconify icon="eva:plus-fill" />
              <Typography variant="caption">Add new board</Typography>
            </Button>
          </Stack>
        </Stack>
      </Box>
      <Drawer anchor="right" open={open} onClose={() => toggleDrawer(false)}>
        <FormAddNewBoard onClose={() => toggleDrawer(false)} />
      </Drawer>
    </>
  );
}

export default Header;
