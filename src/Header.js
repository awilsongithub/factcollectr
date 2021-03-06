import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// import PropTypes from 'prop-types';

/**
 * THIS COMPONENT IS BASICALLY A RESPONSIVE BOOTSTRAP NAVBAR
 * WITH REACT ROUTER NAVLINKS
 * AND SOME CONDITIONAL RENDERING OF LOGIN/LOGOUT LINKS
 */
const Header = (props) => {
    const getFirstName = (fullName) => {
        let end = fullName.indexOf(" ");
        let firstName = fullName.substring(0, end);
        return firstName;
    };

    return (
        <nav className='navbar fixed-top navbar-expand-lg navbar-dark'>
            <div className='container'>
                {/* LOGO HOME LINK */}
                <NavLink className='navbar-brand' exact to='/'>
                    Tough Questions
                </NavLink>

                {/* HAMBURGER MENU  */}
                <button
                    className='navbar-toggler'
                    type='button'
                    data-toggle='collapse'
                    data-target='#navbarNavAltMarkup'
                    aria-controls='navbarNavAltMarkup'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon' />
                </button>

                {/* COLLAPSIBLE NAV LINKS  */}
                <div
                    className='collapse navbar-collapse justify-content-between'
                    id='navbarNavAltMarkup'
                >
                    <div className='navbar-nav'>
                        {/* MENU SELECTIONS CLOSE MENU */}
                        <span
                            data-toggle='collapse'
                            data-target='#navbarNavAltMarkup'
                            aria-controls='navbarNavAltMarkup'
                            aria-expanded='false'
                        >
                            <NavLink className='nav-item nav-link' exact to='/'>
                                Home
                            </NavLink>
                        </span>

                        <span
                            data-toggle='collapse'
                            data-target='#navbarNavAltMarkup'
                            aria-controls='navbarNavAltMarkup'
                            aria-expanded='false'
                        >
                            <NavLink className='nav-item nav-link' to='/hall'>
                                Detailed Scores
                            </NavLink>
                        </span>
                    </div>
                    <div
                        className='navbar-nav'
                        data-toggle='collapse'
                        data-target='#navbarNavAltMarkup'
                        aria-controls='navbarNavAltMarkup'
                        aria-expanded='false'
                    >
                        {props.user ? (
                            <div>
                                <span className='user-profile d-none d-sm-inline'>
                                    <img src={props.user.photoURL} alt='' />
                                    <span className='text-white d-sm-none d-md-inline'>
                                        {getFirstName(props.user.displayName)}
                                    </span>
                                </span>
                                <span
                                    onClick={props.logout}
                                    className='nav-link-auth nav-item nav-link'
                                >
                                    Log Out
                                </span>
                            </div>
                        ) : (
                            <span
                                onClick={props.login}
                                className='nav-link-auth nav-item nav-link'
                            >
                                Log In
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

Header.propTypes = {
    // user: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
};

export default Header;
