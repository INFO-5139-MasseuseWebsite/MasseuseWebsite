import React, { useState } from 'react';
import Header from './components/Header';
import './Login.css';
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { login } = useAuth();

	const loginWithEmail = async (email, password) => {
		setLoading(true);
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			console.log('User logged in:', userCredential.user);
			// Reset form
			setEmail('');
			setPassword('');
			// Set user data in AuthContext
			login(userCredential.user);
			// Navigate to ViewAppointment page
			navigate('../view-appointment');
		} catch (err) {
			handleError(err);
		} finally {
			setLoading(false);
		}
	};

	function handleError(err) {
		let message = 'An unexpected error occurred. Please try again later.';

		if (err) {
			console.log(err);

			switch (err.code) {
				case 'auth/invalid-email':
					message = 'Invalid email format.';
					break;
				case 'auth/user-disabled':
					message = 'This account has been disabled.';
					break;
				case 'auth/invalid-credential':
				case 'auth/user-not-found':
				case 'auth/wrong-password':
					message = 'Incorrect email/password. Please try again.';
					break;
				case 'auth/too-many-requests':
					message = 'Too many failed attempts. Try again later.';
					break;
				case 'auth/network-request-failed':
					message = 'Check your internet connection and try again.';
					break;
				default:
					message = 'An unexpected error occurred. Please try again.';
			}
		}

		setError(message);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		setError('');
		loginWithEmail(email, password);
	};

	return (
		<div>
			<Header />
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

					{error && <p className="error-msg">{error}</p>}
				</form>
			</div>
		</div>
	);
};

export default Login;
