/* eslint-disable react/no-danger */
import { useTheme } from '@emotion/react';
import { Avatar, Box, Stack, Typography, alpha } from '@mui/material';
import moment from 'moment';
import ReactQuill from 'react-quill';
import RichTextFocusToEdit from 'src/components/rich-text/rich-text-focus-to-edit';
import { useAuthState } from 'src/redux/features/auth/authSlice';

function Comments({ data, onChange }) {
  const {currentUser} = useAuthState()
  return (
    <Stack direction="column" gap={1}>
      {data.map((item, index) => (
        <Comment key={index} comment={item}/>
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

const Comment = ({comment}) => {
  const theme = useTheme()
  return (
    <Stack direction="column">
          <Stack direction="row" gap={1} alignItems="center" sx={{width: '100%'}} 
          justifyContent="space-between">
            <Stack direction="row" gap={1} alignItems="center">        
          <Avatar src={comment?.owner?.avatar} alt={comment?.owner?.username}/>
            <Typography variant="h7">{comment?.owner?.username} </Typography>
         </Stack>
          <Typography color="gray" component="span" fontSize={12} >
        {moment(comment?.createdAt).format('DD/MM/YYYY HH:mm')}
      </Typography>
          </Stack>
           <Box 
           sx={{mt: 1,ml: 4, pl: 1, backgroundColor: alpha(theme.palette.background.default, 0.5), borderRadius: 1}} >
            <ReactQuill value={comment?.content} readOnly theme='bubble' />
           </Box>
    </Stack>
  )
}

export default Comments;
