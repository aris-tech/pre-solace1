import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className="navbar-fixed">
      <nav className="z-depth-0">
        <div className="nav-wrapper white">
          <Link
            to="/"
            className="col s5 brand-logo center black-text"
            style={{
              fontFamily: 'monospace',
            }}
          >
            <i className="material-icons">favorite</i>
            <span>SOLACE</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
