/* eslint-disable import/no-cycle */
import { useTheme } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useModal } from 'src/contexts/modal-context';

const style = {
  position: 'relative',
  // top: '50%',
  // left: '50%',
  // transform: 'translate(-50%, -50%)',
  // minWidth: 400,
  borderRadius: 1,
  height: 'max-content',
  width: '100%',
  p: 2,
};

export default function ModalCustom({ children, isOpen, onClose }) {
  const { hideModal } = useModal();
  const theme = useTheme();
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      onClick={(event) => event.stopPropagation()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        overflowY: 'scroll',
        overflowX: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        // pt: 20,
        // pb: 20,
        // backdropFilter: 'blur(6px)',
      }}
    >
      <>
        <Box
          sx={{
            ...style,
            background: theme.palette.background.paper,
            // backdropFilter: 'blur(2px)',
            // width: 'max-content',
          }}
        >
          <IconButton onClick={hideModal} sx={{ position: 'absolute', top: 2, right: 2 }}>
            <CloseIcon />
          </IconButton>
          {children}
        </Box>
        <Box sx={{ height: 400 }} />
      </>
    </Modal>
  );
}
