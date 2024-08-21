import { useTheme } from '@emotion/react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton, ListItemButton, Snackbar, Typography } from "@mui/material";
import { useState } from 'react';

function InputCopy({ text , sx}) {
   
    const theme = useTheme()
    const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event,
    reason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

   const handleCopyClick = () => {
        navigator.clipboard.writeText(text);
        handleClick()
    };

    return (
       <>
       <ListItemButton sx={{
            overflow: 'hidden',
            borderRadius: 0.5,
            whiteSpace: 'nowrap', // Add this line
            backgroundColor: theme.palette.background.default,
            ...sx
        }} onClick={handleCopyClick}>
            <Typography variant='h7'>
                {text}
            </Typography>
            <IconButton >
                <ContentCopyIcon />
            </IconButton>
        </ListItemButton>
       
            <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Copied!"
            />
            </>
    );
}

export default InputCopy;