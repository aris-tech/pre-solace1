import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signupUser } from '../actions/auth';
import classnames from 'classnames';
import M from 'materialize-css';

function SignupForm({
  onSubmit,
  onInputChange,
  firstName,
  lastName,
  email,
  password,
  passwordConfirm,
  errors,
}) {
  return (
    <form noValidate onSubmit={onSubmit}>
      <div className="input-field col s12">
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={onInputChange}
          className={classnames({ invalid: errors.firstName })}
        />
        <label htmlFor="firstName">First Name</label>
        <span className="red-text">{errors.firstName}</span>
      </div>
      <div className="input-field col s12">
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={onInputChange}
          className={classnames({ invalid: errors.lastName })}
        />
        <label htmlFor="lastName">Last Name (optional)</label>
        <span className="red-text">{errors.lastName}</span>
      </div>
      <div className="input-field col s12">
        <input
          id="email"
          type="email"
          value={email}
          onChange={onInputChange}
          className={classnames({ invalid: errors.email })}
        />
        <label htmlFor="email">Email</label>
        <span className="red-text">{errors.email}</span>
      </div>
      <div className="input-field col s12">
        <input
          id="password"
          type="password"
          value={password}
          onChange={onInputChange}
          className={classnames({ invalid: errors.password })}
        />
        <label htmlFor="password">Password</label>
        <span className="red-text">{errors.password}</span>
      </div>
      <div className="input-field col s12">
        <input
          id="passwordConfirm"
          type="password"
          value={passwordConfirm}
          onChange={onInputChange}
        />
        <label>Confirm Your Password</label>
        <span className="red-text">{errors.passwordConfirm}</span>
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

class Signup extends Component {
  static propTypes = {
    signupUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
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
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
    };

    this.props.signupUser(newUser, this.props.history, () =>
      M.toast({ html: 'Successfully created account.' }),
    );
  }

  componentWillReceiveProps(nextProps) {
    // Mix redux errors with component state errors
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col s8 offset-s2">
              <Link to="/" className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Back
              </Link>
              <div className="col s12">
                <h3>Signup</h3>
                <p className="grey-text text-darken-1">
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </div>
              <SignupForm
                onSubmit={this.onFormSubmit}
                onInputChange={this.onInputChange}
                firstName={this.state.firstName}
                lastName={this.state.lastName}
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

// Maps store state to props
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

const mapDispatchToProps = {
  signupUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

/*
Goals: 
- Have validation done in real time
  - (1) Debounce (2) After blur (3) OnKeyDown
- Server must also do validation
- Both validation checks should interact with same error system
*/
