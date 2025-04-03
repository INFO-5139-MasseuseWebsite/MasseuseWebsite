import React from 'react';
import Logo from '../assets/logo/LogoCMTO.svg';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header className="header">
			<div className="logo">
				<img src={Logo} alt="Logo" height="50" />
			</div>
			<nav className="navbar">
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/book-now">Find an RMT</Link>
					</li>
					<li className="dropdown">
						<a href="#explore-section">Treatments</a>
						<div className="dropdown-content">
							<a href="#">Massages</a>
							<a href="#">Deep Tissue</a>
							<a href="#">Holistic</a>
							<a href="#">Aromatherapy</a>
							<a href="#">Acupuncture</a>
							<a href="#">Chiropractic Care</a>
							<a href="#">Facial Care</a>
							<a href="#">Hands / Feet</a>
						</div>
					</li>
					<li>
						<a href="#map-section">Hours/Location</a>
					</li>
					<li>
						<a href="#">About Us</a>
					</li>

					{/* ✅ Updated New Appointment with dropdown */}
					<li className="dropdown">
						<Link to="#">New Appointment</Link>
						<div className="dropdown-content">
							<Link to="/health-history">Health History Form</Link>
							<Link to="/Calendar-Booking">Calendar</Link>
						</div>
					</li>

					<li>
						<Link to="/login">Login</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
