import { useEffect, useState } from 'react';

import Popover from '@mui/material/Popover';

import CloseIcon from '@mui/icons-material/Close';
import { Chip, IconButton, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Stack } from '@mui/system';
import { EffectBtn } from 'src/components/EffectBtn';
import LabelIcon from 'src/components/icons/label-icon';
import { taskType, taskTypeDefault } from 'src/constants/index';
// ----------------------------------------------------------------------

export default function BtnSelectTagType({ isReadonly = false, onChange, value }) {
  const [open, setOpen] = useState(null);
  const [selectedTag, setSelectedTag] = useState(value);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  useEffect(() => {
    setSelectedTag(value);
  }, [value]);

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
          color: 'gray',
          fontSize: 12,
        }}
        onClick={handleOpen}
        color="inherit"
        startIcon={<LabelIcon color="gray" size={16} />}
      >
        {selectedTag ? (
          <Chip
            label={selectedTag?.name}
            size="small"
            sx={{
              fontSize: 12,
              fontWeight: 600,
              width: '100%',
              background: selectedTag?.background,
              color: selectedTag?.color,
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          />
        ) : (
          'Select task type'
        )}
      </Button>
      {!isReadonly && (
        <Popover
          open={!!open}
          anchorEl={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          slotProps={{
            paper: {
              sx: {
                width: 300,
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
            <Typography
              sx={{ fontSize: 12, color: 'gray', textAlign: 'start', fontWeight: 'bold' }}
            >
              Task type
            </Typography>

            <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 2, right: 2 }}>
              <CloseIcon size={12} />
            </IconButton>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {Object.keys(taskType).map((key) => {
                const taskTypeData = taskType[key] || taskTypeDefault;
                return (
                  <EffectBtn
                    onClick={() => {
                      setOpen(false);
                      setSelectedTag(taskTypeData);
                      onChange(taskTypeData);
                    }}
                    key={key}
                    sx={{ borderRadius: 3, width: 80 }}
                  >
                    <Chip
                      size="small"
                      label={taskTypeData?.name}
                      sx={{
                        fontSize: 12,
                        fontWeight: 600,
                        width: '100%',
                        background: taskTypeData?.background,
                        color: taskTypeData?.color,
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
      )}
    </>
  );
}
