import React, { Component, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/auth';
import classnames from 'classnames';

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
          className={classnames({
            invalid: errors.email || errors.emailnotfound,
          })}
        />
        <label htmlFor="email">Email</label>
        <span className="red-text">
          {errors.email}
          {errors.emailnotfound}
        </span>
      </div>
      <div className="input-field col s12">
        <input
          onChange={onInputChange}
          value={password}
          error={errors.password}
          id="password"
          type="password"
          className={classnames({
            invalid: errors.password || errors.passwordincorrect,
          })}
        />
        <label htmlFor="password">Password</label>
        <span className="red-text">
          {errors.password}
          {errors.passwordincorrect}
        </span>
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

class Login extends Component {
  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  };
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

    this.props.loginUser(userData);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/home'); // Why not put this in the action(thunk) itself?
    }
  }
  // Why put logic here? Because redux maps state to props, so if we want to do something whenever redux sends props here, we would put that logic here
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/home'); // Why not put this in the action(thunk) itself?
    }
    // Merge errors from redux with the errors in this react component's state
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
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

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
