import PropTypes from 'prop-types';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';

import { useResponsive } from 'src/hooks/use-responsive';


import Iconify from 'src/components/iconify';

import AccountPopover from './common/account-popover';
import NotificationsPopover from './common/notifications-popover';
import { HEADER, NAV } from './config-layout';
import QuickSearch from './quick-search';

// ----------------------------------------------------------------------

export default function Header({ onOpenNav, expanded }) {
  const theme = useTheme();

  const lgUp = useResponsive('up', 'lg');

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={1}>
        <QuickSearch />
        <NotificationsPopover />
        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        background: 'transparent',
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        borderBottom: () => `dashed 1px ${theme.palette.divider}`,
        ...(lgUp && {
          width: `calc(100% - ${expanded ? NAV.WIDTH + 1 : NAV.WIDTH/ 3}px)`,
          height: HEADER.H_DESKTOP + 5,
        }),
        backdropFilter: 'blur(10px)',
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
