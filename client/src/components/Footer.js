import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="page-footer white">
        <div
          class="footer-copyright right white"
          style={{ marginRight: '10px' }}
        >
          <div class="container black-text" style={{ width: '100%' }}>
            © 2020 Copyright
          </div>
        </div>
      </footer>
    );
  }
}
export default Footer;
