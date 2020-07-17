import React, { useState } from 'react';
import FormInput from './FormInput';

import StyledButton from './styles/StyledButton';

const Login = () => {
  const [user, setUser] = useState({
    name: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(user);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        label="Name"
        input={{
          type: 'text',
          name: 'name',
          value: user.name,
          handleChange,
        }}
      />

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
      <StyledButton>Submit</StyledButton>
    </form>
  );
};

export default Login;
