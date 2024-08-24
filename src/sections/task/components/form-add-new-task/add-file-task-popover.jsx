import { useRef, useState } from 'react';

import Popover from '@mui/material/Popover';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Stack } from '@mui/system';
import { toast } from 'react-toastify';
import Iconify from 'src/components/iconify';
import InputCustom from 'src/components/input';
// ----------------------------------------------------------------------

export default function AddFileTaskPopover({ isReadonly, onAdd }) {
  const [open, setOpen] = useState(null);
  const inputRef = useRef(null);
  const inputLinkRef = useRef(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
    setTimeout(() => {
      inputRef.current.focus();
    }, 100);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleAdd = () => {
    const link = inputLinkRef.current.value;
    const name = inputRef.current.value;
    if (link === '' || name === '') return;
    if (!link.includes('https://') && !link.includes('http://')) {
      toast.error('Invalid link');
      return;
    }

    const newFileLink = {
      name,
      fileLink: link,
    };

    onAdd(newFileLink);
    inputRef.current.value = '';
    inputLinkRef.current.value = '';
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
        startIcon={<AttachFileIcon sx={{ color: 'gray' }} size={16} />}
      >
        <Typography sx={{ fontSize: 12, color: 'gray', textAlign: 'start', fontWeight: 'bold' }}>
          Add file
        </Typography>
      </Button>

      {
        !isReadonly && 
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
            Add new file link
          </Typography>
          <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 2, right: 2 }}>
            <CloseIcon size={12} />
          </IconButton>
        </Stack>
        <Stack direction="column" alignItems="flex-end" />
        <InputCustom ref={inputRef} placeholder="Typing checklist name" />
        <Box sx={{ width: '100%', height: 10 }} />
        <InputCustom
          onKeyPress={(e) => {
            if (e.key === 'Enter' && inputRef.current.value !== '') {
              handleAdd();
            }
          }}
          ref={inputLinkRef}
          placeholder="Link and choose file"
        />
        <Stack direction="row" gap={2} justifyContent="flex-end" sx={{ mt: 1 }}>
          <Button
            sx={{ mt: 1 }}
            onClick={() => {
              if (inputRef.current.value === '') return;
              handleAdd();
            }}
            color="primary"
            variant="contained"
            endIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add
          </Button>
        </Stack>
      </Popover>

      }
    
    </>
  );
}
