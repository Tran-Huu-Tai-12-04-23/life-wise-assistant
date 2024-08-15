import BellIcon from 'src/components/icons/bell-icon';

// ----------------------------------------------------------------------

// const icon = (name) => (
//   <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
// );

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: <BellIcon color="gray"/>,
  },
  {
    title: 'task',
    path: '/task',
    icon:  <BellIcon color="gray"/>,
    subNav: [
      {
        title: 'Manager',
        path: '/task/manager',
        icon:  <BellIcon color="gray"/>,
      },
      {
        title: 'History',
        path: '/task/History',
        icon:  <BellIcon color="gray"/>,
      }
    ]
  },
  {
    title: 'user',
    path: '/user',
    icon:  <BellIcon color="gray"/>,
  },
  {
    title: 'product',
    path: '/products',
    icon: <BellIcon color="gray"/>,
  },
  {
    title: 'blog',
    path: '/blog',
    icon: <BellIcon color="gray"/>,
  },
   {
    title: 'Create blog',
    path: '/create-blog',
    icon: <BellIcon color="gray"/>,
  }
];

export default navConfig;
