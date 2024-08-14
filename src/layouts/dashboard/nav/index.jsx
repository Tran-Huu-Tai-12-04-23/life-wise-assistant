import PropTypes from 'prop-types';
import { useEffect } from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { usePathname } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import { account } from 'src/_mock/account';

import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';

import { useTheme } from '@emotion/react';
import { IconButton } from '@mui/material';
import Iconify from 'src/components/iconify';
import { NAV } from '../config-layout';
// ----------------------------------------------------------------------
import NavMenu from './nav-menu';

export default function Nav({ openNav, onCloseNav, setExpanded, expanded }) {
  const pathname = usePathname();
  const theme = useTheme();
  const upLg = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname, onCloseNav, openNav]);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 1,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: () => alpha(theme.palette.grey[500], 0.12),
        width: 'max-content',
      }}
    >
      <Avatar src={account.photoURL} alt="photoURL" />
      {expanded && (
        <Box sx={{ ml: 2 }}>
          <Typography variant="subtitle2">{account.displayName}</Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {account.role}
          </Typography>
        </Box>
      )}
    </Box>
  );

  const renderUpgrade = (
    <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
      <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
        <Box
          component="img"
          src="/assets/illustrations/illustration_avatar.png"
          sx={{ width: 100, position: 'absolute', top: -50 }}
        />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6">Get more?</Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            From only $69
          </Typography>
        </Box>

        <Button
          href="https://material-ui.com/store/items/minimal-dashboard/"
          target="_blank"
          variant="contained"
          color="inherit"
        >
          Upgrade to Pro
        </Button>
      </Stack>
    </Box>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
        position: 'relative',
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 3, p: 2 }}
      >
        <Logo />
        <IconButton onClick={() => setExpanded(!expanded)}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      </Stack>
      {renderAccount}

      <Stack component="nav" >
        <NavMenu expanded={expanded}/>
      </Stack>

      <Box sx={{ flexGrow: 1 }} />

      {expanded && renderUpgrade}
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: expanded ? NAV.WIDTH : NAV.WIDTH / 2 - 10 },
        backgroundColor: 'white',
        zIndex: theme.zIndex.appBar - 1,
        overflow: 'hidden',
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: expanded ? NAV.WIDTH : NAV.WIDTH / 2 - 10,
            borderRight: () => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};




