import React, { useState } from 'react';
import './CreateRMTAccount.css';
import Header from './components/Header';

const CreateRMTAccount = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
		phoneNumber: '',
		registrationNumber: '',
		specialization: '',
		bio: '',
	});

	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setSuccess('');

		if (formData.password !== formData.confirmPassword) {
			setError('Passwords do not match');
			return;
		}
	};

	return (
		<div>
			<Header />
			<div className="create-rmt-container">
				<h2>Create New RMT Account</h2>
				{error && <div className="error-message">{error}</div>}
				{success && <div className="success-message">{success}</div>}

				<form onSubmit={handleSubmit} className="create-rmt-form">
					<div className="form-group">
						<label htmlFor="firstName">First Name</label>
						<input
							type="text"
							id="firstName"
							name="firstName"
							value={formData.firstName}
							onChange={handleChange}
							placeholder="Enter RMT's first name"
							required
						/>
					</div>

					<div className="form-group">
						<label htmlFor="lastName">Last Name</label>
						<input
							type="text"
							id="lastName"
							name="lastName"
							value={formData.lastName}
							onChange={handleChange}
							placeholder="Enter RMT's last name"
							required
						/>
					</div>

					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							placeholder="Enter RMT's email address"
							required
						/>
					</div>

					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							placeholder="Create a secure password"
							required
						/>
					</div>

					<div className="form-group">
						<label htmlFor="confirmPassword">Confirm Password</label>
						<input
							type="password"
							id="confirmPassword"
							name="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleChange}
							placeholder="Re-enter the password"
							required
						/>
					</div>

					<div className="form-group">
						<label htmlFor="phoneNumber">Phone Number</label>
						<input
							type="tel"
							id="phoneNumber"
							name="phoneNumber"
							value={formData.phoneNumber}
							onChange={handleChange}
							placeholder="Enter RMT's phone number"
							required
						/>
					</div>

					<div className="form-group">
						<label htmlFor="registrationNumber">Registration Number</label>
						<input
							type="text"
							id="registrationNumber"
							name="registrationNumber"
							value={formData.registrationNumber}
							onChange={handleChange}
							placeholder="Enter RMT's registration number"
							required
						/>
					</div>

					<div className="form-group">
						<label htmlFor="specialization">Specialization</label>
						<input
							type="text"
							id="specialization"
							name="specialization"
							value={formData.specialization}
							onChange={handleChange}
							placeholder="Enter RMT's areas of specialization"
							required
						/>
					</div>

					<div className="form-group">
						<label htmlFor="bio">Bio</label>
						<textarea
							id="bio"
							name="bio"
							value={formData.bio}
							onChange={handleChange}
							placeholder="Enter a brief professional bio about the RMT"
							required
						/>
					</div>

					<button type="submit" className="submit-button">
						Create RMT Account
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateRMTAccount;
