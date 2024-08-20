import { useRef, useState } from 'react';

import Popover from '@mui/material/Popover';

import ChecklistIcon from '@mui/icons-material/Checklist';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Stack } from '@mui/system';
import Iconify from 'src/components/iconify';
import InputCustom from 'src/components/input';
// ----------------------------------------------------------------------

export default function AddCheckListTaskPopover({ onAddNewCheckList }) {
  const [open, setOpen] = useState(null);
  const inputRef = useRef(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
    setTimeout(() => {
      inputRef.current.focus();
    }, 100);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleAddNewCheckList = () => {
    onAddNewCheckList({
      isChecked: false,
      name: inputRef.current.value,
    });
    inputRef.current.value = '';
  };

  return (
    <>
      <Button
        sx={{
          width: '100%',
          background: 'rgba(0,0,0,0.05)',
          borderRadius: 0.5,
          justifyContent: 'flex-start',
          pl: 2,
          pr: 2,
        }}
        onClick={handleOpen}
        color="inherit"
        startIcon={<ChecklistIcon sx={{ color: 'gray' }} size={16} />}
      >
        <Typography sx={{ fontSize: 12, color: 'gray', textAlign: 'start', fontWeight: 'bold' }}>
          Add checklist task
        </Typography>
      </Button>
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          sx: {
            width: 320,
            border: 'none',
            borderRadius: 1,
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.08)',
            p: 1,
          },
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{ fontSize: 14, fontWeight: 'bold', mb: 1 }}>
            Add checklist task
          </Typography>
          <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 2, right: 2 }}>
            <CloseIcon size={12} />
          </IconButton>
        </Stack>
        <Stack direction="column" alignItems="flex-end" gap={2} />
        <InputCustom
          onKeyPress={(e) => {
            if (e.key === 'Enter' && inputRef.current.value !== '') {
              handleAddNewCheckList();
            }
          }}
          ref={inputRef}
          placeholder="Typing checklist name"
        />
        <Button
          sx={{ mt: 1 }}
          onClick={() => {
            if (inputRef.current.value === '') return;
            handleAddNewCheckList();
          }}
          color="primary"
          variant="contained"
          endIcon={<Iconify icon="eva:plus-fill" />}
        >
          Add
        </Button>
      </Popover>
    </>
  );
}
