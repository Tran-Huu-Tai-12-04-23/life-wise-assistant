import { useEffect, useMemo, useState } from 'react';

import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';

import { useTheme } from '@emotion/react';
import { Avatar, Box, ListItemButton, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Stack } from '@mui/system';
import Iconify from 'src/components/iconify';
import InputCustom from 'src/components/input';
import { useTeamAction } from 'src/redux/features/team/action';
import { useTeamState } from 'src/redux/features/team/teamSlice';
// ----------------------------------------------------------------------

export default function AssignMemberPopover({taskData, isRight }) {
  const {  currentTeam } = useTeamState();
  const { onGetLstUserToInvite } = useTeamAction();
  const [open, setOpen] = useState(null);
  const [searchKey, setSearchKey] = useState('');
  const [lstUserToSelect, setLstUserToSelect] = useState([]);
  const theme = useTheme();
  const [selectedValue, setSelectedValue] = useState([]);

  const handleOpen = (event) => {
    event.stopPropagation();
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {
    setLstUserToSelect([... (currentTeam?.members || [])]);
  }, [currentTeam?.members]);

  useEffect(() => {
    const lstPersonInChargeOfTask = taskData?.lstMember?.map((item) => item?.id) || [];
    if (searchKey) {
      const res = currentTeam?.members?.filter((item) =>
        item?.username.toLowerCase().includes(searchKey?.toLowerCase())
      )?.filter( item => !lstPersonInChargeOfTask?.includes(item?.id));
      setLstUserToSelect(res);
    } else {
      const lstUser = currentTeam?.members?.filter( item => !lstPersonInChargeOfTask?.includes(item?.id)) || [];
      setLstUserToSelect(lstUser);
    }
  }, [searchKey]);

  useEffect(() => {
    onGetLstUserToInvite();
  }, []);


  if(!currentTeam?.isOwner && !taskData?.isOwner) return null
  return (
    <>
      <IconButton
        onClick={handleOpen}
        aria-label="fingerprint"
        color="primary"
        size="large"
        sx={{
          border: () => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        <Iconify icon="eva:plus-fill" sx={{ color: 'gray' }} />
      </IconButton>
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: isRight ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: isRight ? 'right' : 'left' }}
        PaperProps={{
          sx: {
            width: 320,
            boxShadow: 12,
          },
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Box
          sx={{
            p: 2,
            borderRadius: 1,
          }}
        >
          <InputCustom
            value={searchKey}
            placeholder="Search member"
            onChange={(val) => setSearchKey(val.target.value)}
          />
          <Stack
            gap={1}
            direction="column"
            sx={{
              mt: 1,
              maxHeight: 400,
              overflowY: 'scroll',

              '&::-webkit-scrollbar': {
                width: 0,
              },
            }}
          >
            {lstUserToSelect.map((user, index) => (
              <MemberItem
                onSelect={(val) => {
                  const userExist = selectedValue.find((item) => item?.id === val?.id);
                  if (userExist) {
                    setSelectedValue(selectedValue.filter((item) => item?.id !== val?.id));
                  } else {
                    setSelectedValue([...selectedValue, val]);
                  }
                }}
                selectedValue={selectedValue}
                key={index}
                user={user}
              />
            ))}
          </Stack>
          <Stack
            direction="row"
            gap={2}
            justifyContent="flex-end"
            sx={{ mt: 1, borderTop: 1, borderColor: theme.palette.divider }}
          >
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{
                borderColor: 'red',
                color: 'red',
                '&:hover': {
                  borderColor: 'red',
                  color: 'red',
                },
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" startIcon={<Iconify icon="eva:checkmark-fill" />}>
              Apply
            </Button>
          </Stack>
        </Box>
      </Popover>
    </>
  );
}

const MemberItem = ({ user, onSelect, selectedValue }) => {
  const theme = useTheme();
  const isSelected = useMemo(
    () => selectedValue.find((item) => item?.id === user?.id),
    [selectedValue]
  );
  return (
    <ListItemButton
      sx={{
        borderRadius: 0.5,
        cursor: 'pointer',
        backgroundColor: isSelected
          ? theme.palette.action.selected
          : theme.palette.background.default,
        '&:hover': {
          bgcolor: theme.palette.action.hover,
        },
      }}
      onClick={() => onSelect(user)}
    >
      <Stack direction="row" gap={1} alignItems="center">
        <Avatar size="large" alt={user?.username} src={user?.avatar} />
        <Typography component="span" sx={{ fontSize: 12 }}>
          {user?.username}
        </Typography>
      </Stack>
    </ListItemButton>
  );
};
