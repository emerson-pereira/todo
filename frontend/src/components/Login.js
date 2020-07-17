import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import LoginAPI from '../api/LoginAPI';
import { UserContext } from '../UserContext';
import { setToken } from '../utils';

import StyledForm from './styles/StyledForm';
import StyledInput from './styles/StyledInput';
import StyledButton from './styles/StyledButton';

const Login = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { setUser: setContextUser } = useContext(UserContext);

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

      setContextUser({
        name: data.name,
        email: data.email,
      });

      setToken(token);

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
