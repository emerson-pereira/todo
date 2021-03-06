import React, { useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserAPI from '../api/UserAPI';
import { UserContext } from '../UserContext';
import { removeToken, isAuth } from '../utils';

import StyledNav from './styles/StyledNav';
import StyledNavLink from './styles/StyledNavLink';

const Nav = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const getUser = async () => {
      const response = await UserAPI.findCurrent();

      if (response.data) {
        setUser({
          name: response.data.name,
          email: response.data.email,
        });
      } else {
        // openSnackbar({ type: 'error', message: response.message })
      }
    };

    !user.name && isAuth() && getUser();
  }, [setUser, user.name]);

  const history = useHistory();

  const logout = () => {
    removeToken();

    setUser({
      name: '',
      email: '',
    });

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
          {user.name && <strong>{user.name}</strong>}
          <ul>{user.name ? <NavLogged /> : <NavNotLogged />}</ul>
        </div>
      </div>
    </StyledNav>
  );
};

export default Nav;
