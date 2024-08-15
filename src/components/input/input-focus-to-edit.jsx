/* eslint-disable no-nested-ternary */
import { Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRef, useState } from 'react';
import Iconify from '../iconify';

export const InputWrapper = styled('div')(
  ({ theme, minWidth , disabled}) => `
  width:${minWidth} ;
  border: 1px solid ${disabled ? 'transparent' : theme.palette.mode === 'dark' ? '#434343' : '#d9d9d9'};
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : 'rgba(0,0,0,0.03)'};
  border-radius: 6px;
  align-items: center;
  position: relative;

  padding: 4px;
  display: flex;
  overflow: auto-scroll;

  &:hover {
    border-color: ${disabled ? 'transparent' :theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
  }

  &.focused {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'};
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

function InputFocusToEdit({ minWidth = '100%', ...props }) {
  const [disabled, setDisabled] = useState(true);
  const ref = useRef(null);
  const handleFocus = () => {
     setDisabled(!disabled)
          setTimeout(() => {
            ref.current.focus()
          }, 100)
  }
  return (
      <InputWrapper  minWidth={minWidth} disabled={disabled}>
      <input ref={ref} {...props} disabled={disabled} onKeyDown={(e) => e.key === 'Enter' && setDisabled(!disabled)} style={{
        background: 'transparent'
      }} />
    {
        disabled && <IconButton onClick={handleFocus}>
        <Iconify icon="eva:edit-2-fill" width={20} height={20} />
      </IconButton>
      }
       {
        !disabled && <IconButton onClick={() => {
          setDisabled(!disabled)
        }}>
        <Iconify icon="eva:checkmark-fill" width={20} height={20} sx={{ color: 'green' }}/>
      </IconButton>
      }
      {
        disabled && <Button onClick={handleFocus} sx={{ width: '100%', bottom: 0, top: 0, position: 'absolute', right: 0, left: 0}} />
      }
    </InputWrapper>
  );
}

export default InputFocusToEdit;
