import { Stack } from "@mui/material";
import RichTextFocusToEdit from "src/components/rich-text/rich-text-focus-to-edit";

function Comments() {
    return <Stack direction="column" gap={1}>
        <RichTextFocusToEdit placeholder="Typing your comment!"/>
    </Stack>
}

export default Comments;