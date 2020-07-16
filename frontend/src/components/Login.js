import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import FormInput from './FormInput';

import StyledSection from './styles/StyledSection';
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
    <StyledSection>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          input={{
            type: 'text',
            name: 'email',
            value: user.email,
            handleChange,
          }}
        />

        <FormInput
          label="Password"
          input={{
            type: 'password',
            name: 'password',
            value: user.password,
            handleChange,
          }}
        />
        <StyledButton>Login</StyledButton>
      </form>
    </StyledSection>
  );
};

export default Login;
