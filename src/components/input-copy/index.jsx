import { useTheme } from '@emotion/react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton, ListItemButton, Snackbar, Stack } from "@mui/material";
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
       <Stack direction="row" gap={1} onClick={handleCopyClick} sx={{width: '100%', 

            backgroundColor: theme.palette.background.default,
     borderRadius: 0.5,
     padding: 1,
     cursor: 'pointer',
       }}>
        <ListItemButton sx={{
            overflow: 'hidden',
       
            whiteSpace: 'nowrap', // Add this line
            ...sx
        }} onClick={handleCopyClick}>
                {text}
        </ListItemButton>
         <IconButton sx={{flex: 0.2}}>
                <ContentCopyIcon />
            </IconButton>
       </Stack>
       
            <Snackbar
            open={open}
            autoHideDuration={300}
            onClose={handleClose}
            message="Copied!"
            />
            </>
    );
}

export default InputCopy;