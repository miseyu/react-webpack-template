import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="footer-inner">
          <div className="footer-copy">&copy; HogeFuga Inc.</div>
          <div className="footer-link">
          </div>
        </div>
      </footer>
    );
  }
}

Footer.defaultProps = {
};

export default Footer;
