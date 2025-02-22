import React from 'react';
import markerIcon from '../assets/location/marker.svg';
import phoneIcon from '../assets/location/phone.svg';
import timeIcon from '../assets/location/time.svg';
import Logo from '../assets/logo/LogoCMTO.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-icons">
          <div className="icon">
            <img src={markerIcon} alt="Location Icon" className="footer-icon" />
            <p>1867 Yonge St #810, Toronto, ON M4S 1Y5</p>
          </div>
          <div className="icon">
            <img src={phoneIcon} alt="Phone Icon" className="footer-icon" />
            <p>(416) 489-2626</p>
          </div>
          <div className="icon">
            <img src={timeIcon} alt="Hours Icon" className="footer-icon" />
            <p>
              Mon - Fri: 9am - 4pm for Online Service. <br /> Tuesday & Thursday: 9am - 1pm for In Person
            </p>
          </div>
        </div>
        <div className="footer-logo">
          <img src={Logo} alt="Logo" height="50" />
        </div>
      </div>
      <div className="copyright">
        <p>&copy; 2025 CMTO. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
