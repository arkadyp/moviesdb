import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Dashboard from './dashboard';
import Details from './details';
import '../app.css';

export default function Routes() {
  return (
    <Router>
      <div id="backsplash" />
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>

        <Route path="/details/:movieId">
          <Details />
        </Route>

        <Redirect from="/" exact to="/dashboard" />

        <Route component={() => 'Page not found'} />

      </Switch>
    </Router>
  );
}
