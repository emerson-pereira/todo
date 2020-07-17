import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { isAuth } from './utils';

import Nav from './components/Nav';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import CreateUser from './components/User/CreateUser';
import UpdateProject from './components/Project/UpdateProject';
import RemoveProject from './components/Project/RemoveProject';
import UpdateTask from './components/Task/UpdateTask';
import RemoveTask from './components/Task/RemoveTask';

import StyledContainer from './components/styles/StyledContainer';

const PrivateRoute = ({ children, ...rest }) =>
  isAuth() ? (
    <Route {...rest}>
      <StyledContainer>{children}</StyledContainer>
    </Route>
  ) : (
    <Redirect to="/login" />
  );

const PublicRoute = ({ children, ...rest }) => (
  <Route {...rest}>
    <StyledContainer>{children}</StyledContainer>
  </Route>
);

const Routes = () => (
  <Router>
    <Nav />
    <Switch>
      <PublicRoute path="/login">
        {isAuth() ? <Redirect to="/" /> : <Login />}
      </PublicRoute>
      <PublicRoute path="/register">
        {isAuth() ? <Redirect to="/" /> : <CreateUser />}
      </PublicRoute>

      <PrivateRoute exact path="/">
        <Dashboard />
      </PrivateRoute>

      <PrivateRoute path="/project/:projectId/update">
        <UpdateProject />
      </PrivateRoute>
      <PrivateRoute path="/project/:projectId/remove">
        <RemoveProject />
      </PrivateRoute>

      <PrivateRoute path="/project/:projectId/task/:taskId/update">
        <UpdateTask />
      </PrivateRoute>
      <PrivateRoute path="/project/:projectId/task/:taskId/remove">
        <RemoveTask />
      </PrivateRoute>
    </Switch>
  </Router>
);

export default Routes;
