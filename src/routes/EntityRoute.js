import { Navigate } from 'react-router-dom';
import useUserInfo from '~/utils/useUserInfo';
import useToken from '~/utils/useToken';

function EntityRoute({ children }) {
  const { token } = useToken();
  const { userInfo } = useUserInfo();

  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  if (!userInfo || userInfo?.legalEntityCode === null) {
    return <>{children}</>;
  }

  return <Navigate to="/" />;
}

export default EntityRoute;
