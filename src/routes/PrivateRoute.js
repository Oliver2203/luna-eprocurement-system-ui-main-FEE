import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useToken from '~/utils/useToken';
import { useEffect } from 'react';
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
      fetchUserInfo(token)
        .then((res) => {
          if (!res) {
            navigate('/error');
          }
          dispatch(setUserInfo(res));
          if (res?.legalEntityCode === null) {
            navigate('/create-entity');
          }
        })
        .catch((err) => {
          console.log('err');
        });
    } else if (userInfo?.legalEntityCode === null) {
      navigate('/create-entity');
    }
    // eslint-disable-next-line
  }, []);

  return children;
}

export default PrivateRoute;
