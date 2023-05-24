import { Navigate } from 'react-router-dom';
import useData from '~/utils/useData';
import useToken from '~/utils/useToken';

function EntityRoute({ children }) {
  const { token } = useToken();
  const { data } = useData();

  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  if (!data || data?.legalEntityCode === null) {
    return <>{children}</>;
  }

  return <Navigate to="/" />;
}

export default EntityRoute;
