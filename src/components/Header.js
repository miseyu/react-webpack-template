import React from 'react';
import Logo from '../images/logo.svg';

class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="header-inner">
          <h1>
            <img src={Logo} />
          </h1>
        </div>
      </header>
    );
  }
}

Header.defaultProps = {
};

export default Header;
