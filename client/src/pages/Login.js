import React, { Component, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

function LoginForm({ onSubmit, onInputChange, email, password, errors }) {
  return (
    <form noValidate onSubmit={onSubmit}>
      <div className="input-field col s12">
        <input
          onChange={onInputChange}
          value={email}
          error={errors.email}
          id="email"
          type="email"
        />
        <label htmlFor="email">Email</label>
      </div>
      <div className="input-field col s12">
        <input
          onChange={onInputChange}
          value={password}
          error={errors.password}
          id="password"
          type="password"
        />
        <label htmlFor="password">Password</label>
      </div>
      <div className="col s12" style={{ paddingLeft: '11.25px' }}>
        <button
          style={{
            width: '150px',
            borderRadius: '3px',
            letterSpacing: '1.5px',
            marginTop: '1rem',
          }}
          type="submit"
          className="btn btn-large waves-effect waves-light hoverable blue accent-3"
        >
          Login
        </button>
      </div>
    </form>
  );
}

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {},
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    alert('Logged In');
    console.log(userData);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back
            </Link>
            <div className="col s12" style={{ paddingLeft: '11.25px' }}>
              <h3>Login</h3>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </p>
            </div>
            <LoginForm
              onSubmit={this.onFormSubmit}
              onInputChange={this.onInputChange}
              email={this.state.email}
              password={this.state.password}
              errors={this.state.errors}
            />
          </div>
        </div>
      </div>
    );
  }
}
