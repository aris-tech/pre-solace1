// -- General --
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import createAppStore from './store/createAppStore';

// -- Components --
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import NonAuthenticatedRoute from './components/NonAuthenticatedRoute';

// -- Pages --
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import Search from './pages/Search';

// -- Actions --
import {
  moveJwtFromCookiesToLocalStorage,
  authenticateJwtFromLocalStorage,
} from './actions/auth';

// These functions only get called when the App component refreshes, which will only happen when you refresh the page
const store = createAppStore();
store.dispatch(moveJwtFromCookiesToLocalStorage());
store.dispatch(authenticateJwtFromLocalStorage());

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={Welcome} />
            <NonAuthenticatedRoute exact path="/login" component={Login} />
            <NonAuthenticatedRoute exact path="/signup" component={Signup} />
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/search/:query" component={Search} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}
