import { useTheme } from '@emotion/react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  Breadcrumbs,
  Button,
  CircularProgress,
  Collapse,
  FormControlLabel,
  FormGroup,
  Grid,
  ListItemButton,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserInfoPopover from 'src/components/user-info-popover';
import { useTeamState } from 'src/redux/features/team/teamSlice';
import PermissionErrorView from 'src/sections/error/permission-view';
import { loadTeamPermissionOfUser, updateTeamPermissionOfUser } from 'src/services/team';

function BoardAccessControlSetting({ onClose }) {
  const { currentTeam } = useTeamState();

  if (!currentTeam)
    return (
      <PermissionErrorView>
        <Typography sx={{ mt: 2 }} variant="h6">
          Please select a team
        </Typography>
        <Button variant="contained" onClick={onclose} color="primary" sx={{ mt: 2 }}>
          Select a team
        </Button>
      </PermissionErrorView>
    );

  return (
    <Stack
      sx={{
        p: 2,
      }}
    >
      <Breadcrumbs sx={{ mt: 2, mb: 2 }} aria-label="breadcrumb">
        <Link to="/board" underline="hover" color="inherit" href="/">
          Board
        </Link>
        <Typography sx={{ color: 'text.primary' }}>Access control</Typography>
      </Breadcrumbs>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" gap={2}>
          <Typography variant="h6">Access control setting for</Typography>
          <Typography variant="h6" color="primary">
            [{currentTeam.name}]
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="column" sx={{ borderRadius: 1 }}>
        <Grid container>
          {currentTeam?.members?.map((user) => (
            <Grid item xs={6} key={user.id}>
              <AccessControlMember data={user} />
            </Grid>
          ))}
        </Grid>

        <Stack
          direction="row"
          justifyContent="center"
          sx={{
            p: 2,
          }}
        >
          {/* <Pagination count={2} variant="outlined" color="primary" /> */}
        </Stack>
      </Stack>
    </Stack>
  );
}

const AccessControlMember = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { currentTeam } = useTeamState();
  const theme = useTheme();
  const [teamPermission, setTeamPermission] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveChange = async () => {
    try {
      setIsLoading(true);
      await updateTeamPermissionOfUser({
        ...teamPermission,
      });
      toast.success('Update user permission successfully1');

      setIsExpanded(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initData = async () => {
      try {
        const res = await loadTeamPermissionOfUser({
          teamId: currentTeam.id,
          userId: data.id,
        });
        setTeamPermission(res);
      } catch (error) {
        console.log(error);
      }
    };
    if (currentTeam) initData();
  }, [data]);

  if (!teamPermission) return <CircularProgress />;

  return (
    <>
      <ListItemButton
        onClick={() => setIsExpanded(!isExpanded)}
        sx={{ m: 1, borderRadius: 1, background: theme.palette.background.paper }}
      >
        {isExpanded ? (
          <KeyboardArrowUpIcon onClick={() => setIsExpanded(!isExpanded)} />
        ) : (
          <KeyboardArrowDownIcon onClick={() => setIsExpanded(!isExpanded)} />
        )}

        <Stack
          justifyContent="space-between"
          direction="row"
          gap={2}
          alignItems="center"
          sx={{
            width: '100%',
          }}
        >
          <Stack direction="row" gap={2} alignItems="center">
            <UserInfoPopover data={data} /> <Typography>{data.username}</Typography>
          </Stack>
        </Stack>
      </ListItemButton>
      <Collapse in={isExpanded} orientation="vertical">
        <Stack
          direction="column"
          gap={2}
          sx={{
            width: '100%',
          }}
        >
          <FormGroup
            sx={{
              pl: 2,
            }}
          >
            <Stack direction="row" gap={2} alignItems="center">
              <FormControlLabel
                control={
                  <Switch
                    checked={teamPermission.isAdmin}
                    onChange={(e) => {
                      setTeamPermission({ ...teamPermission, isAdmin: e.target.checked });
                    }}
                  />
                }
                label="Admin"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={teamPermission.isAssign}
                    onChange={(e) => {
                      setTeamPermission({ ...teamPermission, isAssign: e.target.checked });
                    }}
                  />
                }
                label="Assign"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={teamPermission.isEdit}
                    onChange={(e) => {
                      setTeamPermission({ ...teamPermission, isEdit: e.target.checked });
                    }}
                  />
                }
                label="Edit"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={teamPermission.isDelete}
                    onChange={(e) => {
                      setTeamPermission({ ...teamPermission, isDelete: e.target.checked });
                    }}
                  />
                }
                label="Remove"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={teamPermission.isCreate}
                    onChange={(e) => {
                      setTeamPermission({ ...teamPermission, isCreate: e.target.checked });
                    }}
                  />
                }
                label="Create"
              />
            </Stack>
          </FormGroup>

          <Stack direction="row" justifyContent="flex-end" gap={2} alignItems="center">
            <Button
              onClick={() => {
                setIsExpanded(false);
              }}
              color="error"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button onClick={handleSaveChange} color="primary" variant="contained">
              {isLoading && <CircularProgress size={12} color="inherit" />}
              Save
            </Button>
          </Stack>
        </Stack>
      </Collapse>
    </>
  );
};

export default BoardAccessControlSetting;
