/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { AuthRouter, PrivateRouter } from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import LoadingView from './components/loadingView';
import ModalProvider from './contexts/modal-context';
import { getAccessToken } from './helper';
import { useAuthAction } from './redux/features/auth/action';
import { useAuthState } from './redux/features/auth/authSlice';
// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  const { currentUser } = useAuthState();
  const { getProfile } = useAuthAction();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const initUser = async () => {
      const acToken = getAccessToken();
      if (acToken) {
        await getProfile();
        setTimeout(() => {
setIsLoaded(true);
        }, 1000)
      
      }
    };
    initUser();
  }, []);

  if(isLoaded === false) return <Box sx={{display: 'flex',p: 0, m: 0,height: '100vh'}}><LoadingView /></Box>

  return (
    <ThemeProvider>
      <ModalProvider>
        {currentUser && <PrivateRouter />}
        {!currentUser && <AuthRouter />}
      </ModalProvider>
    </ThemeProvider>
  );
}
