import { Navigate } from 'react-router-dom';
import handleUserInfo from '~/utils/handleUserInfo';
import useData from '~/utils/useData';
import useToken from '~/utils/useToken';

function PrivateRoute({ children }) {
  const { token } = useToken();
  const { data, setData, fetchUserInfo } = useData();

  

  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  if (!data) {
    fetchUserInfo(token);
    console.log(data)
  }

  if (data?.legalEntityCode === null) {
    return <Navigate to="/create-entity" />;
  } else {
    return children;
  }
}

export default PrivateRoute;
