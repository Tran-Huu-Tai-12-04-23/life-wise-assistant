import { useTheme } from '@emotion/react';
import { Box, Button, ButtonGroup, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Iconify from 'src/components/iconify';
import RefreshIcon from 'src/components/icons/refresh-icon';
import InputCustom from 'src/components/input';
import { HEADER } from 'src/layouts/dashboard/config-layout';
import { useColumnAction } from 'src/redux/features/column/action';
import { useColumnState } from 'src/redux/features/column/columnSlice';
import { useTeamState } from 'src/redux/features/team/teamSlice';
import { bgBlur } from 'src/theme/css';
import { EViewType } from '../wrapper-task-layout';
import FilterWithMember from './filter-with-member';
import InviteColumnPopover from './invite-member-popover';
import SelectColumnPopover from './select-column-popover';
import SelectStatus from './select-status';

function Filter({ onChangeViewType, viewType }) {
  const theme = useTheme();
  const { currentTeam } = useTeamState();
  const { filter } = useColumnState();

  const { onLoadDataToFilter, onClearColumnFilter, onGetAllColumnOfTeam, onChangeFilter } =
    useColumnAction();

  useEffect(() => {
    if (!currentTeam) return null;
    const timer = setTimeout(() => {
      onGetAllColumnOfTeam();
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [filter.searchKey]);

  useEffect(() => {
    if (currentTeam) onGetAllColumnOfTeam();
  }, [filter.members, filter.lstStatus]);

  useEffect(() => {
    if (currentTeam) onLoadDataToFilter();
  }, [currentTeam]);

  const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 10000));
  const testToast = () => {
    toast.promise(resolveAfter3Sec, {
      pending: 'Promise is pending',
      success: 'Promise resolved 👌',
      error: 'Promise rejected 🤯',
    });
  };

  if(!currentTeam) return null

  return (
    <Box
      sx={{
        boxShadow: 'none',
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        width: `calc(100%)`,
        height: HEADER.H_DESKTOP / 2,
        position: 'sticky',
        right: 0,
        top: HEADER.H_DESKTOP * 2 + 12,
        backdropFilter: 'blur(6px)',
        zIndex: 2,
        borderBottom: () => `dashed 1px ${theme.palette.divider}`,
        borderTop: () => `dashed 1px ${theme.palette.divider}`,
        paddingBottom: 4,
        paddingTop: 4,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ height: '100%', width: '100%' }}
      >
        <Stack direction="row" gap={2}>
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button
              color="primary"
              onClick={() => {
                onChangeViewType(EViewType.BOARD);
              }}
              variant={viewType === EViewType.BOARD ? 'contained' : 'outlined'}
            >
              <Iconify icon="eva:board-fill" /> Board
            </Button>
            <Button
              onClick={() => {
                onChangeViewType(EViewType.LIST);
              }}
              color="primary"
              variant={viewType === EViewType.LIST ? 'contained' : 'outlined'}
            >
              <Iconify icon="eva:list-fill" /> List
            </Button>
          </ButtonGroup>
          <Button onClick={testToast} color="primary" variant="text">
            <Stack direction="row" alignItems="center" gap={1}>
              <Iconify icon="eva:lock-fill" color="gray" />
              <Typography variant="h7" color="gray">
                Limited Access
              </Typography>
              <Iconify icon="eva:arrow-ios-downward-fill" color="gray" />
            </Stack>
          </Button>
        </Stack>
        <Stack direction="row" gap={2} alignItems="center">
          <FilterWithMember />
          <InviteColumnPopover />
          <SelectColumnPopover />
          <InputCustom
            minWidth="300px"
            placeholder="Search ..."
            value={filter.searchKey}
            onChange={(e) => onChangeFilter('searchKey', e.target.value)}
          />
          <Stack direction="row" alignItems="center" gap={1}>
            <SelectStatus />
            <Button
              color="primary"
              onClick={onClearColumnFilter}
              variant="outlined"
              sx={{ padding: 1 }}
            >
              <RefreshIcon size={18} color={theme.palette.primary.main} />
              <Typography variant="h8" fontSize={12}>
                Clear filter
              </Typography>
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Filter;
