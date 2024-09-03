/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { AppRouter } from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import LoadingView from './components/loadingView';
import ModalProvider from './contexts/modal-context';
import { getAccessToken } from './helper';
import { useAuthAction } from './redux/features/auth/action';
// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();
  const { onGetProfileWithAccessToken } = useAuthAction();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const initUser = async () => {
      const acToken = await getAccessToken();
      if (acToken) {
        await onGetProfileWithAccessToken();
        setTimeout(() => {
          setIsLoaded(true);
        }, 1000);
      } else {
        setIsLoaded(true);
      }
    };
    initUser();
  }, []);

  if (isLoaded === false)
    return (
      <Box sx={{ display: 'flex', p: 0, m: 0, height: '100vh' }}>
        <LoadingView />
      </Box>
    );

  return (
    <ThemeProvider>
      <ModalProvider>
        <AppRouter />
      </ModalProvider>
    </ThemeProvider>
  );
}
