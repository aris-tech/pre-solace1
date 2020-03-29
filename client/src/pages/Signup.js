import React, { Component, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { css, jsx } from '@emotion/core';

function SignupForm({
  onSubmit,
  onInputChange,
  name,
  email,
  password,
  passwordConfirm,
  errors,
}) {
  return (
    <form noValidate onSubmit={onSubmit}>
      <div className="input-field col s12">
        <input
          id="name"
          type="text"
          error={errors.name}
          value={name}
          onChange={onInputChange}
        />
        <label htmlFor="name">Name</label>
      </div>
      <div className="input-field col s12">
        <input id="email" type="email" value={email} onChange={onInputChange} />
        <label htmlFor="email">Email</label>
      </div>
      <div className="input-field col s12">
        <input
          id="password"
          type="password"
          value={password}
          onChange={onInputChange}
        />
        <label htmlFor="password">Password</label>
      </div>
      <div className="input-field col s12">
        <input
          id="passwordConfirm"
          type="password"
          value={passwordConfirm}
          onChange={onInputChange}
        />
        <label>Confirm Your Password</label>
      </div>
      <div className="col s12" style={{ paddingLeft: '12.5px' }}>
        <button
          type="submit"
          style={{
            width: '140px',
            borderRadius: '3px',
            letterSpacing: '1.5px',
          }}
          className="btn btn-large hoverable waves-effect waves-light blue accent-3"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
    };

    alert('Signed Up');
    console.log(newUser);
  }

  render() {
    const { errors } = this.state;
    errors.name = 'Name bad';

    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col s8 offset-s2">
              <Link to="/" className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Back
              </Link>
              <div
                className="col s12"
                css={css`
                  padding-left: 11.25px;
                `}
              >
                <h3>Signup</h3>
                <p className="grey-text text-darken-1">
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </div>
              <SignupForm
                onSubmit={this.onFormSubmit}
                onInputChange={this.onInputChange}
                name={this.state.name}
                email={this.state.email}
                password={this.state.password}
                passwordConfirm={this.state.passwordConfirm}
                errors={this.state.errors}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

/*
Goals: 
- Have validation done in real time
  - (1) Debounce (2) After blur (3) OnKeyDown
- Server must also do validation
- Both validation checks should interact with same error system
*/
