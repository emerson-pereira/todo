import React from 'react';
import StyledNav from './styles/StyledNav';
import { Link } from 'react-router-dom';

const Nav = () => (
  <StyledNav>
    <div>
      <h1>Todo App</h1>
    </div>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  </StyledNav>
);

export default Nav;
