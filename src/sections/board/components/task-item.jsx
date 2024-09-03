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
import { useMemo } from 'react';
import DocumentIcon from 'src/components/icons/document-icon';
import FileIcon from 'src/components/icons/file-icon';
import MessageIcon from 'src/components/icons/message-icon';
import { COLORS } from 'src/constants';
import { Helper } from 'src/helper';
import { useRouter } from 'src/routes/hooks';
import { TASK } from '../wrapper-task-layout';
import AssignMemberPopover from './assgin-member-popover';

function TaskItem({ data, isRotate }) {
  const router = useRouter();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: data?.id,
    data: {
      type: TASK,
    },
  });

  const theme = useTheme();

  const numberDayLeft = useMemo(() => {
    const timeLeft = Helper.calculateTimeLeft(data?.expireDate);
    const stringArr = [];
    if (timeLeft.days > 0) {
      stringArr.push(`${timeLeft.days} days`);
    }
    if (timeLeft.hours > 0) {
      stringArr.push(`${timeLeft.hours} hours`);
    }
    if (timeLeft.minutes > 0) {
      stringArr.push(`${timeLeft.minutes} minutes`);
    }
    const string = `${stringArr.join(', ')}`;
    const color = timeLeft.days > 0 ? 'green' : 'red';

    if (timeLeft.days < 0 && timeLeft.hours <= 0 && timeLeft.minutes <= 0) {
      return {
        string: 'Expired',
        color: 'red',
      };
    }

    return { string, color };
  }, [data]);

  return (
    <Box
      onClick={() => router.push(`/board/${data?.id}`)}
      className="ignore-scroll"
      ref={setNodeRef}
      {...attributes}
      sx={{
        transition,
        opacity: isDragging ? '0.5' : '1',
        border: '1px solid transparent',
        borderColor: isDragging ? alpha(theme.palette.primary.main) : 'transparent',
        background: '700',
        padding: 1,
        borderRadius: 1,
        cursor: 'pointer',
        backgroundColor: theme.palette.background.paper,
        transform: CSS.Translate?.toString(transform),
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
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          sx={{
            userSelect: 'none',
          }}
          variant="h7"
          fontSize={16}
          fontWeight={800}
        >
          {data?.title}
        </Typography>
      </Stack>
      <Stack
        onClick={(e) => e.stopPropagation()}
        {...listeners}
        direction="row"
        gap={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h7" fontSize={12}>
          #{data?.code}
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
            background: data.typeBackground,
            color: data.typeColor,
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
          <AssignMemberPopover taskData={data} />
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
      <Typography
        variant="h7"
        fontStyle={8}
        fontWeight="bold"
        sx={{
          color: numberDayLeft.color,
          fontSize: 12,
        }}
      >
        {numberDayLeft.string}
      </Typography>
    </Box>
  );
}

TaskItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default TaskItem;
