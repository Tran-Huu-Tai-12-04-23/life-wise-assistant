import { Button, CircularProgress, Fade, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import CheckListView from 'src/components/check-list-view';
import FileLinkView from 'src/components/file-link-view';
import Iconify from 'src/components/iconify';
import InputFocusToEdit from 'src/components/input/input-focus-to-edit';
import LstMember from 'src/components/lst-member';
import RichTextFocusToEdit from 'src/components/rich-text/rich-text-focus-to-edit';
import TabCustom from 'src/components/tab';
import { useModal } from 'src/contexts/modal-context';
import { useColumnAction } from 'src/redux/features/column/action';
import { useColumnState } from 'src/redux/features/column/columnSlice';
import Activity from './activity';
import AddCheckListTaskPopover from './add-check-list-task-popover';
import AddFileTaskPopover from './add-file-task-popover';
import BtnSelectDateTime from './btn-select-date-time';
import BtnSelectMemberPopover from './btn-select-member';
import BtnSelectPriority from './btn-select-priority';
import BtnSelectTagType from './btn-select-task-type';
import Comments from './comments';

function FormAddNewTask() {
  const { onCreateTask } = useColumnAction();
  const { hideModal } = useModal();
  const { isLoadingCreateNewTask, currentColumn } = useColumnState();
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

  const handleAddNewTask = async () => {
    // Verify if the required data is present
    if (
      !state.title ||
      !state.description ||
      !state.members.length ||
      !state.priority ||
      !state.type ||
      !state.expireDate
    ) {
      toast.error('Please fill in the required fields');
      return;
    }
    const body = {
      lstPersonInCharge: state.members.map((item) => item.id),
      priority: state.priority?.code,
      type: state.type?.code,
      title: state.title,
      expireDate: state.expireDate,
      description: state.description,
      subTasks: state.subTasks.map((item) => ({
        name: item.name,
        isChecked: item.isChecked,
      })),
      taskFile: state.taskFile.map((item) => ({
        name: item.name,
        fileLink: item.fileLink || ' ',
      })),
      comments: state.comments.map((item) => ({
        content: item.content,
        ownerId: item.owner.id,
      })),
      columnId: currentColumn.id,
    };

    await onCreateTask(body).then(() => {
      hideModal();
    });
  };
  return (
    <Fade in timeout={500}>
      <Stack
        direction="column"
        gap={2}
        pt={2}
        sx={{ width: '100%', minHeight: 'calc(100vh - 40px)', p: 4 }}
      >
        <Stack direction="row" gap={4} alignItems="start" justifyContent="space-between">
          <Stack direction="column" gap={1} sx={{ width: '100%' }}>
            <InputFocusToEdit
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
            <BtnSelectTagType  onChange={(val) => setState((prev) => ({ ...prev, type: val }))} />
            <BtnSelectPriority
              onChange={(val) => setState((prev) => ({ ...prev, priority: val }))}
            />
            <BtnSelectDateTime
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
          </Stack>
        </Stack>
        <Stack direction="row" gap={1} sx={{ justifyContent: 'flex-end', mt: 'auto' }}>
          <Button
            onClick={handleAddNewTask}
            endIcon={<Iconify icon="eva:plus-fill" />}
            variant="contained"
            color="primary"
          >
            {isLoadingCreateNewTask && <CircularProgress />}
            Add task
          </Button>
        </Stack>
      </Stack>
    </Fade>
  );
}

export default FormAddNewTask;
