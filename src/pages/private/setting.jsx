import { Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useAuthState } from 'src/redux/features/auth/authSlice';

import PermissionErrorView from 'src/sections/error/permission-view';
import SettingView from 'src/sections/setting';

// ----------------------------------------------------------------------

export default function SettingPage() {
  const { currentUser } = useAuthState();

  if (!currentUser)
    return (
      <PermissionErrorView>
        <h1>Permission Denied</h1>
        <p>Sorry, you don`t have permission to view this page</p>
        <Button LinkComponent={Link} variant="contained" color="primary" to="/auth/login">
          Go to Login
        </Button>
      </PermissionErrorView>
    );

  return (
    <>
      <Helmet>
        <title> Setting - Manager </title>
      </Helmet>
      <SettingView />
    </>
  );
}
