/* eslint-disable no-nested-ternary */
import { useTheme } from '@emotion/react';
import { Box, IconButton } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';
import Iconify from '../iconify';

export const InputWrapper = styled('div')(
  ({ theme, minWidth, disabled }) => `
  width:${minWidth} ;
  border: 1px solid ${disabled ? 'transparent' : theme.palette.background.paper};
  background-color: ${theme.palette.background.paper};
  border-radius: 6px;
  align-items: center;
  position: relative;

  padding: 4px;
  display: flex;
  overflow: auto-scroll;

  &:hover {
    border-color: ${disabled ? 'transparent' : theme.palette.primary.main};
  }

  &.focused {
    border-color: ${theme.palette.primary.main};
    box-shadow: 0 0 0 2px ${alpha(theme.palette.background.default, 0.14)};
  }

  & input {
    color: ${theme.palette.text.primary};
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
      height: 30px;

  }
`
);

function InputFocusToEdit({ isReadonly = false, minWidth = '100%', value, onChange, ...props }) {
  const [disabled, setDisabled] = useState(true);
  const theme = useTheme();
  const ref = useRef(null);
  const handleFocus = () => {
    setDisabled(!disabled);
    setTimeout(() => {
      ref.current.focus();
    }, 100);
  };

  useEffect(() => {
    setTimeout(() => {
      ref.current.value = value || '';
    }, 100);
  }, [value]);
  return (
    <InputWrapper
      minWidth={minWidth}
      disabled={disabled}
      style={{
        background: alpha(theme.palette.background.default, 0.5),
      }}
    >
      <input
        ref={ref}
        {...props}
        disabled={disabled || isReadonly}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setDisabled(!disabled);
            onChange(ref.current.value);
          }
        }}
        style={{ background: 'transparent' }}
      />
      {disabled && (
        <IconButton onClick={handleFocus}>
          <Iconify icon="eva:edit-2-fill" width={20} height={20} />
        </IconButton>
      )}
      {!disabled && (
        <IconButton
          onClick={() => {
            setDisabled(!disabled);
            onChange(ref.current.value);
          }}
        >
          <Iconify icon="eva:checkmark-fill" width={20} height={20} sx={{ color: 'green' }} />
        </IconButton>
      )}
      {disabled && (
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
            '&:hover': { border: `1px solid ${theme.palette.primary.main}` },
          }}
        />
      )}
    </InputWrapper>
  );
}

export default InputFocusToEdit;
