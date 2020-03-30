import React, { Component } from 'react';
import { connect } from 'react-redux';

// todo: Should I make this /profile, or /user?id={id}
// If so, then the profile name has to be based off an api request I make
class Profile extends Component {
  render() {
    const profileName = this.props.auth.user.name;
    return (
      <div className="container">
        <div className="row" style={{ minHeight: '100vh' }}>
          <div className="col s12">
            <div className="section">
              <h4>{profileName}</h4>
            </div>
            <div className="divider"></div>
            <div className="section" style={{ paddingBottom: '0' }}>
              <h6>Background</h6>
              <p>
                This is my background and this is some text. This is my
                background and this is some text. This is my background and this
                is some text.
              </p>
            </div>
            <div className="section" style={{ paddingTop: '0' }}>
              <h6 style={{ marginBottom: '12px' }}>Worries</h6>
              <div className="chip">
                Jealousy
                <i className="close material-icons">close</i>
              </div>
              <div className="chip">
                Eating Disorder
                <i className="close material-icons">close</i>
              </div>
              <div className="chip">
                Ex-Girlfriend
                <i className="close material-icons">close</i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Profile);
