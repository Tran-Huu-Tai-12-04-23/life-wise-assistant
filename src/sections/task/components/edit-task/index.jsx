import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Chip, Fade, IconButton, LinearProgress, Stack, Typography } from '@mui/material';
import { isEqual } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import CheckListView from 'src/components/check-list-view';
import FileLinkView from 'src/components/file-link-view';
import Iconify from 'src/components/iconify';
import InputFocusToEdit from 'src/components/input/input-focus-to-edit';
import LstMember from 'src/components/lst-member';
import RichTextFocusToEdit from 'src/components/rich-text/rich-text-focus-to-edit';
import TabCustom from 'src/components/tab';
import { useModal } from 'src/contexts/modal-context';
import NotFoundPage from 'src/pages/public/page-not-found';
import { useTaskAction } from 'src/redux/features/task/action';
import { useTaskState } from 'src/redux/features/task/taskSlice';
import { useRouter } from 'src/routes/hooks';
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
  const { hideModal } = useModal()
  const router = useRouter()
  const { onLoadTaskDetail, onUpdateTask, onRemoveTaskFile, onRemoveSubTask,onToggleSubTask ,onAddSubTask, onAddTaskComment, onAddTaskFile} = useTaskAction();
  const {
    isLoadingDetail,
    currentTask,
    history,
    comment,
    subTask,
    taskFile,
    taskFilePage,
    isHasNextTaskFilePage,
      isLoadingTaskComment,
  isLoadingTaskHistory,
  isLoadingSubTask,
  isLoadingTaskFile,
  } = useTaskState();
  const [state, setState] = useState({
    members: [],
    priority: null,
    type: null,
    expireDate: null,
    description: '',
    title: '',
  });

  const handleSaveChange = async () => {
    const body = {
      id: currentTask.id,
      title: state.title,
      description: state.description,
      members: state.members?.map((item) => item.id),
      priority: state.priority.code,
      type: state.type.code,
      expireDate: state.expireDate ? new Date(state.expireDate) : null,
    };
    await onUpdateTask(body).then(() => {
         onLoadTaskDetail(id);
    });
    setState((prev) => ({
      ...prev,
      taskFilePage: 0,
      isHasNextTaskFilePage: false,
    }));
  };

  const isCheckChangeData = useMemo(() => {
    const prevState = {
      members: currentTask?.lstPersonInCharge,
      priority: currentTask?.priority,
      type: currentTask?.type,
      expireDate: currentTask?.expireDate,
      description: currentTask?.description,
      title: currentTask?.title,
    };
    const currentState = {
      members: state.members,
      priority: state?.priority,
      type: state?.type,
      expireDate: state?.expireDate,
      description: state?.description,
      title: state?.title,
    };
    return !isEqual(prevState, currentState);
  }, [state, currentTask]);

  useEffect(() => {
    if(id) {
       onLoadTaskDetail(id)
    }
  }, [id]);

  useEffect(() => {
    if (currentTask) {
      setState({
        members: currentTask?.lstPersonInCharge,
        priority: currentTask?.priority,
        type: currentTask?.type,
        expireDate: currentTask?.expireDate,
        description: currentTask?.description,
        title: currentTask?.title,
        taskFilePage: 0,
        isHasNextTaskFilePage: false,
      });
    }
  }, [currentTask]);

  if(id && !currentTask && !isLoadingDetail) return <NotFoundPage title='Task not found! Try again!' onBack={ ()=> {
   hideModal()
   router.replace('/task')
  }}/>
  if(!currentTask && !id && !isLoadingDetail) return null
  return (
    <>
     {isLoadingDetail && (
         <Box sx={{
          position:'fixed',top: 0, right: 0,
          left:0,
          zIndex: 1000000
         }}>
           <LinearProgress />
         </Box>
      )}
       <IconButton onClick={() => {
           hideModal()
           router.replace('/task')
       }} sx={{ position: 'absolute', top: 2, right: 2 }}>
            <CloseIcon />
          </IconButton>
    <Stack
      direction="column"
      gap={2}
      pt={2}
      sx={{ width: '100%', minHeight: 'calc(100vh - 40px)', p: 4 }}
    >
      <Fade in={!isLoadingDetail} timeout={500}>
        <Stack
          direction="row"
          gap={4}
          alignItems="start"
          justifyContent="space-between"
        >
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
            {subTask?.length > 0 && (
              <CheckListView
              isLoading={isLoadingSubTask}
                isConfirmBeforeRemove
                isReadonly={!currentTask?.isOwner}
                onChange={(index) => {
                  const subTaskData = subTask[index];
                  if(!subTaskData) return
                  onToggleSubTask(subTaskData.id)
                }}
                onRemoveCheckList={(index) =>
                {
                  const subTaskData = subTask[index];
                  if(!subTaskData) return
                  onRemoveSubTask(subTaskData.id)
                }
                
                }
                checkLists={subTask}
              />
            )}
            {taskFile?.length > 0 && (
              <FileLinkView
                  isLoading={isLoadingTaskFile}
              isConfirmBeforeRemove
                isReadonly={!currentTask?.isOwner}
                onRemove={(index) =>
                 {
                  const taskFileIndex = taskFile[index]
                  if(!taskFileIndex) return
                  onRemoveTaskFile(taskFileIndex.id)
                 }
                
                }
                fileLinks={taskFile}
                taskFilePage={taskFilePage}
                isHasNextTaskFilePage={isHasNextTaskFilePage}
              />
            )}
            <TabCustom
              tabTitles={[ 'Comments', 'Activity']}
              tabComponents={[
                <Comments
                  isLoading={isLoadingTaskComment}
                  data={comment}
                  onChange={(val) => {
                    onAddTaskComment({taskId: currentTask?.id,...val});
                  }
                  }
                />,
                 <Activity 
                   isLoading={isLoadingTaskHistory}
                 data={history || []} />,
              ]}
            />
          </Stack>
          <Stack direction="column" gap={1} sx={{ width: 250, height: '100%' }}>
            <Stack direction="column" gap={1} sx={{ width: '100%' }}>
             
             <Stack direction="row" gap={1} justifyContent="space-between">
               <Typography component="span" sx={{ fontSize: 12, fontWeight: 'bold' }}>
                Add to task
              </Typography>
                <Chip
              size="small"
              label={currentTask?.statusName}
              sx={{
                width: 'fit-content',
                background: currentTask?.statusBackground,
                color: currentTask?.statusColor,
              }}
            />
             </Stack>
              {currentTask?.isOwner && (
                <BtnSelectMemberPopover
                value={state.members}
                  onChange={(val) => setState((prev) => ({ ...prev, members: val }))}
                />
              )}

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
              {currentTask?.isOwner && (
                <AddCheckListTaskPopover
                  onAddNewCheckList={(val) =>
                  {
                    onAddSubTask({
                      taskId: currentTask.id,
                      data: {
                        ...val,
                      }
                    })
                  }
                  }
                />
              )}

{
  currentTask?.isOwner &&   <AddFileTaskPopover
                onAdd={(val) =>
                {
                  onAddTaskFile({
                    taskId: currentTask.id,
                    data: {
                      ...val,
                    }
                  })
                }
                }
              />
}
            
              <Typography component="span" sx={{ fontSize: 12, fontWeight: 'bold' }}>
                Actions
              </Typography>
              <MoveStatusPopover  />
            </Stack>
            {currentTask?.isOwner && (
              <Stack justifyContent="center" sx={{ mt: 4 }}>
                <Button
                  onClick={handleSaveChange}
                  disabled={!isCheckChangeData}
                  variant="contained"
                  color="primary"
                >
                  <Iconify icon="bx:bxs-save" color="white" sx={{ mr: 2 }} />
                  Save changes
                </Button>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Fade>
    </Stack></>
  );
}

export default EditTaskView;
