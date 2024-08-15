import { Box, Button, Stack, Typography } from "@mui/material";
import { useRef, useState } from "react";
import ReactQuill from "react-quill";
import Iconify from "../iconify";

function RichTextFocusToEdit({minWidth = '100%', placeholder = 'Typing something...', props}) {
      const [disabled, setDisabled] = useState(true);
  const ref = useRef(null);

    
  const handleFocus = () => {
     setDisabled(!disabled)
          setTimeout(() => {
            ref.current.focus()
          }, 100)
  }
    return <Box sx={{minWidth, borderRadius: 1, position: 'relative', minHeight: 40}}>
        {!disabled && <ReactQuill ref={ref} disabled={disabled} {...props} style={{
            background: "rgba(0,0,0,0.03)",
        }} />}
         {
            disabled && <Button onClick={handleFocus} sx={{background: 'rgba(0,0,0,0.03)', width: '100%', bottom: 0, top: 0, position: 'absolute', right: 0, left: 0 }} >
               <Typography sx={{width: '100%',fontSize: 12, color: 'gray', textAlign: 'start'}}>{placeholder}</Typography>
        </Button>
      }
    {
        !disabled && <Stack direction='row' gap={2} justifyContent='flex-end' sx={{mt: 1}}>
             <Button onClick={handleFocus} color="inherit" variant="outlined" sx={{
                borderColor: 'red',
                color: 'red',
                '&:hover': {
                  borderColor: 'red',
                    color: 'red',
                }
             }} >
              Cancel
            </Button>
            <Button color="inherit" variant="contained" startIcon={<Iconify icon="eva:checkmark-fill" />}>
              Save
            </Button>
          </Stack>
    }</Box>
}
export default RichTextFocusToEdit;