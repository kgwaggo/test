import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './ext-src/pages/Home.jsx';
import LoginPage from './ext-src/pages/auth/Login.jsx';
import SignupPage from './ext-src/pages/auth/Signup.jsx';
import { Dashboard as DashboardPage } from './ext-src/pages/Dashboard.jsx';
import { Train as TrainPage } from './ext-src/pages/Train.jsx';
import { Route as RoutePage } from './ext-src/pages/Route.jsx';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/dashboard" component={DashboardPage} />
        <Route exact path="/train" component={TrainPage} />
        <Route exact path="/route" component={RoutePage} />
      </Switch>
    </Router>
  );
};

export default AppRouter;