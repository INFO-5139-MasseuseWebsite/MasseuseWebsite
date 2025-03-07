import React, { useState } from 'react';
import './Login.css';
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const loginWithEmail = async (email, password) => {
		setLoading(true);
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			console.log('User logged in:', userCredential.user);
			// Reset form
			setEmail('');
			setPassword('');
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setError('');
		loginWithEmail(email, password);
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

				{loading ? (
					<button type="submit" disabled>
						Logging in...
					</button>
				) : (
					<button type="submit">Login</button>
				)}
			</form>
		</div>
	);
};

export default Login;
