import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// "component: Component" seems like weird syntax. What it's doing is renaming the lower-case "component" to "Component", which allows us to use it as a component with JSX, i.e. as <Component />
function PrivateRoute({
  component: Component,
  redirect = '/login',
  auth,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={redirect} />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
