import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserAPI from '../api/UserAPI';

import StyledNav from './styles/StyledNav';

const Nav = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
  });
  const token = localStorage.getItem('token');

  useEffect(() => {
    const getUser = async () => {
      const user = await UserAPI.getUser({ token });
      user &&
        setUser({
          name: user.name,
          email: user.email,
        });
    };
    token && getUser();
  }, [token]);

  const NavLogged = () => (
    <>
      <li>
        <Link to="/user/profile">Your Profile</Link>
      </li>
      <li>
        <Link to="/">Logout</Link>
      </li>
    </>
  );

  const NavNotLogged = () => (
    <>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </>
  );

  return (
    <StyledNav>
      <div>
        <div>
          <h1>Todo App</h1>
        </div>
        <div style={{ textAlign: 'center' }}>
          <strong>{user.name}</strong>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {token ? <NavLogged /> : <NavNotLogged />}
          </ul>
        </div>
      </div>
    </StyledNav>
  );
};

export default Nav;
