import React, { useState } from 'react';
import './Login.css';
import { auth } from './firebaseConfig';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		setError('');
	};

	return (
		<div className="login-container">
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="email">Email</label>
				<input
					type="text"
					placeholder="Type your email"
					value={email}
					id="email"
					name="email"
					required
					onChange={(e) => setEmail(e.target.value)}
					className="text-style"
				/>

				<label htmlFor="password">Password</label>
				<input
					type="password"
					placeholder="Type your password"
					value={password}
					id="password"
					name="password"
					required
					onChange={(e) => setPassword(e.target.value)}
					className="text-style"
				/>
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
