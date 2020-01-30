import React from 'react';
import {Link, NavLink, withRouter} from 'react-router-dom';


const NavBar = (props) => {
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
          <li><a href="#photos" className="black-text">Photos</a></li>
          <li><a href="#services" className="black-text">Explore</a></li>
          <li><a href="#contact" className="black-text">Contact</a></li>
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
          <li><a href="#photos">Photos</a></li>
          <li><a href="#services">Explore</a></li>
          <li><a href="#contact">Contacts</a></li>
        </ul>
      </div>
    </nav>
    )
}

export default withRouter(NavBar);