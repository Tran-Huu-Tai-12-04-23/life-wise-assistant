import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, IconButton, ListItemButton, Avatar as MuiAvatar } from '@mui/material';
import { useRef } from 'react';
import { UploadBtnWrapper } from 'src/components/upload';
import { useModal } from 'src/contexts/modal-context';

export default function AvatarSetting({ value, onChangeValue }) {
  const btnRef = useRef(null);
  const { openModal, hideModal } = useModal();
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <ListItemButton
        onClick={() =>
          openModal(
            <Box
              onClick={hideModal}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 100,
                backgroundColor: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(2px)',
              }}
            >
              <MuiAvatar alt="Remy Sharp" src={value} sx={{ width: 400, height: 400 }} />
            </Box>
          )
        }
        sx={{ width: 150, height: 150, borderRadius: '50%', p: 0, m: 0 }}
      >
        <MuiAvatar alt="Remy Sharp" src={value} sx={{ width: '100%', height: '100%' }} />
      </ListItemButton>
      <IconButton
        onClick={() => {
          btnRef?.current?.click();
        }}
        color="primary"
        sx={{
          position: 'absolute',
          top: '80%',
          right: '10%',
          backgroundColor: 'rgba(255,255,255,0.5)',
          borderRadius: '50%',
          padding: 1,
        }}
      >
        <UploadBtnWrapper ref={btnRef} onChangeFile={onChangeValue}>
          <CloudUploadIcon />
        </UploadBtnWrapper>
      </IconButton>
    </Box>
  );
}
