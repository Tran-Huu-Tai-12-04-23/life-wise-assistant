import { useTheme } from '@emotion/react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import { Box, Stack, alpha } from '@mui/system';
import * as React from 'react';
import { EffectBtn } from 'src/components/EffectBtn';
import { RouterLink } from 'src/routes/components';
import { usePathname, useRouter } from 'src/routes/hooks';
import navConfig from '../config-navigation';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled(({ isHasArrow, ...props }) => (
  <MuiAccordionSummary expandIcon={isHasArrow ? <KeyboardArrowDownIcon /> : null} {...props} />
))(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  // flexDirection: 'row-reverse',
  width: '100%',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  borderTop: '1px solid rgba(0, 0, 0, .05)',
  width: '100%',
  padding: 0,
}));

export default function NavMenu({ expanded }) {
  const [expandedDetail, setExpanded] = React.useState('panel10');
  const theme = useTheme();
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      {navConfig.map((item, index) => (
        <Accordion
          key={index}
          expanded={expandedDetail === `panel1${index}`}
          onChange={handleChange(`panel1${index}`)}
        >
          <EffectBtn
            component={RouterLink}
            href={item.path}
            sx={{
              width: '100%',
              background:
                pathname === item.path ? alpha(theme.palette.primary.main, 0.05) : 'transparent',
              borderRightWidth: 2,
              borderStyle: 'solid',
              borderColor: pathname === item.path ? theme.palette.primary.main : 'transparent',
            }}
          >
            <AccordionSummary
              isHasArrow={item?.subNav?.length > 0 && expanded}
              sx={{ width: '100%' }}
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                sx={{ width: '100%' }}
              >
                {item.icon}
                {expanded && (
                  <Box sx={{ userSelect: 'none', ml: 1, fontSize: 12 }} component="span">
                    {item.title.charAt(0).toUpperCase() + item.title.slice(1)}{' '}
                  </Box>
                )}
              </Stack>
            </AccordionSummary>
          </EffectBtn>
          {item?.subNav?.length > 0 && (
            <AccordionDetails sx={{ width: '100%' }}>
              <Stack
                direction="column"
                alignItems="center"
                justifyContent="flex-start"
                sx={{ width: '100%' }}
              >
                {item?.subNav?.map((subItem, subIndex) => (
                  <EffectBtn
                    onClick={() => {
                      router.push(subItem.path);
                    }}
                    key={subIndex}
                    sx={{
                      width: '100%',
                      height: '100%',
                      p: 2,
                      pl: 3,
                      color: subItem.path === pathname ? theme.palette.primary.main : 'inherit',
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="flex-start"
                      sx={{ width: '100%' }}
                    >
                      <Box
                        sx={{
                          width: '5px',
                          height: '5px',
                          mr: expanded ? 2 : 0,
                          borderRadius: 100,
                          background: alpha(theme.palette.primary.main, 0.5),
                        }}
                      />
                      {expanded && (
                        <Box sx={{ userSelect: 'none', ml: 1 }} component="span">
                          {subItem.title.charAt(0).toUpperCase() + subItem.title.slice(1)}{' '}
                        </Box>
                      )}
                    </Stack>
                  </EffectBtn>
                ))}
              </Stack>
            </AccordionDetails>
          )}
        </Accordion>
      ))}
    </>
  );
}
