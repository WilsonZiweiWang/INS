import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import SignOutButton from '../auth/SignOut'
import AuthUserContext from '../Firebase/Session';
import * as ROUTES from '../constants/Routes';

const NavBar = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationNonAuth = (props) => {
  // setTimeout(() => {
  //     props.history.push('/about')
  // },2000);
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
            {/* <li><NavLink to="/addPost" className="black-text">
                <i className='material-icons'>
                  add
                </i>   
              </NavLink>
          </li> */}
            {/* <li><a href="" class="tooltipped btn-floating btn-small indigo darken-4" data-tooltip="Instagram">
            <i class="fab fa-instagram"></i>
          </a></li>
          <li><a href="" class="tooltipped btn-floating btn-small blue"  data-tooltip="Twitter">
            <i class="fab fa-twitter"></i>
          </a></li>
          <li><a href="" class="tooltipped btn-floating btn-small indigo darken-4" data-tooltip="Facebook">
              <i class="fab fa-facebook"></i>
            </a></li> */}
          </ul>

          <ul className="sidenav grey lighten-2" id="mobile-menu">
            <li><NavLink to={ROUTES.HOME}>Discover</NavLink></li>
            <li><NavLink to="/services">Services</NavLink></li>
            <li><NavLink to={ROUTES.SIGN_IN} className="black-text">Sign In</NavLink></li>
            <li><NavLink to={ROUTES.SIGN_UP} className="black-text">Sign Up</NavLink></li>
            {/* <li><NavLink to="/addPost">
            New Post
          </NavLink></li> */}
          </ul>

        </div>
      </nav>
    </div>
  )
}

const NavigationAuth = (props) => {
  // setTimeout(() => {
  //     props.history.push('/about')
  // },2000);

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
            {/* <li><NavLink to="/addPost" className="black-text">
              <i className='material-icons'>
                add
              </i>   
            </NavLink>
        </li> */}
            {/* <li><a href="" class="tooltipped btn-floating btn-small indigo darken-4" data-tooltip="Instagram">
          <i class="fab fa-instagram"></i>
        </a></li>
        <li><a href="" class="tooltipped btn-floating btn-small blue"  data-tooltip="Twitter">
          <i class="fab fa-twitter"></i>
        </a></li>
        <li><a href="" class="tooltipped btn-floating btn-small indigo darken-4" data-tooltip="Facebook">
            <i class="fab fa-facebook"></i>
          </a></li> */}
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

            {/* <li><NavLink to="/addPost">
          New Post
        </NavLink></li> */}
          </ul>
          

        </div>
      </nav>
    </div>
  )
}

export default withRouter(NavBar);