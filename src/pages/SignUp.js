import Input from '~/components/Input';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import handleInput from '~/utils/validator';
import handleSignUp from '~/utils/handleSignUp';
import PrimaryButton from '~/components/PrimaryButton';
import handleLogin from '~/utils/handleLogin';

function SignUp({ setToken }) {
  // Set document title
  document.title = 'Sign Up';

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState({
    email: '',
    name: '',
    password: '',
  });

  useEffect(() => {
    setError({
      email: '',
      name: '',
      password: '',
    });
  }, [email, name, password]);

  const handleSubmit = async () => {
    // Pretreatment: check email username and password is valid
    const emailError = handleInput(email, 'required', 'email');
    const passwordError = handleInput(password, 'required', 'password');
    const nameError = handleInput(name, 'required', 'username');

    setError({ email: emailError, name: nameError, password: passwordError });

    // Log in case: only check email and password pass the pretreatment
    if (emailError === undefined && nameError === undefined && passwordError === undefined) {
      // Go to handle sign up to check on call api
      const res = await handleSignUp(email, name, password, setError);

      if (res) {
        const token = await handleLogin(email, password);

        if (token) {
          setToken(token);

          navigate('/create-entity');
        }
      }
    }
  };

  return (
    <>
      <h1 className="font-bold font-inter text-3xl">Sign up</h1>
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
          label="Username"
          onChange={(ev) => setName(ev.target.value)}
          id="name"
          type="text"
          value={name}
          error={error.name}
        />

        <Input
          label="Password"
          onChange={(ev) => setPassword(ev.target.value)}
          id="password"
          type="password"
          value={password}
          error={error.password}
        />
        <PrimaryButton onClick={handleSubmit}>Sign up</PrimaryButton>
      </div>
      <div className="flex justify-center text-zinc-400 font-inter mt-4 text-sm">
        <div className="">
          Already have an account?{' '}
          <NavLink to="/sign-in" className="text-primary font-montserrat cursor-pointer hover:underline">
            Sign in
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default SignUp;
