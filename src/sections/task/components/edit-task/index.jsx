import { Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CheckListView from 'src/components/check-list-view';
import FileLinkView from 'src/components/file-link-view';
import InputFocusToEdit from 'src/components/input/input-focus-to-edit';
import LoadingView from 'src/components/loadingView';
import LstMember from 'src/components/lst-member';
import RichTextFocusToEdit from 'src/components/rich-text/rich-text-focus-to-edit';
import TabCustom from 'src/components/tab';
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
  const { onLoadTaskDetail } = useTaskAction();
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

  if (isLoadingDetail) {
    return (
      <Stack direction="column" gap={2} pt={2} width={1000}>
        <LoadingView />
      </Stack>
    );
  }

  return (
    <Stack
      direction="column"
      gap={2}
      pt={2}
      sx={{ width: '100%', minHeight: 'calc(100vh - 40px)', p: 4 }}
    >
      <Stack direction="row" gap={4} alignItems="start" justifyContent="space-between">
        <Stack direction="column" gap={1} sx={{ width: '100%' }}>
          <InputFocusToEdit
            value={state?.title}
            onChange={(val) => setState((prev) => ({ ...prev, title: val }))}
            placeholder="Typing title of task "
          />
          <RichTextFocusToEdit
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
        <Stack direction="column" gap={1} sx={{ width: 250 }}>
          <Typography component="span" sx={{ fontSize: 12, fontWeight: 'bold' }}>
            Add to task
          </Typography>
          <BtnSelectMemberPopover
            onChange={(val) => setState((prev) => ({ ...prev, members: val }))}
          />
          <BtnSelectTagType
            value={currentTask?.type}
            onChange={(val) => setState((prev) => ({ ...prev, type: val }))}
          />
          <BtnSelectPriority
            value={currentTask?.priority}
            onChange={(val) => setState((prev) => ({ ...prev, priority: val }))}
          />
          <BtnSelectDateTime
            value={currentTask?.expireDate}
            onChange={(val) => setState((prev) => ({ ...prev, expireDate: val }))}
          />
          <AddCheckListTaskPopover
            onAddNewCheckList={(val) =>
              setState((prev) => ({ ...prev, subTasks: [...state.subTasks, val] }))
            }
          />
          <AddFileTaskPopover
            onAdd={(val) => setState((prev) => ({ ...prev, taskFile: [...prev.taskFile, val] }))}
          />
          <Typography component="span" sx={{ fontSize: 12, fontWeight: 'bold' }}>
            Actions
          </Typography>
          <MoveStatusPopover />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default EditTaskView;
