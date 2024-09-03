import CreateIcon from '@mui/icons-material/Create';
import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Grid,
    IconButton,
    TextField,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import LoadingView from 'src/components/loadingView';
import { useAuthAction } from 'src/redux/features/auth/action';
import { useAuthState } from 'src/redux/features/auth/authSlice';
import { getProfile, updateProfile } from 'src/services/user';
import AvatarSetting from '../components/avatar-setting';

function ProfileView() {
  const [profileData, setProfileData] = useState(null);
  const [isEdit, setIsEdit] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { currentUser } = useAuthState();

  useEffect(() => {
    const initData = async () => {
        setIsLoading(true)
      const res = await getProfile();
      if (res) setProfileData(res);
        setIsLoading(false)

    };
    initData();
  }, [isEdit]);

  if (!currentUser) return null;
  return (
    <>
<Box sx={{height: 2}}>
        {isLoading && <LoadingView/>}
</Box>
      <Typography variant="h4">User information</Typography>
      <Typography variant="h7">
        Enter require information below. You can change it any time you want.
      </Typography>
      {!isEdit && (
        <IconButton onClick={() => setIsEdit(!isEdit)}>
          <CreateIcon />
        </IconButton>
      )}

        <EditView
        isShow={isEdit}
          data={{ ...profileData, avatar: currentUser.avatar }}
          onClose={() => setIsEdit(!isEdit)}
        />
      
        <InfoView    isShow={!isEdit} data={{ ...profileData, avatar: currentUser.avatar }} />
     
    </>
  );
}
const InfoView = ({ data , isShow}) => (
  <Grid container spacing={2} sx={{ mt: 1,  display: isShow ? 'isShow': 'none', }}>
    <Grid
      item
      xs={12}
      sx={{
        
        justifyContent: 'center',
        alignItems: 'center',
        height: 180,
      }}
    >
      <Avatar
        src={data?.avatar}
        sx={{
          width: 150,
          height: 150,
        }}
      />
    </Grid>
    <Grid item xs={6}>
      <Typography variant="h6">Full name</Typography>
      <Typography>{data.fullName}</Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="h6">Address</Typography>
      <Typography>{data.address}</Typography>
    </Grid>

    <Grid item xs={6}>
      <Typography variant="h6">Phone number</Typography>
      <Typography>{data.phoneNumber}</Typography>
    </Grid>

    <Grid item xs={6}>
      <Typography variant="h6">Email</Typography>
      <Typography>{data.email}</Typography>
    </Grid>

    <Grid item xs={6}>
      <Typography variant="h6">Github</Typography>
      <Typography>{data.githubLink}</Typography>
    </Grid>

    <Grid item xs={6}>
      <Typography variant="h6">Telegram</Typography>
      <Typography>{data.telegramLink}</Typography>
    </Grid>

    <Grid item xs={6}>
      <Typography variant="h6">Facebook</Typography>
      <Typography>{data.facebookLink}</Typography>
    </Grid>

    <Grid item xs={6}>
      <Typography variant="h6">Bio</Typography>
      <Typography>{data.bio}</Typography>
    </Grid>
  </Grid>
);

