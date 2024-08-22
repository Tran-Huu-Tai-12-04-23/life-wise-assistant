/* eslint-disable react/no-danger */
import { useTheme } from '@emotion/react';
import { Box, Button, Collapse, IconButton, Stack, Typography, alpha } from '@mui/material';
import { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import { EffectBtn } from '../EffectBtn';
import Iconify from '../iconify';

function RichTextFocusToEdit({
  value,
  onChange,
  minWidth = '100%',
  placeholder = 'Typing something...',
  label = '',
  props,
}) {
  const [disabled, setDisabled] = useState(true);
  const [currentValue, setCurrentValue] = useState(value);
  const [expand, setExpand] = useState(true);
  const ref = useRef(null);
  const theme = useTheme();

  const handleFocus = () => {
    setCurrentValue(value);
    setExpand(true);
    setDisabled(!disabled);
    setTimeout(() => {
      ref.current.focus();
    }, 100);
  };
  return (
    <>
      {label && (
        <Stack alignItems="flex-start" direction="column" gap={2}>
          <Button variant="text" color="inherit" onClick={() => disabled && setExpand(!expand)}>
            <Typography component="span" sx={{ fontWeight: 'bold', fontSize: 12 }}>
              Description
            </Typography>
            <Iconify icon={expand ? 'eva:arrow-up-fill' : 'eva:arrow-down-fill'} />
          </Button>
        </Stack>
      )}

      <Collapse in={expand} orientation="vertical">
        <Box sx={{ minWidth, borderRadius: 1, position: 'relative', }}>
          {!disabled && (
            <ReactQuill
              value={currentValue}
              onChange={(val) => setCurrentValue(val)}
              ref={ref}
              disabled={disabled}
              {...props}
              style={{
                background: alpha(theme.palette.background.default, 0.5),
              }}
            />
          )}
          {disabled &&  !value && (
            <Box
              onClick={handleFocus}
              sx={{
                width: '100%',
                bottom: 0,
                top: 0,
                position: 'absolute',
                right: 0,
                left: 0,
                color: theme.palette.text.primary,
                fontSize: 12,
                fontWeight: 'normal',
                textAlign: 'start',
                justifyContent: 'flex-start',
                borderRadius: '5px',
                border: `1px solid transparent`,
                display: 'flex',
                alignItems: 'center',
                pl: 1,
                '&:hover': { borderColor: `${theme.palette.primary.main}` },
              }}
            >
              <Typography sx={{ width: '100%', fontSize: 12, color: 'gray', textAlign: 'start' }}>
                {placeholder}
              </Typography>
              <IconButton
                onClick={() => {
                  setDisabled(!disabled);
                }}
              >
                <Iconify icon="eva:edit-2-fill" width={20} height={20} />
              </IconButton>
            </Box>
          )}
          {disabled  && (
            <EffectBtn onClick={handleFocus} sx={{ width: '100%' }}>
              <ReactQuill
                style={{
                  background: alpha(theme.palette.background.default, 0.5),
                  borderRadius: 5,
                  width: '100%',
                }}
                value={value}
                readOnly
                theme="bubble"
              />
            </EffectBtn>
          )}
          {!disabled && (
            <Stack direction="row" gap={2} justifyContent="flex-end" sx={{ mt: 1 }}>
              <Button
                onClick={() => {
                  handleFocus();
                  setCurrentValue('');
                }}
                color="error"
                variant="outlined"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onChange(currentValue);
                  setDisabled(true);
                }}
                color="primary"
                variant="contained"
                startIcon={<Iconify icon="eva:checkmark-fill" />}
              >
                Save
              </Button>
            </Stack>
          )}
        </Box>
      </Collapse>
    </>
  );
}
export default RichTextFocusToEdit;
