import React from 'react';
import {Link, NavLink, withRouter} from 'react-router-dom';
import SignOut from '../auth/SignOut'

const NavBar = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);

const NavigationNonAuth = (props) => {
    // setTimeout(() => {
    //     props.history.push('/about')
    // },2000);
    return (
        <nav className="nav-wrapper transparent">
      <div className="container">
        <a href="#" className="brand-logo black-text">LOGO</a>
        <a href="#" className="sidenav-trigger hide-on-large-only" data-target="mobile-menu">
          <i className="material-icons black-text">menu</i>
        </a>
        <ul className="right hide-on-med-and-down">
          <li><NavLink to="/home" className="black-text">Home</NavLink></li>
          <li><NavLink to="/services" className="black-text">Services</NavLink></li>
          <li><NavLink to="/signIn" className="black-text">Sign In</NavLink></li>
          <li><NavLink to="/signUp" className="black-text">Sign Up</NavLink></li>
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
          <li><NavLink to="/home">Home</NavLink></li>
          <li><NavLink to="/services">Services</NavLink></li>
          <li><NavLink to="/signIn" className="black-text">Sign In</NavLink></li>
          <li><NavLink to="/signUp" className="black-text">Sign Up</NavLink></li>
          {/* <li><NavLink to="/addPost">
            New Post
          </NavLink></li> */}
        </ul>
      </div>
    </nav>
    )
}

const NavigationAuth = (props) => {
  // setTimeout(() => {
  //     props.history.push('/about')
  // },2000);
  return (
      <nav className="nav-wrapper transparent">
    <div className="container">
      <a href="#" className="brand-logo black-text">LOGO</a>
      <a href="#" className="sidenav-trigger hide-on-large-only" data-target="mobile-menu">
        <i className="material-icons black-text">menu</i>
      </a>
      <ul className="right hide-on-med-and-down">
        <li><NavLink to="/home" className="black-text">Home</NavLink></li>
        <li><NavLink to="/services" className="black-text">Services</NavLink></li>
        <li><SignOut/></li>
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
        <li><NavLink to="/home">Home</NavLink></li>
        <li><NavLink to="/services">Services</NavLink></li>
        <li><SignOut/></li>
        {/* <li><NavLink to="/addPost">
          New Post
        </NavLink></li> */}
      </ul>
    </div>
  </nav>
  )
}

export default withRouter(NavBar);