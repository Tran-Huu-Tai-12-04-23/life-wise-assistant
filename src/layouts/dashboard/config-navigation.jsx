import AssignmentIcon from '@mui/icons-material/Assignment';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import BellIcon from 'src/components/icons/bell-icon';
// ----------------------------------------------------------------------

// const icon = (name) => (
//   <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
// );

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: <SpaceDashboardIcon color="#6C6C76" size={22} />,
  },
  {
    title: 'board',
    path: '/board',
    icon: <AssignmentIcon color="#6C6C76" size={22} />,
  },
  {
    title: 'user',
    path: '/user',
    icon: <PersonIcon size={30} color="#6C6C76" />,
  },
  {
    title: 'product',
    path: '/products',
    icon: <BellIcon color="#6C6C76" />,
  },
  {
    title: 'blog',
    path: '/blog',
    icon: <LibraryBooksIcon size={22} color="#6C6C76" />,
  },
  {
    title: 'Notification',
    path: '/notification',
    icon: <BellIcon size={22} color="#6C6C76" />,
  },
  {
    title: 'Setting',
    path: '/setting',
    icon: <SettingsIcon size={22} color="#6C6C76" />,
  },
];

export default navConfig;
