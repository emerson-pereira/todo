import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import LoginAPI from '../api/LoginAPI';
import { UserContext } from '../UserContext';

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

  const openSnackbar = (args) => console.table(args);

  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await LoginAPI.login({ data: user });

      if (response.error) {
        openSnackbar({
          type: 'error',
          text: response.error.message,
        });
      } else if (response.data) {
        setContextUser({
          name: response.data.name,
          email: response.data.email,
        });

        history.push('/');
      } else {
        throw new Error();
      }
    } catch (err) {
      openSnackbar({
        type: 'error',
        text: 'Something went wrong logging in',
      });
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
