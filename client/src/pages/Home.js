import React, { Component, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/auth';
import { css } from '@emotion/core';

const logoutButtonCss = css`
  width: 150px;
  border-radius: 3px;
  letter-spacing: 1.5px;
  margin-top: 1rem;
`;

function Home({ logoutUser, auth }) {
  const onLogoutClick = useCallback((event) => {
    event.preventDefault();
    logoutUser();
  });

  const { user } = auth;
  return (
    <div className="container valign-wrapper" style={{ height: '75vh' }}>
      <div className="row">
        <div className="col s12 center-align">
          <h4>
            <b>Hello,</b> {user.name.split(' ')[0]}
            <p className="flow-text grey-text text-darken-1">
              You are logged into Solace ❤
            </p>
            <button
              css={logoutButtonCss}
              onClick={onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </h4>
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = () => ({
  logoutUser,
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
