import { useTheme } from '@emotion/react';
import { alpha, Box, Breadcrumbs, Button, Stack, Typography } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingView from 'src/components/loadingView';
import UserInfoPopover from 'src/components/user-info-popover';
import { useTeamAction } from 'src/redux/features/team/action';
import { useTeamState } from 'src/redux/features/team/teamSlice';
import PermissionErrorView from 'src/sections/error/permission-view';
import { fToNow } from 'src/utils/format-time';

function BoardHistory() {
  const { onLoadTeamHistory } = useTeamAction();
  const { currentTeam, isLoadTeamHistory, isHasNextPageTeamHistory, teamHistory } = useTeamState();
  const [page, setPage] = useState(0);
  const [historyToday, setHistoryToday] = useState([]);
  const [historyBefore, setHistoryBefore] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    if (teamHistory.length > 0) {
      const historyTodayData =
        teamHistory?.filter((item) => new Date(item.createdAt).getDate() >= new Date().getDate()) ||
        [];
      const historyBeforeData =
        teamHistory?.filter((item) => new Date(item.createdAt).getDate() < new Date().getDate()) ||
        [];
      setHistoryToday(historyTodayData);
      setHistoryBefore(historyBeforeData);
    }
  }, [teamHistory]);
  useEffect(() => {
    onLoadTeamHistory({
      page,
      take: 10,
    });
  }, [page]);
  if (!currentTeam)
    return (
      <PermissionErrorView>
        <Button sx={{ mt: 2 }} variant="contained" color="primary" LinkComponent={Link} to="/board">
          Return board
        </Button>
      </PermissionErrorView>
    );
  return (
    <Stack sx={{ p: 2 }} direction="column" spacing={2}>
      <Breadcrumbs sx={{ mt: 2, mb: 2 }} aria-label="breadcrumb">
        <Link to="/board" underline="hover" color="inherit" href="/">
          Board
        </Link>
        <Typography sx={{ color: 'text.primary' }}>History</Typography>
      </Breadcrumbs>
      <Typography fontWeight="900">Board history [{currentTeam.name} 2]</Typography>
      {historyToday?.length > 0 && (
        <Stack direction="row" spacing={2} alignItems="center">
          <Box sx={{ width: '42%', height: '1px', background: theme.palette.divider }} />
          <Typography fontWeight={900}>
            Today at {moment(new Date()).format('YYYY/MM/DD')}
          </Typography>
          <Box sx={{ width: '42%', height: '1px', background: theme.palette.divider }} />
        </Stack>
      )}
      {historyToday.map((item, index) => (
        <HistoryItem isHasNextLine={index < historyToday.length - 1} key={index} item={item} />
      ))}

      {historyBefore?.length > 0 && (
        <Stack direction="row" spacing={2} alignItems="center">
          <Box sx={{ width: '100%', height: '1px', background: theme.palette.divider }} />
          <Typography fontWeight={900}>Before</Typography>
          <Box sx={{ width: '100%', height: '1px', background: theme.palette.divider }} />
        </Stack>
      )}
      {isLoadTeamHistory && <LoadingView />}
      {historyBefore.map((item, index) => (
        <HistoryItem isHasNextLine={index < historyBefore.length - 1} key={index} item={item} />
      ))}
      {isHasNextPageTeamHistory && (
        <Button
          onClick={() => {
            setPage(page + 1);
          }}
        >
          More
        </Button>
      )}
    </Stack>
  );
}

const HistoryItem = ({ item, isHasNextLine }) => {
  const { owner } = item;
  const theme = useTheme();
  return (
    <Stack direction="row" spacing={2} sx={{ position: 'relative' }} alignItems="center">
      <Box
        sx={{
          height: 10,
          width: 10,
          borderRadius: 100,
          background: alpha(theme.palette.primary.main, 0.5),
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            height: 5,
            width: 5,
            borderRadius: 100,
            background: theme.palette.primary.main,
          }}
        />

        {isHasNextLine && (
          <Box
            sx={{
              position: 'absolute',
              top: '120%',
              left: '50%',
              transform: 'translate(-50%, -0%)',
              height: 100,
              width: '2px',
              borderRadius: 100,
              background: alpha(theme.palette.primary.main, 0.5),
            }}
          />
        )}
      </Box>

      <Box
        sx={{
          width: '100%',
          p: 2,
          borderRadius: 1,
          background: alpha(theme.palette.background.paper, 0.5),
          display: 'block',
        }}
      >
        <Stack justifyContent="start" alignItems="start" direction="row">
          <UserInfoPopover data={owner} />

          <Stack direction="column" sx={{ ml: 2 }} justifyContent="space-between">
            <Typography>{item.title}</Typography>
            <Typography sx={{ color: theme.palette.primary.main }} variant="h7" fontSize={14}>
              {item.description}
            </Typography>
            <Typography sx={{ color: theme.palette.primary.dark }} variant="h7" fontSize={14}>
              {fToNow(item.createdAt)}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default BoardHistory;
