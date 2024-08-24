import { useTheme } from '@emotion/react';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { Box, Button, Collapse, IconButton, Stack, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { useMemo, useState } from 'react';
import Iconify from '../iconify';
import CloseIcon from '../icons/close-icon';
import LinearProgressWithLabel from '../linear-process-with-label';

function CheckListView({ isReadonly, checkLists = [], onChange, onRemoveCheckList }) {
  const [expanded, setExpanded] = useState(true);
  const theme = useTheme();
  const getValueOfProcess = useMemo(() => {
    const valueTotal = checkLists.reduce((total, item) => total + (item.isChecked ? 1 : 0), 0);
    return (valueTotal / checkLists.length) * 100;
  }, [checkLists]);
  return (
    <Stack direction="column" gap={1}>
      <Stack direction="row" gap={1} alignItems="center">
        <Button gap={1} color="primary" onClick={() => setExpanded(!expanded)} variant="text">
          <ChecklistIcon size="small" fontSize="12" sx={{ mr: 1 }} />
          <Typography component="span" sx={{ fontWeight: 'bold', fontSize: 12 }}>
            Checklist of task
          </Typography>
          <Iconify icon={expanded ? 'eva:arrow-up-fill' : 'eva:arrow-down-fill'} />
        </Button>
      </Stack>

      <Collapse in={expanded} orientation="vertical">
        <LinearProgressWithLabel value={getValueOfProcess} />
        <Stack direction="column">
          {checkLists.map((item, index) => (
            <Stack
              gap={2}
              sx={{ position: 'relative' }}
              alignItems="center"
              direction="row"
              key={index}
            >
              <Checkbox
              disabled={isReadonly}
                onClick={() => {
                  onChange(index, !item.isChecked);
                }}
                color="default"
                checked={item.isChecked}
              />
              <Typography component="span" sx={{ fontSize: 12 }}>
                {item.name}
              </Typography>

{
  !isReadonly &&  <IconButton
                sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
                onClick={() => onRemoveCheckList(index)}
              >
                <CloseIcon size={12} color={theme.palette.text.secondary} />
              </IconButton>
}
             

              {item.isChecked && (
                <Box
                  sx={{
                    width: '100%',
                    position: 'absolute',
                    right: 0,
                    left: 0,
                    top: '50%',
                    height: '2px',
                    transform: 'translateY(50%)',
                    background: theme.palette.divider,
                  }}
                />
              )}
            </Stack>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
}

export default CheckListView;
