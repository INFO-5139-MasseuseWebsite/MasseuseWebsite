import React, { useEffect, useState } from 'react';
import './ViewAppointment.css';
import { getAuth } from 'firebase/auth';

const ViewAppointment = () => {
	const [idToken, setIdToken] = useState(null);
	const [bookings, setBookings] = useState([]);
	const [error, setError] = useState(null);
	const auth = getAuth();

	useEffect(() => {
		const getTokenAndFetchBookings = async () => {
			try {
				const user = auth.currentUser;
				if (user) {
					const token = await user.getIdToken();
					setIdToken(token);
					console.log('ID Token:', token);

					const response = await fetch('http://localhost/api/rmt/get-all-bookings', {
						method: 'POST',
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-Type': 'application/json',
						},
					});

					if (!response.ok) {
						throw new Error(`Failed to fetch bookings: ${response.statusText}`);
					}

					const data = await response.json();
					setBookings(data);
					console.log('Bookings:', data);
				} else {
					console.log('No user is signed in');
					setError('Please sign in to view appointments');
				}
			} catch (error) {
				console.error('Error in getTokenAndFetchBookings:', error);
				setError(error.message);
			}
		};

		getTokenAndFetchBookings();
	}, [auth]);

	return (
		<div>
			<h1>View Appointment</h1>
			{error ? (
				<p style={{ color: 'red' }}>{error}</p>
			) : idToken ? (
				<>
					<p>ID Token: {idToken}</p>
					{bookings.length > 0 ? (
						<ul>
							{bookings.map((booking, index) => (
								<li key={index}>
									{booking.date || 'No date'} - {booking.time || 'No time'}
								</li>
							))}
						</ul>
					) : (
						<p>No bookings found</p>
					)}
				</>
			) : (
				<p>Loading token or no user signed in...</p>
			)}
		</div>
	);
};

export default ViewAppointment;
