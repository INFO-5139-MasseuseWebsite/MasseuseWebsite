import React from 'react';
import Logo from '../assets/logo/LogoCMTO.svg';
import { Link, useNavigate } from 'react-router-dom';
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
							<a href="#">chiropractic-care</a>
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
					<li>
						{currentUser ? (
							<a href="#" onClick={handleLogout} style={{ cursor: 'pointer' }}>
								Logout
							</a>
						) : (
							<Link to="/login">Login</Link>
						)}
					</li>
					{currentUser && (
						<li>
							<Link to="/view-appointment">My Appointments</Link>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
