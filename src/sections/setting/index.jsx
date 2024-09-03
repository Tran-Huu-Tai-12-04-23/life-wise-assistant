import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Breadcrumbs, Container, Stack, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import ProfileView from './views/profile';

function SettingView() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="2xl">
      <Breadcrumbs sx={{ mt: 2, mb: 2 }} aria-label="breadcrumb">
        <Typography underline="hover" color="inherit" href="/">
          User
        </Typography>
        <Typography sx={{ color: 'text.primary' }}>Setting</Typography>
      </Breadcrumbs>

      <Stack
        sx={{
          width: '100%',
          backgroundColor: 'background.paper',
          borderRadius: 1,
        }}
        justifyContent="flex-start"
        spacing={2}
        direction="column"
      >
        <Stack direction="row" sx={{ width: '100%' }}>
          <Tabs
            sx={{
              width: '100%',
            }}
            value={value}
            onChange={handleChange}
          >
            <Tab
              sx={{
                width: 200,
              }}
              label="Profile"
              icon={
                <AccountCircleIcon
                  sx={{
                    color: value === 0 ? 'primary.main' : 'action.active',
                  }}
                />
              }
              iconPosition="start"
            />
            <Tab
              sx={{
                width: 200,
              }}
              label="Setting"
              icon={
                <SettingsIcon
                  sx={{
                    color: value === 1 ? 'primary.main' : 'action.active',
                  }}
                />
              }
              iconPosition="start"
            />
            <Tab
              sx={{
                width: 200,
              }}
              label="Notification"
              icon={
                <NotificationsIcon
                  sx={{
                    color: value === 2 ? 'primary.main' : 'action.active',
                  }}
                />
              }
              iconPosition="start"
            />
          </Tabs>
        </Stack>
        <Box sx={{ p: 2, pt: 0, width: '100%' }}>{value === 0 && <ProfileView />}</Box>
      </Stack>
    </Container>
  );
}

export default SettingView;
