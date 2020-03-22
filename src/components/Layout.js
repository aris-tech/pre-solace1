import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// Components
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Welcome from '../pages/Welcome';

export default function Layout() {
  const emailHook = useState('');
  const passwordHook = useState('');
  const userState = { emailHook, passwordHook };

  const routes = [
    { path: '/', exact: true, component: Welcome },
    { path: '/login', component: Login, userState },
    { path: '/signup', component: Signup, userState },
  ];
  
  return (
    <Router>
      <Switch>
        {routes.map(route => {
          const { userState, component, ...rest } = route;
          return (
            <Route {...rest} >
              {React.createElement(component, { userState }, null)}
            </Route>
          );
        })}
      </Switch>
    </Router>
  )
}