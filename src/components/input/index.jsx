import { styled } from '@mui/material/styles';
import React from 'react';

export const InputWrapper = styled('div')(
  ({ theme, minWidth }) => `
  width:${minWidth} ;
  border: 1px solid  ${theme.palette.divider};
  background-color: ${theme.palette.background.paper};
  color: ${theme.palette.text.primary};
  border-radius: 6px;
  padding: 4px;
  display: flex;
  overflow: auto-scroll;

  &:hover {
    border-color: ${theme.palette.primary.dark};
  }

  &.focused {
    border-color: ${theme.palette.primary.dark};
  }

  & input {
    background-color: ${theme.palette.background.paper};
  color: ${theme.palette.text.primary};
    box-sizing: border-box;
    padding: 4px
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

const InputCustom = React.forwardRef(({ minWidth = '100%', ...props }, ref) => (
  <InputWrapper minWidth={minWidth}>
    <input ref={ref} {...props} />
  </InputWrapper>
));

export default InputCustom;
