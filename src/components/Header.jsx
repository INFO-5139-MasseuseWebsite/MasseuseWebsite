import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from '../assets/logo/LogoCMTO.svg';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getAuth, signOut } from 'firebase/auth';

const Header = () => {
	const { currentUser } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const handleLogout = async () => {
		try {
			const auth = getAuth();
			await signOut(auth);
			navigate('/');
		} catch (error) {
			console.error('Error logging out:', error);
		}
	};

	const handleSectionClick = (sectionId) => {
		if (location.pathname !== '/') {
			navigate('/');
			// Wait for the navigation to complete before scrolling
			setTimeout(() => {
				const element = document.getElementById(sectionId);
				if (element) {
					element.scrollIntoView({ behavior: 'smooth' });
				}
			}, 100);
		} else {
			const element = document.getElementById(sectionId);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		}
	};

	const [isOpen, setIsOpen] = useState(false);
	const toggleMenu = () => setIsOpen(!isOpen);
	const navigate = useNavigate();
	const location = useLocation();

	const handleAnchorClick = (sectionId, e) => {
		e.preventDefault();
		setIsOpen(false);

		if (location.pathname !== '/') {
			navigate('/', { state: { scrollTo: sectionId } });
		} else {
			scrollToSection(sectionId);
		}
	};

	const scrollToSection = (sectionId) => {
		const section = document.getElementById(sectionId);
		if (section) {
			section.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}
	};

	useEffect(() => {
		if (location.pathname === '/' && location.state?.scrollTo) {
			const sectionId = location.state.scrollTo;

			const tryScroll = () => {
				const section = document.getElementById(sectionId);
				if (section) {
					section.scrollIntoView({ behavior: 'smooth', block: 'start' });
					navigate('.', { state: {}, replace: true });
				} else {
					requestAnimationFrame(tryScroll);
				}
			};

			tryScroll();
		}
	}, [location, navigate]);

	return (
		<header className="header">
			<div className="logo">
				<img src={Logo} alt="Logo" height="50" />
			</div>
			<div className="hamburguer" onClick={toggleMenu}>
				{isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
			</div>

			<nav className={`navbar ${isOpen ? 'active' : ''}`}>
				<ul>
					<li>
						<Link to="/" onClick={toggleMenu}>
							Home
						</Link>
					</li>
					<li>
						<Link to="/book-now" onClick={toggleMenu}>
							Find an RMT
						</Link>
					</li>
					<li>
						<Link to="/health-history" onClick={toggleMenu}>
							Complete the Form
						</Link>
					</li>
					<li>
						<Link
]
							to="/#explore-section"
							onClick={(e) => handleAnchorClick('explore-section', e)}
						>
							Treatments
						</Link>
					</li>
					<li>
						<Link
							to="/#map-section"
							onClick={(e) => handleAnchorClick('map-section', e)}
						>
							Hours/Location
						</Link>
					</li>
					<li>
						<Link to="/about">About Us</Link>
					</li>
					{currentUser && (
						<li className="dropdown">
							<Link to="#" style={{ cursor: 'pointer' }}>
								My Appointments
							</Link>
							<div className="dropdown-content">
								<Link to="/view-appointment">View Appointments</Link>
								<Link to="/manage-bookings">Manage Appointments</Link>
							</div>
						</li>
					)}
					<li>
						{currentUser ? (
							<Link to="#" onClick={handleLogout} style={{ cursor: 'pointer' }}>
								Logout
							</Link>
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
