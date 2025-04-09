import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from '../assets/logo/LogoCMTO.svg';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getAuth, signOut } from 'firebase/auth';

const Header = () => {
	const { currentUser } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			const auth = getAuth();
			await signOut(auth);
			navigate('/');
		} catch (error) {
			console.error('Error logging out:', error);
		}
	};

	const [isOpen, setIsOpen] = useState(false);
	const toggleMenu = () => setIsOpen(!isOpen);

	return (
		<header className="header">
			<div className="logo">
				<img src={Logo} alt="Logo" height="50" />
			</div>
			<div className='hamburguer' onClick={toggleMenu}>
				{isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
			</div>

			<nav className={`navbar ${isOpen ? "active" : ""}`}>
				<ul>
					<li>
						<Link to="/" onClick={toggleMenu}>Home</Link>
					</li>
					<li>
						<Link to="/book-now" onClick={toggleMenu}>Find an RMT</Link>
					</li>
					<li>
						<Link to="/health-history" onClick={toggleMenu}>Complete the Form</Link>
					</li>
					<li>
						<a href="#explore-section" onClick={toggleMenu}>Treatments</a>
					</li>
					<li>
						<a href="#map-section" onClick={toggleMenu}>Hours/Location</a>
					</li>
					<li>
						<a href="#" onClick={toggleMenu}>About Us</a>
					</li>
					{currentUser && (
						<li className="dropdown">
							<a href="#" style={{ cursor: 'pointer' }}>
								My Appointments
							</a>
							<div className="dropdown-content">
								<Link to="/view-appointment">View Appointments</Link>
								<Link to="/manage-bookings">Manage Appointments</Link>
							</div>
						</li>
					)}
					<li>
						{currentUser ? (
							<a href="#" onClick={handleLogout} style={{ cursor: 'pointer' }}>
								Logout
							</a>
						) : (
							<Link to="/login">Login</Link>
						)}
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
