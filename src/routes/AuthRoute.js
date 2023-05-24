import { Navigate } from 'react-router-dom';
import useToken from '~/utils/useToken';

function AuthRoute({ children }) {
  const token = useToken().token;

  if (!token) {
    return <>{children}</>;
  }

  return <Navigate to="/" />;
}

export default AuthRoute;
