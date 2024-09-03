import { useState } from 'react';

import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { Avatar, Chip, Stack, Tooltip, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import { useNotificationAction } from 'src/redux/features/notification/action';

// ----------------------------------------------------------------------

export default function NotificationTableRow({ selected, data, handleClick }) {
  const [open, setOpen] = useState(null);
  const { onAcceptInvite, onRejectInvite } = useNotificationAction();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Tooltip title={data?.owner?.username}>
              <Avatar alt={data?.owner?.username} src={data?.owner?.avatar} />
            </Tooltip>
            <Typography variant="subtitle2" noWrap>
              {data?.title}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{data?.description}</TableCell>

        <TableCell>
          <Chip
            label={data?.notificationTypeName}
            sx={{
              bgcolor: data?.notificationTypeBackground,
              color: data?.notificationTypeColor,
            }}
          />
        </TableCell>

        <TableCell>
          <Label color={data?.isRead ? 'success' : 'error'}>
            {data?.isRead ? 'Read' : 'UnRead'}
          </Label>
        </TableCell>
        <TableCell align="right">
          {!data?.isRead && (
            <IconButton onClick={handleOpenMenu}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          )}
        </TableCell>
      </TableRow>

      {!data?.isRead && (
        <Popover
          open={!!open}
          anchorEl={open}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: { width: 140 },
          }}
        >
          <MenuItem onClick={handleCloseMenu}>
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            Mark Read
          </MenuItem>

          {data?.isInviteNotification && !data.isRead && (
            <>
              <MenuItem
                onClick={async (e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  await onRejectInvite(data.teamInviteId);
                  handleCloseMenu();
                }}
                sx={{
                  color: 'error.main',
                  '&:hover': { bgcolor: 'error.lighter' },
                }}
              >
                <Iconify icon="eva:close-fill" sx={{ mr: 2 }} />
                Reject
              </MenuItem>
              <MenuItem
                onClick={async (e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  await onAcceptInvite(data.teamInviteId);
                  handleCloseMenu();
                }}
                sx={{
                  color: 'primary.main',
                  '&:hover': { bgcolor: 'primary.lighter' },
                }}
              >
                <Iconify icon="eva:checkmark-fill" sx={{ mr: 2 }} />
                Accept
              </MenuItem>
            </>
          )}
        </Popover>
      )}
    </>
  );
}
