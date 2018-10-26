import React from 'react';
// import PropTypes from 'prop-types';

const Header = props => {
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="index.js">FactCollectr</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className="nav-item nav-link active" href="index.js">Home<span className="sr-only">(current)</span></a>
          <a className="nav-item nav-link" href="index.js">Scores</a>
        </div>
      </div>
    </nav>
  )
}

// Header.propTypes = {}

export default Header;
