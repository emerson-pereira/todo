import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserAPI from '../../api/UserAPI';
import { UserContext } from '../../UserContext';
import { setToken } from '../../utils';

import StyledForm from '../styles/StyledForm';
import StyledInput from '../styles/StyledInput';
import StyledButton from '../styles/StyledButton';

const Login = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { setUser: setContextUser } = useContext(UserContext);

  const history = useHistory();

  const handleChange = (e) => {
    e.preventDefault();
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const createUser = async (e) => {
    e.preventDefault();

    const newUser = await UserAPI.createUser({ data: user });

    if (newUser) {
      const { token, data } = newUser;

      setContextUser({
        name: data.name,
        email: data.email,
      });

      setToken(token);

      history.push('/');
    }
  };

  return (
    <StyledForm onSubmit={createUser}>
      <h3>Register up</h3>

      <p>
        <StyledInput
          type="text"
          value={user.name}
          id="name"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />
      </p>

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

      <StyledButton block>Submit</StyledButton>
    </StyledForm>
  );
};

export default Login;
