import React, { Component, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/auth';

class Header extends Component {
  constructor(props) {
    super(props);

    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.sidenavRef = React.createRef();
  }

  componentDidMount() {
    M.Sidenav.init(this.sidenavRef.current);
  }

  onLogoutClick(event) {
    event.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const navbarItems = [
      {
        name: 'Home',
        to: '/home',
      },
      {
        name: 'Log Out',
        onClick: this.onLogoutClick,
      },
    ];
    const navbarList = navbarItems.map((item, index) => (
      <li>
        <Link className="black-text" to={item.to} onClick={item.onClick}>
          {item.name}
        </Link>
      </li>
    ));
    return (
      <>
        <div className="navbar-fixed">
          <nav className="z-depth-0">
            <div className="nav-wrapper white">
              {/* Brand */}
              <Link to="/" className="col s5 brand-logo center black-text">
                <span style={{ letterSpacing: '10px' }}>SOLACE</span>
              </Link>

              <a
                href="#"
                data-target="mobile-dropdown"
                className="sidenav-trigger left"
              >
                <i className="material-icons black-text">menu</i>
              </a>

              <ul className="left hide-on-med-and-down">{navbarList}</ul>
            </div>
          </nav>
        </div>
        <ul
          className="sidenav sidenav-close"
          id="mobile-dropdown"
          ref={this.sidenavRef}
        >
          {navbarList}
        </ul>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  logoutUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
