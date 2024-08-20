import Microlink from '@microlink/react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Button, Collapse, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import Iconify from '../iconify';
import CloseIcon from '../icons/close-icon';

function FileLinkView({ fileLinks = [], onRemove }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <Stack direction="column" gap={1}>
      <Stack direction="row" gap={1} alignItems="center">
        <Button gap={1} color="primary" onClick={() => setExpanded(!expanded)} variant="text">
          <AttachFileIcon size="small" fontSize="12" sx={{ mr: 1 }} />
          <Typography component="span" sx={{ fontWeight: 'bold', fontSize: 12 }}>
            File link of task
          </Typography>
          <Iconify icon={expanded ? 'eva:arrow-up-fill' : 'eva:arrow-down-fill'} />
        </Button>
      </Stack>
      <Collapse in={expanded} orientation="vertical">
        <Stack direction="column" gap={2}>
          {fileLinks.map((item, index) => (
            <Tooltip title={item.name} key={item.link}>
              <Stack
                gap={2}
                direction="row"
                key={index}
                sx={{ width: '100%' }}
                justifyContent="space-between"
              >
                <Microlink
                  style={{ width: '100%', borderRadius: 10, padding: 1 }}
                  url={item.link}
                />
                <IconButton sx={{ height: 40, width: 40 }} onClick={() => onRemove(index)}>
                  <CloseIcon size={12} />
                </IconButton>
              </Stack>
            </Tooltip>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
}

export default FileLinkView;
