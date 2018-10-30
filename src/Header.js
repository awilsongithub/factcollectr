import React from 'react';
import { NavLink } from 'react-router-dom';
// import PropTypes from 'prop-types';

const Header = props => {
  return (
    <nav className="navbar fixed-top navbar-expand-sm navbar-dark bg-dark">
      <div className='container'>

        {/* LOGO HOME LINK */}
        <NavLink className="navbar-brand" exact to="/">FactCollectr</NavLink>

        {/* HAMBURGER MENU  */}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* COLLAPSIBLE NAV LINKS  */}
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">

            <NavLink className="nav-item nav-link" exact to="/">Home</NavLink>

            <NavLink className="nav-item nav-link" to="/hall">Hall of Fame</NavLink>
          </div>

        </div>
      </div>
    </nav>
  )
}

// Header.propTypes = {}

export default Header;
