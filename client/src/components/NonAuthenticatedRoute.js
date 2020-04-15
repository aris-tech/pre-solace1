import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class NonAuthenticatedRoute extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };
  render() {
    const {
      component: Component,
      redirect = '/home',
      auth,
      ...rest
    } = this.props;

    return (
      <Route
        {...rest}
        render={(props) => {
          if (!auth.isAuthenticated) {
            return <Component {...props} />;
          } else {
            return <Redirect to={redirect} />;
          }
        }}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(NonAuthenticatedRoute);
