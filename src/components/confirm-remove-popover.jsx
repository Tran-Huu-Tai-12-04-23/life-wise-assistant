import { useState } from 'react';

import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';

import CloseIcon from '@mui/icons-material/Close';
import { Button, Stack, Typography } from '@mui/material';
// ----------------------------------------------------------------------

export default function ConfirmRemovePopover({ onConfirm}) {
  const [open, setOpen] = useState(null);
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton color="primary" onClick={handleOpen} sx={{ width: 50, height: 50 }}>
        <CloseIcon />
      </IconButton>
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            width: 320,
            p: 2,
          },
        }}
      >
        <Typography variant='h7' sx={{ fontSize: 14, fontWeight: 'bold' }}>Are you sure you want to delete this record?</Typography>

        <Stack direction='row' justifyContent='center' spacing={2} sx={{
            width: '100%',
            mt:2
        }}>
          <Button
            onClick={() => {
                   
                    handleClose()
                  }}
                  color="error"
                  variant="contained"
                >
                  Cancel
                </Button>
                <Button
                  onClick={ () => {
                    onConfirm()
                  }}
                  color="primary"
                  variant="contained"
                >
                  Confirm
                </Button>
          </Stack>
       
      </Popover>
    </>
  );
}
