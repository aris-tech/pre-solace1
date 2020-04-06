import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { userNotLoggedIn } from '../actions/auth';

// "component: Component" seems like weird syntax. What it's doing is renaming the lower-case "component" to "Component", which allows us to use it as a component with JSX, i.e. as <Component />
class PrivateRoute extends Component {
  static propTypes = {
    userNotLoggedIn: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };
  render() {
    const {
      component: Component,
      redirect = '/login',
      auth,
      userNotLoggedIn,
      ...rest
    } = this.props;

    debugger;

    return (
      <Route
        {...rest}
        render={(props) => {
          if (auth.isAuthenticated) {
            return <Component {...props} />;
          } else {
            userNotLoggedIn();
            return <Redirect to={redirect} />;
          }
        }}
      />
    );
  }
}

PrivateRoute.propTypes = {};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = {
  userNotLoggedIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
