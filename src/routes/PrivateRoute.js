import { Navigate } from 'react-router-dom';
import useToken from '~/utils/useToken';

function PrivateRoute({ children }) {
  const { token } = useToken();

  return token ? children : <Navigate to="/sign-in" />;
}

export default PrivateRoute;
