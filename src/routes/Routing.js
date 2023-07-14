// Import depedencies
import { Navigate, useRoutes } from 'react-router-dom';
import { lazy } from 'react';
import useToken from '~/utils/useToken';

// Import Route orders
import AuthRoute from './AuthRoute';
import PrivateRoute from './PrivateRoute';
import EntityRoute from './EntityRoute';

// Import Layout
const DefaultLayout = lazy(() => import('~/components/Layout/DefaultLayout'));
const AuthLayout = lazy(() => import('~/components/Layout/AuthLayout'));
const EntityLayout = lazy(() => import('~/components/Layout/EntityLayout'));

// Import Pages
const SignIn = lazy(() => import('~/pages/SignIn'));
const SignUp = lazy(() => import('~/pages/SignUp'));
const CreateEntity = lazy(() => import('~/pages/CreateEntity'));
const JoinEntity = lazy(() => import('~/pages/JoinEntity'));
const Home = lazy(() => import('~/pages/Home'));
const Dashboard = lazy(() => import('~/pages/Dashboard'));
const ProductsList = lazy(() => import('~/pages/ProductsList'));
const ProductInfo = lazy(() => import('~/pages/ProductInfo'));
const VendorList = lazy(() => import('~/pages/VendorList'));
const VendorInfo = lazy(() => import('~/pages/VendorInfo'));
const Settings = lazy(() => import('~/pages/Settings'));
const UserList = lazy(() => import('~/pages/UserList'));
const Teams = lazy(() => import('~/pages/Teams'));
const ConfigureRoles = lazy(() => import('~/pages/ConfigureRoles'));
const ErrorPage = lazy(() => import('~/pages/ErrorPage'));

function Routing() {
  const { setToken } = useToken();

  const routes = useRoutes([
    {
      path: '/sign-in',
      element: (
        <AuthRoute>
          <AuthLayout>
            <SignIn setToken={setToken} />
          </AuthLayout>
        </AuthRoute>
      ),
    },
    {
      path: '/create-entity',
      element: (
        <EntityRoute>
          <EntityLayout>
            <CreateEntity />
          </EntityLayout>
        </EntityRoute>
      ),
    },
    {
      path: '/join-entity',
      element: (
        <EntityRoute>
          <EntityLayout>
            <JoinEntity />
          </EntityLayout>
        </EntityRoute>
      ),
    },
    {
      path: '/sign-up',
      element: (
        <AuthRoute>
          <AuthLayout>
            <SignUp setToken={setToken} />
          </AuthLayout>
        </AuthRoute>
      ),
    },
    {
      path: '/',
      element: (
        <PrivateRoute>
          <DefaultLayout>
            <Home />
          </DefaultLayout>
        </PrivateRoute>
      ),
    },
    {
      path: '/dashboard',
      element: (
        <PrivateRoute>
          <DefaultLayout>
            <Dashboard />
          </DefaultLayout>
        </PrivateRoute>
      ),
    },
    {
      path: '/products-list',
      element: (
        <PrivateRoute>
          <DefaultLayout>
            <ProductsList />
          </DefaultLayout>
        </PrivateRoute>
      ),
    },
    {
      path: '/products-list/:productCode',
      element: (
        <PrivateRoute>
          <DefaultLayout>
            <ProductInfo />
          </DefaultLayout>
        </PrivateRoute>
      ),
    },
    {
      path: '/vendor-list',
      element: (
        <PrivateRoute>
          <DefaultLayout>
            <VendorList />
          </DefaultLayout>
        </PrivateRoute>
      ),
    },
    {
      path: '/vendor-list/:vendorID',
      element: (
        <PrivateRoute>
          <DefaultLayout>
            <VendorInfo />
          </DefaultLayout>
        </PrivateRoute>
      ),
    },
    {
      path: '/settings',
      element: <Navigate to="/settings/user-list" />,
    },
    {
      path: '/settings',
      element: (
        <PrivateRoute>
          <DefaultLayout>
            <Settings />
          </DefaultLayout>
        </PrivateRoute>
      ),
      children: [
        {
          path: 'user-list',
          element: <UserList />,
        },
        {
          path: 'teams',
          element: <Teams />,
        },
        {
          path: 'config-roles',
          element: <ConfigureRoles />,
        },
      ],
    },
    {
      path: '/error',
      element: <ErrorPage />,
    },
  ]);
  return <>{routes}</>;
}

export default Routing;
