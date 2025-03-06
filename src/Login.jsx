import React, { useState } from 'react';
import './Login.css';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div className="login-container">
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="username">Username</label>
				<input
					type="text"
					placeholder="Type your username"
					value={username}
					id="username"
					name="username"
					required
					onChange={(e) => setUsername(e.target.value)}
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
