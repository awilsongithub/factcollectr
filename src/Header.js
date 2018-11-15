import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
// import PropTypes from 'prop-types';


/**
 * THIS COMPONENT IS BASICALLY A RESPONSIVE BOOTSTRAP NAVBAR
 * WITH REACT ROUTER NAVLINKS
 * AND SOME CONDITIONAL RENDERING OF LOGIN/LOGOUT LINKS
 */
const Header = props => {

  return (
    <nav className="navbar fixed-top navbar-expand-sm navbar-dark">
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

            { props.user ?
              <div className='nav-right'>
                <span className='user-profile d-none d-sm-inline'>
                  <img src={props.user.photoURL} />
                  <span className='text-white d-sm-none d-md-inline'>{props.user.displayName}</span>
                </span>
                <a onClick={props.logout} className='nav-link-auth nav-item nav-link'>Log Out</a>
              </div>
              :
              <a onClick={props.login} className='nav-link-auth nav-item nav-link'>Log In</a>
            }

          </div>

        </div>
      </div>
    </nav>
  )
}

Header.propTypes = {
  // user: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
}

export default Header;
