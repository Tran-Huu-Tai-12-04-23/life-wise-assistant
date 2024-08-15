import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import ReactQuill from "react-quill";


function FormAddNewTask() {
    const  [value, setValue] = useState('');
    return  <Stack direction="column" gap={2} pt={2} minWidth={800}>
      <Typography variant="h7" textAlign="center" fontWeight={900}>
        Create new task in  in processing column
      </Typography>
      <Stack direction="column" >
        <Typography variant="body1" fontWeight={700}>
          Task description
        </Typography>
        <ReactQuill theme="snow" value={value} onChange={setValue} />
       </Stack>
      </Stack>
}

export default FormAddNewTask;