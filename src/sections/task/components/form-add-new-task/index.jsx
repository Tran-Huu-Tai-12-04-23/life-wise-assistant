import { Button, Stack, Typography } from "@mui/material";
import InputFocusToEdit from "src/components/input/input-focus-to-edit";
import RichTextFocusToEdit from "src/components/rich-text/rich-text-focus-to-edit";
import TabCustom from "src/components/tab";
import Activity from "./activity";
import Comments from "./comments";

function FormAddNewTask() {
    return  <Stack direction="column" gap={2} pt={2} minWidth={800}>
      <Stack direction='row' gap={1} alignItems='start' justifyContent="space-between">
        <Stack direction="column" gap={1} sx={{ width: '75%' }}>
          

          <InputFocusToEdit placeholder="Typing title of task " />
          <Typography component='span'>Description</Typography>
          <RichTextFocusToEdit placeholder="Typing description of task " />
          <TabCustom tabTitles={["Activity", "Comments"]} tabComponents={ [<Activity/>, <Comments/>]} />

        </Stack>

        <Stack direction="column" gap={1} sx={{width: '25%'}} >
          <Button variant="contained" >Add</Button>
        </Stack>
      </Stack>

       
      </Stack>
}

export default FormAddNewTask;