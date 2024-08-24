/* eslint-disable import/no-cycle */
import { useSortable } from '@dnd-kit/sortable';
import { useTheme } from '@emotion/react';
import {
  alpha,
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import DocumentIcon from 'src/components/icons/document-icon';
import FileIcon from 'src/components/icons/file-icon';
import MessageIcon from 'src/components/icons/message-icon';
import { COLORS } from 'src/constants';
import { useModal } from 'src/contexts/modal-context';
import { TASK } from '../wrapper-task-layout';
import AssignMemberPopover from './assgin-member-popover';
import EditTaskView from './edit-task';

function TaskItem({ data, isRotate }) {
  const { openModal } = useModal();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: data?.id,
    data: {
      type: TASK,
    },
  });

  const theme = useTheme();
  return (
    <Box
      onClick={() => openModal(<EditTaskView id={data.id} />)}
      className="ignore-scroll"
      ref={setNodeRef}
      {...attributes}
      sx={{
        transition,
        opacity: isDragging ? '0.5' : '1',
        background: '700',
        padding: 1,
        borderRadius: 1,
        cursor: 'pointer',
        boxShadow: isRotate ? 24 : 0,
        backgroundColor: theme.palette.background.default,
        // boxShadow: isRotate ? '0px 2px 4px rgba(0, 0, 0, 0.08)' : '0px 2px 4px transparent',
        transform: isRotate ? 'rotate(10deg)' : CSS.Translate?.toString(transform),
        '&:hover': {
          bgcolor: () =>
            isRotate
              ? alpha(theme.palette.background.default, 0.5)
              : alpha(theme.palette.background.default, 0.5),
        },
        '&:hover ': {
          '.icon-drag': {
            display: 'block',
          },
        },
        width: '100%',
      }}
    >
      <Stack
        onClick={(e) => e.stopPropagation()}
        {...listeners}
        direction="row"
        gap={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography
          sx={{
            userSelect: 'none',
          }}
          variant="h7"
          fontSize={12}
          fontWeight={800}
        >
          {data?.title}
        </Typography>
        <Button variant="text" gap={1}>
          <DocumentIcon />
          <Typography variant="h7" color={COLORS.document} fontSize={12} fontWeight={800}>
            {data.totalSubTask}
          </Typography>
        </Button>
      </Stack>

      <Stack direction="row" gap={1} alignItems="center">
        <Chip
          size="small"
          label={data.priorityName}
          sx={{
            background: data.priorityBackground,
            color: data.priorityColor,
            minWidth: 80,
            fontSize: 12,
            fontWeight: 800,
            border: 'none',
          }}
          variant="outlined"
        />
        <Chip
          size="small"
          label={data.typeName}
          sx={{
            background:data.typeBackground,
            color:data.typeColor,
            minWidth: 80,
            fontSize: 12,
            fontWeight: 800,
          }}
        />
      </Stack>

      <Stack
        direction="row"
        justifyContent="space-between"
        gap={1}
        alignItems="center"
        sx={{ marginTop: 1, width: '100%' }}
      >
        <Stack direction="row" alignItems="center" gap={1}>
          {data?.lstMember?.length > 0 && (
            <AvatarGroup max={2}>
              {data?.lstMember?.map((member, index) => (
                <Tooltip key={index} title={member?.username}>
                  <Avatar alt={member?.username} src={member?.avatar} />
                </Tooltip>
              ))}
            </AvatarGroup>
          )}
          <AssignMemberPopover />
        </Stack>

        <Stack
          direction="row"
          gap={1}
          alignItems="center"
          sx={{
            justifyContent: 'flex-end',
          }}
        >
          <IconButton variant="text" gap={1}>
            <FileIcon />
            <Typography variant="h7" color={COLORS.file} fontSize={12} fontWeight={800}>
              {' '}
              {data.totalTaskFile}
            </Typography>
          </IconButton>
          <IconButton variant="text" gap={1}>
            <MessageIcon />
            <Typography variant="h7" color={COLORS.message} fontSize={12} fontWeight={800}>
              {' '}
              {data.totalComment}
            </Typography>
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
}

TaskItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default TaskItem;
