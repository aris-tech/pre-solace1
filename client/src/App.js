import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import createAppStore from './store/createAppStore';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/auth';
import jwt_decode from 'jwt-decode';

// These functions only get called when the App component refreshes, which will only happen when you refresh the page
const store = createAppStore();
if (localStorage.jwtToken) {
  const { jwtToken: token } = localStorage;
  setAuthToken(token);
  const decodedToken = jwt_decode(token);
  store.dispatch(setCurrentUser(decodedToken));

  const currentTime = Date.now() / 1000;
  if (currentTime > decodedToken.exp) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/profile" component={Profile} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}
