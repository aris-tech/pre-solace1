import React, { Component } from 'react';

const currentYear = new Date().getFullYear();

class Footer extends Component {
  render() {
    return (
      <footer className="page-footer white">
        <div
          className="footer-copyright right white"
          style={{ marginRight: '10px' }}
        >
          <div className="container black-text" style={{ width: '100%' }}>
            © {currentYear} Copyright
          </div>
        </div>
      </footer>
    );
  }
}
export default Footer;
