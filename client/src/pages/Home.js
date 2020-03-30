import React, { Component, useCallback } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { connect } from 'react-redux';

const logoutButtonCss = css`
  width: 150px;
  border-radius: 3px;
  letter-spacing: 1.5px;
  margin-top: 1rem;
`;

class Home extends Component {
  static propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div className="container valign-wrapper" style={{ height: '75vh' }}>
        <div className="row">
          <div className="col s12 center-align">
            <h5 style={{ marginBottom: '50px' }}>
              Hello, <b>{user.name.split(' ')[0]}</b>
            </h5>
          </div>
          <div className="col s12 center-align">
            <nav>
              <div class="nav-wrapper">
                <form>
                  <div className="input-field white" style={{ width: '100%' }}>
                    <input
                      id="search"
                      type="search"
                      placeholder="What's troubling you?"
                      required
                    ></input>
                    <label class="label-icon" for="search">
                      <i class="material-icons">search</i>
                    </label>
                    <i class="material-icons">close</i>
                  </div>
                </form>
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Home);
