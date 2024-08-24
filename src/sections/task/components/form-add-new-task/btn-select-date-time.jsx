import { useState } from 'react';

import Popover from '@mui/material/Popover';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Stack } from '@mui/system';
import { DateCalendar, DigitalClock } from '@mui/x-date-pickers';
import moment from 'moment';
import { toast } from 'react-toastify';
import Iconify from 'src/components/iconify';
import { getDateTime } from 'src/helper';
// ----------------------------------------------------------------------

export default function BtnSelectDateTime({ isReadOnly = false, onChange, value }) {
  const [open, setOpen] = useState(null);
  const [state, setState] = useState({
    value: value ? new Date(value) : null,
    date: null,
    time: null,
  });

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
        }}
        onClick={handleOpen}
        color="inherit"
        startIcon={<CalendarMonthIcon size={16} color="gray" sx={{ color: 'gray' }} />}
      >
        <Typography sx={{ fontSize: 12, color: 'gray', textAlign: 'start', fontWeight: 'bold' }}>
          {state.value ? moment(state.value).format('DD/MM/YYYY hh:mm A') : 'Select date time'}
        </Typography>
      </Button>

      {!isReadOnly && (
        <Popover
          open={!!open}
          anchorEl={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          slotProps={{
            paper: {
              sx: { border: 'none', boxShadow: 'none' },
            },
          }}
        >
          <Stack
            direction="row"
            gap={1}
            sx={{
              p: 1,
              alignItems: 'center',
              borderRadius: 1,
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.08)',
            }}
          >
            <Box sx={{ minWidth: 100, mt: 2 }}>
              <DateCalendar
                onChange={(val) => {
                  if (new Date(val).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) {
                    toast.error('Please select a future date');
                    return;
                  }
                  setState({ ...state, date: val });
                }}
                value={state.date}
              />
            </Box>
            <Box sx={{ minWidth: 100 }}>
              <DigitalClock
                value={state.time}
                onChange={(val) => setState({ ...state, time: val })}
                sx={{
                  height: '100%',
                  '&::webkit-scrollbar': {
                    width: 0,
                  },
                }}
              />
            </Box>
          </Stack>

          <Stack direction="row" gap={2} justifyContent="flex-end" sx={{ mt: 1, p: 1 }}>
            <Button onClick={handleClose} variant="outlined" color="error">
              Cancel
            </Button>
            <Button
              onClick={() => {
                const dateTime = getDateTime(state.date, state.time);
                setOpen(false);
                onChange(dateTime);
                setState({ ...state, value: dateTime });
              }}
              color="primary"
              variant="contained"
              startIcon={<Iconify icon="eva:checkmark-fill" />}
            >
              Confirm
            </Button>
          </Stack>
        </Popover>
      )}
    </>
  );
}
