import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios({
        baseURL: 'http://localhost:4000',
        url: '/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          email: user.email,
          password: user.password,
        },
      });

      if (response.status === 200) {
        const { data, headers } = response;
        window.localStorage.setItem('token', headers['x-auth-token']);
        window.localStorage.setItem('user', JSON.stringify(data));

        setUser({
          email: '',
          password: '',
        });

        history.push('/');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
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
