import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import { alpha, Box, Typography } from '@mui/material';
import { autocompleteClasses } from '@mui/material/Autocomplete';

const Root = styled('div')(
  ({ theme }) => `
  color: ${theme.palette.text.primary};
  font-size: 14px;
  width: 100%;
`
);

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <Box {...other}>
      <Typography variant="h7">{label}</Typography>
      <CloseIcon onClick={onDelete} color={props?.color} />
    </Box>
  );
}

const StyledTag = styled(Tag)(
  ({ theme, backgroundColor, color }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${backgroundColor};
  border: 1px solid ${color};
  border-radius: 100px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.primary.main};
    background-color: ${alpha(theme.palette.primary.dark, 0.5)};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color:${color}
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
    color:${color}
  }
`
);
const Listbox = styled('ul')(
  ({ theme }) => `
  width: 370px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.background.paper};
  overflow: auto;
  max-height: 250px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${alpha(theme.palette.primary.main, 0.2)};
    font-weight: 600;
    & svg {
      color:${theme.palette.primary.main}
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${alpha(theme.palette.primary.main, 0.2)};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`
);

export { Listbox, Root, StyledTag };
