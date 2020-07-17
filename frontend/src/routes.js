import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Nav from './components/Nav';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import UpdateProject from './components/Project/UpdateProject';
import RemoveProject from './components/Project/RemoveProject';

import StyledContainer from './components/styles/StyledContainer';
const token = localStorage.getItem('token');

const PrivateRoute = ({ children, ...rest }) =>
  token ? (
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
        <Login />
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
        <p>Update Task</p>
      </PrivateRoute>
      <PrivateRoute path="/project/:projectId/task/:taskId/remove">
        <p>Remove task</p>
      </PrivateRoute>
    </Switch>
  </Router>
);

export default Routes;
