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
    icon: <DashBoardIcon color="#6C6C76"  size={22}/>,
  },
  {
    title: 'task',
    path: '/task',
    icon:  <TaskIcon color="#6C6C76" size={22}/>,
    subNav: [
      {
        title: 'Manager',
        path: '/task/manager',
        icon:  <BellIcon color="#6C6C76"/>,
      },
      {
        title: 'History',
        path: '/task/History',
        icon:  <BellIcon color="#6C6C76"/>,
      }
    ]
  },
  {
    title: 'user',
    path: '/user',
    icon:  <UserIcon size={22} color="#6C6C76"/>,
  },
  {
    title: 'product',
    path: '/products',
    icon: <BellIcon color="#6C6C76"/>,
  },
  {
    title: 'blog',
    path: '/blog',
    icon: <FolderIcon size={22} color="#6C6C76"/>,
  },
  {
    title: 'login',
    path: '/login',
    icon: <BellIcon color="#6C6C76"/>,
  },
  {
    title: 'Not found',
    path: '/404',
    icon:  <BellIcon color="#6C6C76"/>,
  },
];

export default navConfig;
