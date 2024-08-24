import { useTheme } from '@emotion/react';
import { Box, LinearProgress, alpha } from '@mui/material';

function LoadingView() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        position: 'absolute',
        top: 0,right:0, left: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: alpha(theme.palette.background.default, 0.1),
        zIndex: 9999,
      }}
    >
      <LinearProgress  color="success" sx={{borderRadius: 1, width: '100%', position: 'absolute', top: 0}}/>
   </Box>
  );
}

export default LoadingView;
