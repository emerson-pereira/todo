import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import UserAPI from '../api/UserAPI';
import { isAuth, getToken } from '../utils';

import StyledNav from './styles/StyledNav';

import styled from 'styled-components';
const StyledNavLink = styled.button`
  font-size: 1em;
  background: none;
  border: 1px;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Nav = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
  });
  const [isLogged, setIsLogged] = useState(false);

  let location = useLocation();

  useEffect(() => {
    const getUser = async () => {
      const token = getToken();
      const user = await UserAPI.getUser({ token });
      console.log(user);
      if (user) {
        setUser({
          name: user.name,
          email: user.email,
        });
        setIsLogged(true);
      }
    };
    isAuth() && getUser();
  }, [location]);

  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLogged(false);
    history.push('/login');
  };

  const NavLogged = () => (
    <>
      <li>
        <Link to="/">
          <StyledNavLink>Home</StyledNavLink>
        </Link>
      </li>
      <li>
        <Link to="/user/profile">
          <StyledNavLink>Your Profile</StyledNavLink>
        </Link>
      </li>
      <li>
        <StyledNavLink onClick={logout}>Logout</StyledNavLink>
      </li>
    </>
  );

  const NavNotLogged = () => (
    <>
      <li>
        <Link to="/register">
          <StyledNavLink>Register</StyledNavLink>
        </Link>
      </li>
      <li>
        <Link to="/login">
          <StyledNavLink>Login</StyledNavLink>
        </Link>
      </li>
    </>
  );

  return (
    <StyledNav>
      <div>
        <div>
          <h1>Todo App</h1>
        </div>
        <div className="nav-links-wrapper">
          {isLogged && <strong>{user.name}</strong>}
          <ul>{isLogged ? <NavLogged /> : <NavNotLogged />}</ul>
        </div>
      </div>
    </StyledNav>
  );
};

export default Nav;
