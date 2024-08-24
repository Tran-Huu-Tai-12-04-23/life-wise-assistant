import { useTheme } from '@emotion/react';
import KeyboardCommandKeyIcon from '@mui/icons-material/KeyboardCommandKey';
import SearchIcon from '@mui/icons-material/Search';
import { Box, ListItemButton, Modal, Stack, Typography, alpha } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import NoResultIcon from 'src/components/icons/no-result-icon';

function QuickSearch() {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        setIsOpen(true);
      }
      if (event.key === 'Enter' || event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);
  return (
    <>
      <ListItemButton
        onClick={() => setIsOpen(true)}
        sx={{
          borderRadius: 1,
          p: 0.5,
          backgroundColor: alpha(theme.palette.background.paper, 0.4),
        }}
      >
        <SearchIcon fontSize="24" sx={{ ml: 1, mr: 1 }} />
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            borderRadius: 1,
            backgroundColor: theme.palette.background.paper,
            p: 0.5,
          }}
        >
          <KeyboardCommandKeyIcon fontSize="12" color={theme.palette.background.default} />
          <Typography>K</Typography>
        </Stack>
      </ListItemButton>
      <Modal open={isOpen}>
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translate(-50%, 0%)',
            backgroundColor: theme.palette.background.paper,
            boxShadow: 24,
            borderRadius: 1,
            minWidth: '50%',
            minHeight: '50%',
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              pl: 2,
              pr: 2,
              pt: 2,
              width: '100%',
              mb: 1,
              pb: 1,
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          >
            <SearchIcon color="inherit" sx={{ fontSize: 22 }} />
            <input
              ref={inputRef}
              label=""
              style={{
                width: '100%',
                borderBottom: 0,
                borderColor: 0,
                background: 'transparent',
                outline: 0,
                border: 'none',
                color: theme.palette.text.primary,
                fontSize: 14,
                fontWeight: 600,
              }}
              placeholder="Typing name of task, event, ..."
            />
            <ListItemButton
              sx={{
                borderRadius: 1,
                backgroundColor: alpha(theme.palette.background.default, 0.4),
                p: 1,
                pl: 1,
                pr: 1,
                fontSize: 12,
                width: 120,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              ESC or Enter
            </ListItemButton>
          </Stack>

          <Stack
            sx={{
              pl: 2,
              pr: 2,
              pt: 2,
              width: '100%',
              mt: 4,
            }}
            alignItems="center"
          >
            <NoResultIcon />
            <Typography variant="h6" sx={{ fontWeight: 800, mt: 1 }}>
              No results found
            </Typography>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

export default QuickSearch;
