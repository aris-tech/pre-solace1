import React from 'react';
import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <>
      <h1>This is the welcome page</h1>
      <Link
        to="/login"
        style={{ width: '140px', borderRadius: '3px', letterSpacing: '1.5px' }}
        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
      >
        Login
      </Link>
      <Link to="/signup">
        <button type="button">Signup</button>
      </Link>
    </>
  );
}
