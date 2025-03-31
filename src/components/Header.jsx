import React from 'react';
import Logo from '../assets/logo/LogoCMTO.svg';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={Logo} alt="Logo" height="50" />
      </div>
      <nav className="navbar">
        <ul>
          <li><a href="#">Home</a></li>
          <li className="dropdown">
            <a href="#explore-section">Treatments</a>
            <div className="dropdown-content">
              <a href="#">Massages</a>
              <a href="#">Deep Tissue</a>
              <a href="#">Holistic</a>
              <a href="#">Aromatherapy</a>
              <a href="#">Acupuncture</a>
              <a href="#">chiropractic-care</a>
              <a href="#">Facial Care</a>
              <a href="#">Hands / Feet</a>
            </div>
          </li>
          <li><a href="#map-section">Hours/Location</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Login</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
