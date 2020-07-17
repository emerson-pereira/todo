import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoginAPI from '../api/LoginAPI';

import StyledForm from './styles/StyledForm';
import StyledInput from './styles/StyledInput';
import StyledButton from './styles/StyledButton';

const Login = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    e.preventDefault();
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e) => {
    e.preventDefault();

    const loggedUser = await LoginAPI.login({ data: user });

    if (loggedUser) {
      const { data, token } = loggedUser;
      window.localStorage.setItem('user', JSON.stringify(data));
      window.localStorage.setItem('token', token);

      setUser({
        email: '',
        password: '',
      });

      history.push('/');
    }
  };

  return (
    <StyledForm onSubmit={login}>
      <h3>Login</h3>

      <p>
        <StyledInput
          type="text"
          value={user.email}
          id="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
      </p>

      <p>
        <StyledInput
          type="password"
          value={user.password}
          id="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
      </p>

      <StyledButton block>Login</StyledButton>
    </StyledForm>
  );
};

export default Login;
