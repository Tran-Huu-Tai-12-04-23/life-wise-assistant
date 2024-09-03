/* eslint-disable react/no-danger */
import { useTheme } from '@emotion/react';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
  alpha,
} from '@mui/material';
import moment from 'moment';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import ConfirmRemovePopover from 'src/components/confirm-remove-popover';
import Iconify from 'src/components/iconify';
import RichTextFocusToEdit from 'src/components/rich-text/rich-text-focus-to-edit';
import { useAuthState } from 'src/redux/features/auth/authSlice';
import { useTaskAction } from 'src/redux/features/task/action';
import { useTaskState } from 'src/redux/features/task/taskSlice';

function Comments({ isLoading, data, onChange }) {
  const { currentUser } = useAuthState();

  return (
    <Stack direction="column" gap={1}>
      {isLoading && <LinearProgress />}
      {data.map((item, index) => (
        <Comment key={index} comment={item} />
      ))}
      <RichTextFocusToEdit
        onChange={(val) =>
          onChange({
            content: val,
            owner: currentUser,
            createdAt: new Date(),
          })
        }
        placeholder="Typing your comment!"
      />
    </Stack>
  );
}

const Comment = ({ comment }) => {
  const { onRemoveTaskComment, onEditTaskComment } = useTaskAction();
  const { currentTask } = useTaskState();
  const theme = useTheme();
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(comment?.content);

  const handleEditTaskComment = async () => {
    onEditTaskComment({ taskId: currentTask?.id, commentId: comment?.id, content: editValue });
  };
  return (
    <Stack direction="column">
      <Stack
        direction="row"
        gap={1}
        alignItems="center"
        sx={{ width: '100%' }}
        justifyContent="space-between"
      >
        <Stack direction="row" gap={1} alignItems="center">
          <Avatar src={comment?.owner?.avatar} alt={comment?.owner?.username} />
          <Typography variant="h7">{comment?.owner?.username} </Typography>
        </Stack>
        <Stack direction="row" gap={1}>
          <Typography color="gray" component="span" fontSize={12}>
            {moment(comment?.createdAt).format('DD/MM/YYYY HH:mm')}
          </Typography>
          {comment?.isOwner && (
            <ConfirmRemovePopover
              onConfirm={() => {
                onRemoveTaskComment(comment?.id);
              }}
            />
          )}
        </Stack>
      </Stack>
      <Box
        sx={{
          mt: 1,
          ml: 4,
          pl: 1,
          backgroundColor: isEdit ? 'transparent' : alpha(theme.palette.background.default, 0.5),
          borderRadius: 1,
          position: 'relative',
        }}
      >
        {!isEdit && comment?.isOwner && (
          <IconButton
            sx={{
              position: 'absolute',
              right: 0,
              top: '10%',
              zIndex: 10000,
            }}
            onClick={() => setIsEdit(true)}
          >
            <Iconify icon="eva:edit-2-fill" width={20} height={20} />
          </IconButton>
        )}
        {!isEdit && <ReactQuill value={comment?.content} readOnly theme="bubble" />}
        {isEdit && <ReactQuill value={editValue} onChange={(val) => setEditValue(val)} />}
        {isEdit && (
          <Stack direction="row" gap={2} justifyContent="flex-end" sx={{ mt: 1 }}>
            <Button
              onClick={() => {
                setEditValue(comment?.content);
                setIsEdit(false);
              }}
              color="error"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setEditValue(comment?.content);
                handleEditTaskComment();
                setIsEdit(false);
              }}
              color="primary"
              variant="contained"
            >
              Save
            </Button>
          </Stack>
        )}
      </Box>
    </Stack>
  );
};

export default Comments;
