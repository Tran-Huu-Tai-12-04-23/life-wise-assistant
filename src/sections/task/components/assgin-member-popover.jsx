import { useState } from 'react';

import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';

import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { Stack } from '@mui/system';
import Iconify from 'src/components/iconify';
import SelectMember from './select-member';
// ----------------------------------------------------------------------

export default function AssignMemberPopover({isRight}) {
  const [open, setOpen] = useState(null);
  const [state, setState] = useState(null);
  const theme = useTheme();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

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
        anchorOrigin={{ vertical: 'bottom', horizontal:isRight ? 'right': 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: isRight ? 'right' : 'left' }}
        PaperProps={{
          sx: {
            width: 320,
           minHeight:400,
           background: 'transparent',
           border: 'none',
           boxShadow: 'none',
          },
        }}
      >
      <Box sx={{p: 1, borderRadius: 1, background: theme.palette.background.paper,  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.08)' }}>
          <SelectMember onChangeValue={(value) => setState({ ...state, members: value })} />
          <Stack direction='row' gap={2} justifyContent='flex-end' sx={{mt: 1}}>
             <Button onClick={handleClose} color="inherit" variant="outlined" sx={{
                borderColor: 'red',
                color: 'red',
                '&:hover': {
                  borderColor: 'red',
                    color: 'red',
                }
             }} >
              Cancel
            </Button>
            <Button color="inherit" variant="contained" startIcon={<Iconify icon="eva:checkmark-fill" />}>
              Apply
            </Button>
          </Stack>
      </Box>
      </Popover>
    </>
  );
}
