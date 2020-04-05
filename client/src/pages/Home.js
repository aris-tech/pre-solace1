import React, { Component, useCallback } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { searchForCounselor } from '../actions/search';

const logoutButtonCss = css`
  width: 150px;
  border-radius: 3px;
  letter-spacing: 1.5px;
  margin-top: 1rem;
`;

function SearchBar({ onSubmit, ...props }) {
  return (
    <nav>
      <div className="nav-wrapper">
        <form onSubmit={onSubmit}>
          <div className="input-field white" style={{ width: '100%' }}>
            <input
              id="search"
              type="search"
              placeholder="What's troubling you?"
              {...props}
            ></input>
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i className="material-icons">close</i>
          </div>
        </form>
      </div>
    </nav>
  );
}

function Greeting({ user }) {
  return (
    <h5>
      Hello, <b>{user.name.split(' ')[0]}</b>
    </h5>
  );
}

class Home extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleSearchChange(event) {
    this.setState({ searchText: event.target.value });
  }
  handleSearchSubmit(event) {
    // Dispatch thunk that sends text to api, then afterwards, I take the response and store it in state
    // I'll push history here
    event.preventDefault();
    this.props.history.push(`/search/${this.state.searchText}`);
  }

  render() {
    const { user } = this.props.auth;
    // this.props.search.isSearching = true; // DEBUG GET RID OF
    const { isSearching } = this.props.search;

    let homeContent;
    if (isSearching) {
      homeContent = (
        <div className="col s12 center-align">
          <h5>Currently looking for a counselor...</h5>
          <p>ETA: 5 minutes</p>
          <Link>Cancel Search</Link>
        </div>
      );
    } else {
      homeContent = (
        <>
          <div
            className="col s12 center-align"
            style={{ marginBottom: '25px' }}
          >
            <Greeting user={user} />
          </div>
          <div className="col s12 center-align">
            <SearchBar
              value={this.state.searchText}
              onChange={this.handleSearchChange}
              onSubmit={this.handleSearchSubmit}
            />
          </div>
        </>
      );
    }

    return (
      <div className="container valign-wrapper" style={{ height: '75vh' }}>
        <div className="row">{homeContent}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  search: state.search,
});

const mapDispatchToProps = {
  searchForCounselor,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
