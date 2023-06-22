import Input from '~/components/Input';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import handleInput from '~/utils/validator';
// import handleLogin from '~/utils/handleLogin';
import PrimaryButton from '~/components/PrimaryButton';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '~/features/actions/authAction';

function SignIn({ setToken }) {
  // Set document title
  document.title = 'Sign In';

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { accessToken, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [error, setError] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    setError({
      email: '',
      password: '',
    });
  }, [email, password]);

  useEffect(() => {
    if (accessToken && !loading) {
      setToken(accessToken);
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, setToken, navigate, loading]);

  const handleSubmit = async () => {
    // Pretreatment: check email username and password is valid
    const emailError = handleInput(email, 'required', 'email');
    const passwordError = handleInput(password, 'required', 'password');

    setError({ email: emailError, password: passwordError });

    // Log in case: only check email and password pass the pretreatment
    if (emailError === undefined && passwordError === undefined) {
      // Go to handle login to check on call api

      dispatch(loginUser({ email, password, setError }));
    }
  };

  return (
    <>
      <h1 className="font-bold font-inter text-3xl ">Sign In</h1>
      <div className="flex flex-col gap-4 mt-10">
        <Input
          label="Email"
          onChange={(ev) => setEmail(ev.target.value)}
          id="email"
          type="email"
          value={email}
          error={error.email}
        />
        <Input
          label="Password"
          onChange={(ev) => setPassword(ev.target.value)}
          id="password"
          type="password"
          value={password}
          error={error.password}
        />
        <PrimaryButton onClick={handleSubmit}>Sign in</PrimaryButton>
      </div>
      <div className="flex justify-between text-zinc-400 font-inter mt-4 text-sm">
        <p className="cursor-pointer hover:underline hover:text-primary">Forget password</p>
        <div className="">
          Don't have an account?{' '}
          <NavLink to="/sign-up" className="text-primary font-montserrat cursor-pointer hover:underline">
            Sign up
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default SignIn;
