import { Navigate } from 'react-router-dom';
import useToken from '~/utils/useToken';
import useUserInfo from '~/utils/useUserInfo';

function PrivateRoute({ children }) {
  const { token } = useToken();
  const { userInfo, fetchUserInfo } = useUserInfo();

  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  if (!userInfo) {
    fetchUserInfo(token);
  }

  if (userInfo?.legalEntityCode === null) {
    return <Navigate to="/create-entity" />;
  } else {
    return userInfo && children;
  }
}

export default PrivateRoute;
