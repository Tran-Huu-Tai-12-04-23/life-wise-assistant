import PropTypes from 'prop-types';
import { useState } from 'react';

import Box from '@mui/material/Box';

import Header from './header';
import Main from './main';
import Nav from './nav';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} expanded={expanded} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} setExpanded={setExpanded} expanded={expanded} />
        <Main expanded={expanded}>{children}</Main>
      </Box>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
