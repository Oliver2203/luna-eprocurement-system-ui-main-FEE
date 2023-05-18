import { Navigate } from 'react-router-dom';
import useToken from '~/utils/useToken';

function AuthRoute({ children }) {
  const token = useToken().token;

  return token ? <Navigate to="/" /> : children;
}

export default AuthRoute;