const EditView = ({ data, onClose, isShow }) => {
  // eslint-disable-next-line no-shadow
  const { getProfile } = useAuthAction();
  const [errorRequired, setErrorRequired] = useState(false);
  const [editData, setEditData] = useState({ ...data });
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    // handle required field
    setErrorRequired({
      fullName: !editData.fullName,
      address: !editData.address,
      phoneNumber: !editData.phoneNumber,
      email: !editData.email,
      githubLink: !editData.githubLink,
      telegramLink: !editData.telegramLink,
      facebookLink: !editData.facebookLink,
      bio: !editData.bio,
    });

    // handle check exist error then return
    const checkArr = Object.keys(errorRequired)
      .map((key) => errorRequired[key])
      .includes(true);
    if (checkArr) return;
    // handle save data
    const res = await updateProfile(editData);
    if (res) {
      toast.success('Update profile success!');
    }

    await getProfile();
    onClose();
    setIsLoading(false);
  };

  useEffect(() => {
    setEditData({ ...data });
  }, [data])

  return (
    <Grid container spacing={2} sx={{ mt: 1, display: isShow ? 'flex': 'none' }}>
      <Grid
        item
        xs={12}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 180,
        }}
      >
        <AvatarSetting
          value={editData?.avatar}
          onChangeValue={(val) => setEditData({ ...editData, avatar: val })}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          sx={{
            width: '100%',
          }}
          value={editData.fullName}
          onChange={(e) => {
            setEditData({ ...editData, fullName: e.target.value });
            setErrorRequired({ ...errorRequired, fullName: false });
          }}
          name="fullName"
          label="Full name"
          error={errorRequired.fullName}
          helperText={errorRequired.fullName ? 'This field is required' : null}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          sx={{
            width: '100%',
          }}
          value={editData.address}
          onChange={(e) => {
            setEditData({ ...editData, address: e.target.value });
            setErrorRequired({ ...errorRequired, address: false });
          }}
          name="address"
          label="Address"
          error={errorRequired.address}
          helperText={errorRequired.address ? 'This field is required' : null}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          sx={{
            width: '100%',
          }}
          value={editData.phoneNumber}
          onChange={(e) => {
            setEditData({ ...editData, phoneNumber: e.target.value });
            setErrorRequired({ ...errorRequired, phoneNumber: false });
          }}
          name="Phone number"
          label="Your phone number"
          error={errorRequired.phoneNumber}
          helperText={errorRequired.phoneNumber ? 'This field is required' : null}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          sx={{
            width: '100%',
          }}
          value={editData.email}
          onChange={(e) => {
            setEditData({ ...editData, email: e.target.value });
            setErrorRequired({ ...errorRequired, email: false });
          }}
          name="Email"
          label="Your email address"
          error={errorRequired.email}
          helperText={errorRequired.email ? 'This field is required' : null}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          sx={{
            width: '100%',
          }}
          value={editData.githubLink}
          onChange={(e) => {
            setEditData({ ...editData, githubLink: e.target.value });
            setErrorRequired({ ...errorRequired, githubLink: false });
          }}
          name="Github link"
          label="Your github link"
          error={errorRequired.githubLink}
          helperText={errorRequired.githubLink ? 'This field is required' : null}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          sx={{
            width: '100%',
          }}
          value={editData.telegramLink}
          onChange={(e) => {
            setEditData({ ...editData, telegramLink: e.target.value });
            setErrorRequired({ ...errorRequired, telegramLink: false });
          }}
          name="Telegram name"
          label="Your telegram name"
          error={errorRequired.telegramLink}
          helperText={errorRequired.telegramLink ? 'This field is required' : null}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          sx={{
            width: '100%',
          }}
          name="Facebook link"
          label="Your facebook link"
          value={editData.facebookLink}
          onChange={(e) => {
            setEditData({ ...editData, facebookLink: e.target.value });
            setErrorRequired({ ...errorRequired, facebookLink: false });
          }}
          error={errorRequired.facebookLink}
          helperText={errorRequired.facebookLink ? 'This field is required' : null}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          sx={{
            width: '100%',
          }}
          name="Bio"
          label="Your bio "
          value={editData.bio}
          error={errorRequired.bio}
          onChange={(e) => {
            setEditData({ ...editData, bio: e.target.value });
            setErrorRequired({ ...errorRequired, bio: false });
          }}
          helperText={errorRequired.bio ? 'This field is required' : null}
        />
      </Grid>

      <Grid item xs={6}>
        <Button variant="contained" size="large" color="primary" onClick={handleSave}>
          {' '}
          {isLoading && <CircularProgress sx={{ mr: 2 }} color="inherit" size={18} />}Save change
        </Button>
      </Grid>
    </Grid>
  );
};
export default ProfileView;
