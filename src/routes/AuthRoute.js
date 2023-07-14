import { Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import useToken from '~/utils/useToken';

function AuthRoute({ children }) {
  const { token } = useToken();

  if (!token) {
    return <Suspense>{children}</Suspense>;
  }

  return <Navigate to="/" />;
}

export default AuthRoute;
