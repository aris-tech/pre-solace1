import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function CounselorSignupPrompt() {
  return (
    <div className="container">
      <div className="row center-align">
        <div className="col s12" style={{ marginBottom: '40px' }}>
          <h5 style={{ marginTop: '200px' }}>
            Would you like to sign up as a counselor?
          </h5>
          <p>
            If you are confident in your ability to counsel, take this as an
            opportunity to help others.
          </p>
        </div>
        <div className="col s6">
          <Link
            to="/counselor-signup"
            className="btn btn-large hoverable waves-effect waves-light blue accent-3"
          >
            Yes
          </Link>
        </div>
        <div className="col s6">
          <Link
            to="/login"
            className="btn btn-large hoverable waves-effect waves-light blue accent-3"
          >
            No
          </Link>
        </div>
      </div>
    </div>
  );
}
CounselorSignupPrompt.propTypes = {};

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(CounselorSignupPrompt);
