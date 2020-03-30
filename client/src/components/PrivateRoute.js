import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css';

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
      render={(props) => {
        if (auth.isAuthenticated) {
          return <Component {...props} />;
        } else {
          M.toast({ html: 'You are not logged in.' });
          return <Redirect to={redirect} />;
        }
      }}
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
