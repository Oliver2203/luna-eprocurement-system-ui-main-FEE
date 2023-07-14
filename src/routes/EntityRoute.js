import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useToken from '~/utils/useToken';
import { Suspense, useEffect } from 'react';
import fetchUserInfo from '~/api/fetchUserInfo';
import { setUserInfo } from '~/features/data/userInfoSlice';

function PrivateRoute({ children }) {
  const { token } = useToken();
  const { userInfo } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/sign-in');
    } else if (!userInfo) {
      fetchUserInfo(token).then((res) => {
        if (!res) {
          navigate('/error');
        }
        dispatch(setUserInfo(res));
        if (res?.legalEntityCode !== null) {
          navigate('/');
        }
      });
    } else if (userInfo?.legalEntityCode !== null) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, []);

  return <Suspense>{children}</Suspense>;
}

export default PrivateRoute;
