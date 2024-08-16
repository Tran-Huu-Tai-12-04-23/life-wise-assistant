import { Stack, Typography } from "@mui/material";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useState } from "react";
import InputFocusToEdit from "src/components/input/input-focus-to-edit";
import LstMember from "src/components/lst-member";
import RichTextFocusToEdit from "src/components/rich-text/rich-text-focus-to-edit";
import TabCustom from "src/components/tab";
import Activity from "./activity";
import BtnSelectMemberPopover from "./btn-select-member";
import BtnSelectPriority from "./btn-select-priority";
import BtnSelectTagType from "./btn-select-task-type";
import Comments from "./comments";

function FormAddNewTask() {
  const [state, setState] = useState({
    members: [],
    priority: null,
    type: null,
  })
    return  <Stack direction="column" gap={2} pt={2} minWidth={1000}>
      <Stack direction='row' gap={4} alignItems='start' justifyContent="space-between">
        <Stack direction="column" gap={1} sx={{ width: '70%' }}>
          <InputFocusToEdit placeholder="Typing title of task " />
          <Typography component='span' sx={{fontWeight: 'bold', fontSize: 12}}>Description</Typography>
          <RichTextFocusToEdit placeholder="Typing description of task " />
          {
            state.members.length > 0 &&<>
            <Typography component='span' sx={{fontWeight: 'bold', fontSize: 12}}>Members</Typography>
          <LstMember members={state.members}/>
          </>
          }
          
          <TabCustom tabTitles={["Activity", "Comments"]} tabComponents={ [<Activity/>, <Comments/>]} />
        </Stack>
        <Stack direction="column" gap={1} sx={{width: '30%'}} >
          <Typography component='span'>Add to task</Typography>

          <BtnSelectMemberPopover onChange={val => setState(prev => ({...prev, members: val}))}/>
          <BtnSelectTagType onChange={val => setState(prev => ({ ...prev, tags: val }))} />
          <BtnSelectPriority onChange={val => setState(prev => ({ ...prev, priority: val }))} />
          <DateTimePicker label="" placeholder="Due date" />
        </Stack>
      </Stack>

       
      </Stack>
}

export default FormAddNewTask;