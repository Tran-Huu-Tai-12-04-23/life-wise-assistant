/* eslint-disable import/no-cycle */
import { useSortable } from '@dnd-kit/sortable';
import { useTheme } from '@emotion/react';
import {
  alpha,
  Avatar,
  AvatarGroup,
  Button,
  Chip,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import DocumentIcon from 'src/components/icons/document-icon';
import FileIcon from 'src/components/icons/file-icon';
import MessageIcon from 'src/components/icons/message-icon';
import { COLORS } from 'src/constants';
import { useRouter } from 'src/routes/hooks';
import { TASK } from '../wrapper-task-layout';
import AssignMemberPopover from './assgin-member-popover';

function TaskListItem({ data, isRotate }) {
  const router = useRouter();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: data?.id,
    data: {
      type: TASK,
    },
  });

  const theme = useTheme();

  return (
    <Stack
      onClick={() => router.push(`/board/${data?.id}`)}
      direction="row"
      className="ignore-scroll"
      ref={setNodeRef}
      {...attributes}
      sx={{
        transition,
        transform: CSS.Translate?.toString(transform),
        opacity: isDragging ? '0.5' : '1',
        padding: 1,
        borderRadius: 1,
        cursor: 'pointer',
        backgroundColor: theme.palette.background.paper,
        '&:hover': {
          bgcolor: () =>
            isRotate
              ? alpha(theme.palette.background.default)
              : alpha(theme.palette.background.default),
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
        direction="row"
        sx={{ width: '100%' }}
        gap={2}
        alignItems="center"
        justifyContent="flex-start"
      >
        <Typography
          {...listeners}
          sx={{
            userSelect: 'none',
            maxWidth: 100,
            overflow: 'hidden',
          }}
          variant="h7"
          fontSize={12}
          fontWeight={800}
        >
          {data?.title}
        </Typography>
        <Typography variant="h7" fontSize={12}>
          #{data?.code}
        </Typography>
      </Stack>

      <Stack mr={2} direction="row" gap={1} alignItems="center">
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
          label="Development"
          sx={{
            background: 'rgba(236, 72, 153, 0.2)',
            color: '#DB2777',
            minWidth: 80,
            fontSize: 12,
            fontWeight: 800,
          }}
        />
      </Stack>

      <Stack direction="row" gap={2} alignItems="center">
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

          <AssignMemberPopover isRight taskData={data} />
        </Stack>

        <Stack direction="row" gap={2} alignItems="center">
          <Button variant="text" gap={1}>
            <DocumentIcon />
            <Typography variant="h7" color={COLORS.document} fontSize={12} fontWeight={800}>
              {data.totalSubTask}
            </Typography>
          </Button>
          <Button variant="text" gap={1}>
            <FileIcon />
            <Typography variant="h7" color={COLORS.file} fontSize={12} fontWeight={800}>
              {' '}
              {data.totalTaskFile}
            </Typography>
          </Button>
          <Button variant="text" gap={1} sx={{ mr: 2 }}>
            <MessageIcon />
            <Typography variant="h7" color={COLORS.message} fontSize={12} fontWeight={800}>
              {' '}
              {data.totalComment}
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

TaskListItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default TaskListItem;
