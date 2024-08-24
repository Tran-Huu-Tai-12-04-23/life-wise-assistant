import { useState } from 'react';

import Popover from '@mui/material/Popover';

import { useTheme } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Chip, IconButton, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Stack } from '@mui/system';
import { useColumnState } from 'src/redux/features/column/columnSlice';
import { useTaskAction } from 'src/redux/features/task/action';
import { useTaskState } from 'src/redux/features/task/taskSlice';
// ----------------------------------------------------------------------

export default function MoveStatusPopover() {
  const [open, setOpen] = useState(null);
  const { filterData } = useColumnState();
  const {onUpdateTaskStatus} = useTaskAction();
  const {currentTask} = useTaskState();

  const theme = useTheme();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMoveStatus = async (statusCode) => {
   await onUpdateTaskStatus({
      id: currentTask.id,
      status: statusCode,
    }).then(() => {
      handleClose();
    })
  }

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
        startIcon={<KeyboardDoubleArrowRightIcon sx={{ color: 'gray' }} size={16} color="gray" />}
      >
        <Typography sx={{ fontSize: 12, color: 'gray', textAlign: 'start', fontWeight: 'bold' }}>
          Move status to
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
            background: theme.palette.background.paper,
            border: 'none',
            borderRadius: 1,
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.08)',
            p: 1,
          },
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{ fontSize: 14, fontWeight: 'bold', mb: 1 }}>
            Status from Doing to
          </Typography>
          <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 2, right: 2 }}>
            <CloseIcon size={12} />
          </IconButton>
        </Stack>
        {filterData?.lstStatus?.map((item, index) => (
          <Button variant="text" key={index} onClick={() => {
            handleMoveStatus(item.code);
          }}>
            <Chip
              size="small"
              label={item.name}
              sx={{
                background: item.background,
                color: item.color,
              }}
            />
          </Button>
        ))}
      </Popover>
    </>
  );
}
