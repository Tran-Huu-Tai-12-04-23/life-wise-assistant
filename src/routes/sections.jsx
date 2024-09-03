import { lazy, Suspense } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import LoadingView from 'src/components/loadingView';
import AuthLayout from 'src/layouts/auth';

import DashboardLayout from 'src/layouts/dashboard';
import CreateBlogPage from 'src/pages/private/create-blog';
import NotificationPage from 'src/pages/private/notification';

export const IndexPage = lazy(() => import('src/pages/private/app'));
export const BlogPage = lazy(() => import('src/pages/private/blog'));
export const BoardPage = lazy(() => import('src/pages/private/board'));
export const BoardHistoryPage = lazy(() => import('src/pages/private/board-history'));
export const SettingPage = lazy(() => import('src/pages/private/setting'));
export const BoardAccessControlPage = lazy(() => import('src/pages/private/board-access-control'));
export const UserPage = lazy(() => import('src/pages/private/user'));
export const LoginPage = lazy(() => import('src/pages/public/login'));
export const LoginWithThirdPlatformCallBack = lazy(() =>
  import('src/sections/login/login-with-third-platform-callback')
);
export const ProductsPage = lazy(() => import('src/pages/private/products'));
export const Page404 = lazy(() => import('src/pages/public/page-not-found'));

// ----------------------------------------------------------------------
const AuthRoutes = [
  {
    element: (
      <AuthLayout>
        <Suspense fallback={<LoadingView />}>
          <Outlet />
        </Suspense>
      </AuthLayout>
    ),
    path: 'auth',
    children: [
      { element: <LoginPage />, index: true },
      { path: 'google/callback/success', element: <LoginWithThirdPlatformCallBack /> },
      { path: 'github/callback/success', element: <LoginWithThirdPlatformCallBack /> },
    ],
  },
];
const PrivateRouter = [
  {
    element: (
      <DashboardLayout>
        <Suspense fallback={<LoadingView />}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    path: '/',
    children: [
      { element: <IndexPage />, index: true },
      { path: 'user', element: <UserPage /> },
      { path: 'products', element: <ProductsPage /> },
      {
        path: 'blog',
        children: [
          { path: '', element: <BlogPage /> },
          { path: 'create-blog', element: <CreateBlogPage /> },
        ],
      },
      {
        path: 'board',
        children: [
          { path: '', element: <BoardPage />, index: true },
          { path: ':id', element: <BoardPage /> },
          { path: 'history', element: <BoardHistoryPage /> },
          { path: 'access-control', element: <BoardAccessControlPage /> },
        ],
      },
      { path: 'notification', element: <NotificationPage /> },
      { path: 'setting', element: <SettingPage /> },
    ],
  },
];

export default PrivateRouter;

function AppRouter() {
  const routes = useRoutes([
    ...PrivateRouter,
    ...AuthRoutes,
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}

export { AppRouter };
