import { useEffect, useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { fToNow } from 'src/utils/format-time';

import { LinearProgress, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useAuthState } from 'src/redux/features/auth/authSlice';
import { useNotificationAction } from 'src/redux/features/notification/action';
import { useNotificationState } from 'src/redux/features/notification/notificationSlice';

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const { pageOneNotification, isLoadNotification, totalUnread, isHasNextPageNotification } =
    useNotificationState();
  const { onNotificationPagination } = useNotificationAction();
  const { currentUser } = useAuthState();
  const [notificationDayNow, setNotificationDayNow] = useState([]);
  const [notificationDayBefore, setNotificationDayBefore] = useState([]);

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {
    if (currentUser) onNotificationPagination();
  }, [currentUser]);

  useEffect(() => {
    /// get notification in day now
    const dataDayNow =
      pageOneNotification?.filter(
        (item) => new Date(item.createdAt).getDate() === new Date().getDate()
      ) || [];
    setNotificationDayNow(dataDayNow);

    // get notification in day before
    const dataDayBefore =
      pageOneNotification?.filter(
        (item) => new Date(item.createdAt).getDate() < new Date().getDate()
      ) || [];
    setNotificationDayBefore(dataDayBefore);
  }, [pageOneNotification]);

  return (
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen}>
        <Badge badgeContent={totalUnread} color="error">
          <Iconify width={24} icon="solar:bell-bing-bold-duotone" />
        </Badge>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          className: 'hide-scroll',
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
            '&::webkit-scrollbar': { display: 'none', width: '0px!important' },
            position: 'relative',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }} className="hide-scroll">
          {isLoadNotification && <LinearProgress />}
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnread} unread messages
            </Typography>
          </Box>

          {totalUnread > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={() => {}}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: 500 }}>
          {notificationDayNow?.length > 0 && (
            <List
              disablePadding
              subheader={
                <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                  New
                </ListSubheader>
              }
            >
              {notificationDayNow?.map((notification) => (
                <NotificationItem
                  onClose={handleClose}
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </List>
          )}
          {notificationDayBefore?.length > 0 && (
            <List
              disablePadding
              subheader={
                <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                  Before that
                </ListSubheader>
              }
            >
              {notificationDayBefore.map((notification) => (
                <NotificationItem
                  onClose={handleClose}
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </List>
          )}
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />
        <Box sx={{ mt: 5 }} />
        {isHasNextPageNotification && (
          <Box
            sx={{
              p: 1,
              position: 'absolute',
              bottom: 0,
              right: 0,
              left: 0,
              background: 'transparent',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Button onClick={handleClose} fullWidth to="/notification" LinkComponent={Link}>
              View All
            </Button>
          </Box>
        )}
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

function NotificationItem({ notification, onClose }) {
  const { onAcceptInvite, onRejectInvite, onMaskAsRead } = useNotificationAction();
  const { title, avatar } = renderContent(notification);

  const { owner } = notification;

  const handleAcceptInvite = async () => {
    await onAcceptInvite(notification?.teamInviteId);
  };

  const handleRejectInvite = async () => {
    await onRejectInvite(notification?.teamInviteId);
  };

  const handleMasAsRead = async () => {
    await onMaskAsRead(notification?.id);
  };

  return (
    <ListItemButton
      to="/notification"
      LinkComponent={Link}
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        position: 'relative',
        ...(!notification?.isRead && {
          bgcolor: 'background.neutral',
        }),
      }}
      onClick={async () => {
        await handleMasAsRead();
        onClose();
      }}
    >
      {!notification?.isRead && (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: 'primary.main',
            position: 'absolute',
            top: 4,
            right: 4,
          }}
        />
      )}
      <Stack direction="column">
        <Stack direction="row">
          <ListItemAvatar>
            <Tooltip title={owner?.username}>
              <Avatar alt={owner?.username} src={owner?.avatar}>
                {avatar}
              </Avatar>
            </Tooltip>
          </ListItemAvatar>
          <ListItemText
            primary={title}
            secondary={
              <Typography
                variant="caption"
                sx={{
                  mt: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  color: 'text.disabled',
                }}
              >
                <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
                {notification?.createdAt && fToNow(new Date(notification.createdAt))}
              </Typography>
            }
          />
        </Stack>

        {!notification?.isRead && notification?.isInviteNotification && (
          <Stack columnGap={2} direction="row" justifyContent="flex-end">
            <Button
              onClick={async (e) => {
                e.stopPropagation();
                e.preventDefault();
                await handleRejectInvite();
              }}
              variant="outlined"
              color="error"
            >
              Cancel
            </Button>
            <Button
              onClick={async (e) => {
                e.stopPropagation();
                e.preventDefault();
                await handleAcceptInvite();
              }}
              variant="contained"
              color="primary"
            >
              Accept
            </Button>
          </Stack>
        )}
      </Stack>
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {notification.description}
      </Typography>
    </Typography>
  );

  if (notification.type === 'order_placed') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_package.svg" />,
      title,
    };
  }
  if (notification.type === 'order_shipped') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_shipping.svg" />,
      title,
    };
  }
  if (notification.type === 'mail') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_mail.svg" />,
      title,
    };
  }
  if (notification.type === 'chat_message') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_chat.svg" />,
      title,
    };
  }
  return {
    avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
    title,
  };
}
