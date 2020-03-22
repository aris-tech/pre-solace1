import React from 'react';
import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <>
      <h1>This is the welcome page</h1>
      <Link to='/login'>
        <button type='button'>
          Login
        </button>      
      </Link>
      <Link to='/signup'>
        <button type='button'>
          Signup
        </button>
      </Link>
    </>
  );
}