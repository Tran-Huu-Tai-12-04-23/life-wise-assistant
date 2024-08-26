/* eslint-disable import/no-cycle */
import { useTheme } from '@emotion/react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

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
         
          {children}
        </Box>
        <Box sx={{ height: 400 }} />
      </>
    </Modal>
  );
}
