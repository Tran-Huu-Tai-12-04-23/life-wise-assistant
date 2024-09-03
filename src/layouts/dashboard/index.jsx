import PropTypes from 'prop-types';
import { useState } from 'react';

import Box from '@mui/material/Box';

import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuthState } from 'src/redux/features/auth/authSlice';
import PermissionErrorView from 'src/sections/error/permission-view';
import Header from './header';
import Main from './main';
import Nav from './nav';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const { currentUser } = useAuthState();
  const [openNav, setOpenNav] = useState(false);
  const [expanded, setExpanded] = useState(false);
  if (!currentUser) {
    return (
      <PermissionErrorView>
        <Button variant="contained" sx={{ mt: 2 }} LinkComponent={Link} to="/auth">
          Go to login
        </Button>
      </PermissionErrorView>
    );
  }

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} expanded={expanded} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        <Nav
          openNav={openNav}
          onCloseNav={() => setOpenNav(false)}
          setExpanded={setExpanded}
          expanded={expanded}
        />
        <Main expanded={expanded}>{children}</Main>
      </Box>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
