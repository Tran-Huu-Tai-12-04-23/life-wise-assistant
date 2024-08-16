import { useState } from 'react';

import Popover from '@mui/material/Popover';

import { useTheme } from '@emotion/react';
import { Chip, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Stack } from '@mui/system';
import { EffectBtn } from 'src/components/EffectBtn';
import PriorityIcon from 'src/components/icons/priority-icon';
import { taskPriority, taskTypeDefault } from 'src/constants/index';
// ----------------------------------------------------------------------

export default function BtnSelectPriority({  onChange}) {
  const [open, setOpen] = useState(null);
  const [selectPriority, setSelectPriority] = useState(null);
  const theme = useTheme();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <Button
        sx={{ width: '100%', background: 'rgba(0,0,0,0.05)', borderRadius: 0.5, justifyContent: 'flex-start', pl: 2, pr: 2 }}
        onClick={handleOpen}
        color="inherit"
        startIcon={<PriorityIcon size={22} color="gray" />}
      >
        <Typography sx={{ fontSize: 16, color: 'gray', textAlign: 'start', fontWeight: 'bold' }}>{selectPriority ? <Chip
                  label={selectPriority?.name}
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
                />: "Select priority"}</Typography>
      </Button>
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{ paper: { sx: { width: 200, minHeight: 400, background: 'transparent', border: 'none', boxShadow: 'none' } } }}
      >
        <Stack direction="column" gap={1} sx={{ p: 1, borderRadius: 1, background: theme.palette.background.paper, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.08)' }}>
          <Typography sx={{ fontSize: 12, color: 'gray', textAlign: 'start', fontWeight: 'bold' }}>Task priority</Typography>
          <Stack direction="row" flexWrap='wrap' gap={1}>
            {Object.keys(taskPriority).map((key) => {
              const taskPriorityData = taskPriority[key] || taskTypeDefault;
              return (
                <EffectBtn onClick={() => {
                  setOpen(false);
                  setSelectPriority(taskPriorityData)
                  onChange(taskPriorityData)
                }} key={key} sx={{borderRadius: 3,width: 80}}>
                  <Chip
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
