import { useState } from 'react';

import Popover from '@mui/material/Popover';

import CloseIcon from '@mui/icons-material/Close';
import { Chip, IconButton, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Stack } from '@mui/system';
import { EffectBtn } from 'src/components/EffectBtn';
import PriorityIcon from 'src/components/icons/priority-icon';
import { taskPriority, taskTypeDefault } from 'src/constants/index';
// ----------------------------------------------------------------------

export default function BtnSelectPriority({ onChange, value }) {
  const [open, setOpen] = useState(null);
  const [selectPriority, setSelectPriority] = useState(value);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
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
          fontSize: 12,
          color: 'gray',
        }}
        onClick={handleOpen}
        color="inherit"
        startIcon={<PriorityIcon size={16} color="gray" />}
      >
        {selectPriority ? (
          <Chip
            label={selectPriority?.name}
            size="small"
            sx={{
              fontSize: 12,
              fontWeight: 600,
              width: '100%',
              background: selectPriority?.background,
              color: selectPriority?.color,
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          />
        ) : (
          'Select priority'
        )}
      </Button>
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: {
              width: 200,
              border: 'none',
              boxShadow: 'none',
            },
          },
        }}
      >
        <Stack
          direction="column"
          gap={1}
          sx={{
            p: 1,
            borderRadius: 1,
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.08)',
          }}
        >
          <Typography sx={{ fontSize: 12, color: 'gray', textAlign: 'start', fontWeight: 'bold' }}>
            Task priority
          </Typography>

          <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 2, right: 2 }}>
            <CloseIcon size={12} />
          </IconButton>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {Object.keys(taskPriority).map((key) => {
              const taskPriorityData = taskPriority[key] || taskTypeDefault;
              return (
                <EffectBtn
                  onClick={() => {
                    setOpen(false);
                    setSelectPriority(taskPriorityData);
                    onChange(taskPriorityData);
                  }}
                  key={key}
                  sx={{ borderRadius: 3, width: 80 }}
                >
                  <Chip
                    size="small"
                    label={taskPriorityData?.name}
                    sx={{
                      fontSize: 12,
                      fontWeight: 600,
                      width: '100%',
                      background: taskPriorityData?.background,
                      color: taskPriorityData?.color,
                      '&:hover': {
                        cursor: 'pointer',
                      },
                    }}
                  />
                </EffectBtn>
              );
            })}
          </Stack>
        </Stack>
      </Popover>
    </>
  );
}
