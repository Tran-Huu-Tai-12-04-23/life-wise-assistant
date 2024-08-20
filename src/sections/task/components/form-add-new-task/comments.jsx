import { Stack, Typography } from '@mui/material';
import RichTextFocusToEdit from 'src/components/rich-text/rich-text-focus-to-edit';

function Comments({ data, onChange }) {
  return (
    <Stack direction="column" gap={1}>
      {data.map((item, index) => (
        <Typography key={index} variant="h7">
          {item.content}{' '}
        </Typography>
      ))}
      <RichTextFocusToEdit
        onChange={(val) =>
          onChange({
            content: val,
          })
        }
        placeholder="Typing your comment!"
      />
    </Stack>
  );
}

export default Comments;
