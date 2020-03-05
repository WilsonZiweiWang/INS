import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import SignOutButton from '../auth/SignOut'
import * as ROUTES from '../constants/Routes';

const NavBar = ({ authUser }) =>
authUser ? (
  <NavigationAuth authUser={authUser} />
) : (
  <NavigationNonAuth />
);


const NavigationNonAuth = () => {
  return (
    <div className='navbar-fixed'>
      <nav className="nav-wrapper white">
        <div className="container">
          <a href="/home" className="brand-logo black-text">LOGO</a>
          <a href="#" className="sidenav-trigger hide-on-large-only" data-target="mobile-menu">
            <i className="material-icons black-text">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li><NavLink to={ROUTES.HOME} className="black-text">Discover</NavLink></li>
            <li><NavLink to="/services" className="black-text">Services</NavLink></li>
            <li><NavLink to={ROUTES.SIGN_IN} className="black-text">Sign In</NavLink></li>
            <li><NavLink to={ROUTES.SIGN_UP} className="black-text">Sign Up</NavLink></li>
          </ul>

          <ul className="sidenav grey lighten-2" id="mobile-menu">
            <li><NavLink to={ROUTES.HOME}>Discover</NavLink></li>
            <li><NavLink to="/services">Services</NavLink></li>
            <li><NavLink to={ROUTES.SIGN_IN} className="black-text">Sign In</NavLink></li>
            <li><NavLink to={ROUTES.SIGN_UP} className="black-text">Sign Up</NavLink></li>
          </ul>

        </div>
      </nav>
    </div>
  )
}

const NavigationAuth = () => {
  return (
    <div className='navbar-fixed'>
      <nav className="nav-wrapper white">
        <div className="container">
          <a href="#" className="brand-logo black-text">LOGO</a>
          <a href="#" className="sidenav-trigger hide-on-large-only" data-target="mobile-menu-auth">
            <i className="material-icons black-text">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li><NavLink to={ROUTES.HOME} className="black-text">Home</NavLink></li>
            <li><NavLink to="/services" className="black-text">Services</NavLink></li>
            <li><SignOutButton /></li>
            <li><NavLink to={ROUTES.ACCOUNT}>
              <i className='material-icons btn-flat transparent black-text'>
                person_outline
            </i>
            </NavLink></li>
            <li><NavLink to={ROUTES.ADD_POST} className="black-text">Add Post</NavLink></li>            
          </ul>

          <ul className="sidenav grey lighten-2" id="mobile-menu-auth">
            <li><NavLink to={ROUTES.HOME} className="black-text">Home</NavLink></li>
            <li><NavLink to="/services" className="black-text">Services</NavLink></li>
            <li><SignOutButton /></li>
            <li><NavLink to={ROUTES.ACCOUNT}>
              <i className='material-icons  transparent black-text'>
                person_outline
            </i>
            </NavLink></li>
            <li><NavLink to={ROUTES.ADD_POST} className="black-text">Add Post</NavLink></li>  
          </ul>


        </div>
      </nav>
    </div>
  )
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
});

export default compose(
  connect(mapStateToProps),
  withRouter,
)(NavBar);
