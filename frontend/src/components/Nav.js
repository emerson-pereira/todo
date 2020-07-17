import React from 'react';
import { Link } from 'react-router-dom';

import StyledNav from './styles/StyledNav';

const Nav = () => (
  <StyledNav>
    <div>
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
    </div>
  </StyledNav>
);

export default Nav;
