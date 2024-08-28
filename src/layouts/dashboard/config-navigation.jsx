import AddIcon from '@mui/icons-material/Add';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import BellIcon from 'src/components/icons/bell-icon';
import DashBoardIcon from 'src/components/icons/dashboard-icon';
import FolderIcon from 'src/components/icons/folder-icon';
import TaskIcon from 'src/components/icons/task-icon';
import UserIcon from 'src/components/icons/user-icon';
// ----------------------------------------------------------------------

// const icon = (name) => (
//   <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
// );

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: <DashBoardIcon color="#6C6C76" size={22} />,
  },
  {
    title: 'task',
    path: '/task',
    icon: <TaskIcon color="#6C6C76" size={22} />,
    subNav: [
      {
        title: '',
        path: '/task',
        icon: <AppRegistrationIcon color="#6C6C76" />,
      },
      {
        title: 'History',
        path: '/task/History',
        icon: <SettingsBackupRestoreIcon color="#6C6C76" />,
      },
    ],
  },
  {
    title: 'user',
    path: '/user',
    icon: <UserIcon size={22} color="#6C6C76" />,
  },
  {
    title: 'product',
    path: '/products',
    icon: <BellIcon color="#6C6C76" />,
  },
  {
    title: 'blog',
    path: '/blog',
    icon: <FolderIcon size={22} color="#6C6C76" />,
    subNav: [
      {
        title: 'Manager',
        path: '/blog',
        icon: <AppRegistrationIcon color="#6C6C76" />,
      },
      {
        title: 'Create blog',
        path: '/blog/create-blog',
        icon: <AddIcon color="#6C6C76" />,
      },
    ],
  },
   {
    title: 'Notification manager',
    path: '/notification',
    icon: <BellIcon size={22} color="#6C6C76" />,
  },
];

export default navConfig;
