import React, { useEffect } from 'react';
import Logo from '../assets/logo/LogoCMTO.svg';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const handleAnchorClick = (sectionId, e) => {
		e.preventDefault();

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
				block: 'start'
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
			<nav className="navbar">
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/book-now">Find an RMT</Link>
					</li>
					<li className="dropdown">
						<Link
							to="/#explore-section"
							onClick={(e) => handleAnchorClick('explore-section', e)}
						>
							Treatments
						</Link>
						<div className="dropdown-content">
							{['Massages', 'Deep Tissue', 'Holistic', 'Aromatherapy', 'Acupuncture',
								'Chiropractic Care', 'Facial Care', 'Hands/Feet'].map((treatment) => (
									<Link
										key={treatment}
										to="/#explore-section"
										onClick={(e) => handleAnchorClick('explore-section', e)}
									>
										{treatment}
									</Link>
								))}
						</div>
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
					<li>
						<Link to="/login">Login</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
