import { Button, Fade, Stack, Typography } from '@mui/material';
import { isEqual } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import CheckListView from 'src/components/check-list-view';
import FileLinkView from 'src/components/file-link-view';
import Iconify from 'src/components/iconify';
import InputFocusToEdit from 'src/components/input/input-focus-to-edit';
import LoadingView from 'src/components/loadingView';
import LstMember from 'src/components/lst-member';
import RichTextFocusToEdit from 'src/components/rich-text/rich-text-focus-to-edit';
import TabCustom from 'src/components/tab';
import { useModal } from 'src/contexts/modal-context';
import { useTaskAction } from 'src/redux/features/task/action';
import { useTaskState } from 'src/redux/features/task/taskSlice';
import Activity from '../form-add-new-task/activity';
import AddCheckListTaskPopover from '../form-add-new-task/add-check-list-task-popover';
import AddFileTaskPopover from '../form-add-new-task/add-file-task-popover';
import BtnSelectDateTime from '../form-add-new-task/btn-select-date-time';
import BtnSelectMemberPopover from '../form-add-new-task/btn-select-member';
import BtnSelectPriority from '../form-add-new-task/btn-select-priority';
import BtnSelectTagType from '../form-add-new-task/btn-select-task-type';
import Comments from '../form-add-new-task/comments';
import MoveStatusPopover from '../form-add-new-task/move-status-popover';

