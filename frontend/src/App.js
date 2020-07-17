import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import Login from './components/Login';

import UpdateProject from './components/Project/UpdateProject';
import RemoveProject from './components/Project/RemoveProject';

const App = () => (
  <Router>
    <Nav />
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/project/:projectId/update">
        <UpdateProject />
      </Route>
      <Route path="/project/:projectId/remove">
        <RemoveProject />
      </Route>
    </Switch>
  </Router>
);

export default App;