function EditTaskView({ id }) {
  const { hideModal } = useModal();
  const { onLoadTaskDetail, onUpdateTask } = useTaskAction();
  const { isLoadingDetail, currentTask } = useTaskState();
  const [state, setState] = useState({
    members: [],
    priority: null,
    type: null,
    expireDate: null,
    description: '',
    subTasks: [],
    taskFile: [],
    comments: [],
    title: '',
  });

  const handleSaveChange =async  () => {
    const body =  {
      id: currentTask.id,
      title: state.title,
      description: state.description,
      lstPersonInCharge: state.members?.map( item => item.id),
      priority: state.priority.code,
      type: state.type.code,
      expireDate: state.expireDate ? new Date(state.expireDate) : null,
    }
      await onUpdateTask(body).then(() => {
        hideModal()
      })
    }

  
  const isCheckChangeData = useMemo(() => 
   {
     const prevState = {
      members: currentTask?.lstPersonInCharge,
      priority: currentTask?.priority,
      type: currentTask?.type,
      expireDate: currentTask?.expireDate,
      description: currentTask?.description,
      title: currentTask?.title,
    }
    const currentState = {
      members: state.members,
       priority: state?.priority,
      type: state?.type,
      expireDate: state?.expireDate,
      description: state?.description,
      title: state?.title,
    }
    return !isEqual(prevState, currentState)
   }
  , [state, currentTask]);



  useEffect(() => {
    onLoadTaskDetail(id);
  }, [id]);

  useEffect(() => {
    if (currentTask) {
      setState({
        members: currentTask?.lstPersonInCharge,
        priority: currentTask?.priority,
        type: currentTask?.type,
        expireDate: currentTask?.expireDate,
        description: currentTask?.description,
        subTasks: currentTask?.subTask || [],
        taskFile: currentTask?.taskFile || [],
        comments: currentTask?.comments || [],
        title: currentTask?.title,
        history: currentTask?.history || [],
      });
    }
  }, [currentTask]);


  return (
    <Stack
      direction="column"
      gap={2}
      pt={2}
      sx={{ width: '100%', minHeight: 'calc(100vh - 40px)', p: 4 }}
    >
      {isLoadingDetail && <Stack direction="column" gap={2} pt={2} width={1000}>
        <LoadingView />
      </Stack>}

      <Fade in={!isLoadingDetail} timeout={500}>
    <Stack direction="row" gap={4} alignItems="start" justifyContent="space-between" sx={{
            display: isLoadingDetail ? 'none' : 'flex',
            
          }}>
        <Stack direction="column" gap={1} sx={{ width: '100%' }}>
          <InputFocusToEdit
          isReadonly={!currentTask?.isOwner}
            value={state?.title}
            onChange={(val) => setState((prev) => ({ ...prev, title: val }))}
            placeholder="Typing title of task "
          />
          <RichTextFocusToEdit
           isReadonly={!currentTask?.isOwner}
            value={state.description}
            onChange={(val) => setState((prev) => ({ ...prev, description: val }))}
            placeholder="Typing description of task "
            label="Description"
          />
          {state.members.length > 0 && (
            <>
              <Typography component="span" sx={{ fontWeight: 'bold', fontSize: 12 }}>
                Members
              </Typography>
              <LstMember members={state.members} />
            </>
          )}
          {state.subTasks.length > 0 && (
            <CheckListView
            isReadonly={!currentTask?.isOwner}
              onChange={(index, val) => {
                state.subTasks[index].isChecked = val;
                setState((prev) => ({ ...prev, subTasks: [...state.subTasks] }));
              }}
              onRemoveCheckList={(index) =>
                setState((prev) => ({
                  ...prev,
                  subTasks: state.subTasks.filter((_, i) => i !== index),
                }))
              }
              checkLists={state.subTasks}
            />
          )}
          {state.taskFile.length > 0 && (
            <FileLinkView
             isReadonly={!currentTask?.isOwner}
              onRemove={(index) =>
                setState((prev) => ({
                  ...prev,
                  taskFile: state.taskFile.filter((_, i) => i !== index),
                }))
              }
              fileLinks={state.taskFile}
            />
          )}
          <TabCustom
            tabTitles={['Activity', 'Comments']}
            tabComponents={[
              <Activity data={state?.history || []} />,
              <Comments
                data={state.comments}
                onChange={(val) =>
                  setState((prev) => ({ ...prev, comments: [...state.comments, val] }))
                }
              />,
            ]}
          />
        </Stack>
        <Stack direction="column" gap={1} sx={{ width: 250, height: '100%'}}>
         <Stack direction="column" gap={1} sx={{width: '100%'}} >
           <Typography component="span" sx={{ fontSize: 12, fontWeight: 'bold' }}>
            Add to task
          </Typography>
          {
            currentTask?.isOwner &&  <BtnSelectMemberPopover
            onChange={(val) => setState((prev) => ({ ...prev, members: val }))}
          />
          }
         
          <BtnSelectTagType
             isReadonly={!currentTask?.isOwner}
            value={currentTask?.type}
            onChange={(val) => setState((prev) => ({ ...prev, type: val }))}
          />
          <BtnSelectPriority
             isReadonly={!currentTask?.isOwner}
            value={currentTask?.priority}
            onChange={(val) => setState((prev) => ({ ...prev, priority: val }))}
          />
          <BtnSelectDateTime
             isReadonly={!currentTask?.isOwner}
            value={currentTask?.expireDate}
            onChange={(val) => setState((prev) => ({ ...prev, expireDate: val }))}
          />
          {
            currentTask?.isOwner &&   <AddCheckListTaskPopover
            onAddNewCheckList={(val) =>
              setState((prev) => ({ ...prev, subTasks: [...state.subTasks, val] }))
            }
          />
          }
        
          <AddFileTaskPopover
          isReadonly={currentTask?.isOwner}
            onAdd={(val) => setState((prev) => ({ ...prev, taskFile: [...prev.taskFile, val] }))}
          />
          <Typography component="span" sx={{ fontSize: 12, fontWeight: 'bold' }}>
            Actions
          </Typography>
          <MoveStatusPopover />
         </Stack>
         {
          currentTask?.isOwner &&<Stack justifyContent="center" sx={{mt: 4}}>
          <Button onClick={handleSaveChange} disabled={!isCheckChangeData} variant='contained' color='primary'>
            <Iconify icon="bx:bxs-save" color="white" sx={{mr: 2}} />
            Save changes
          </Button>
        </Stack>
         }
        </Stack>

     
      </Stack>
      </Fade>
      
    </Stack>
  );
}

export default EditTaskView;
