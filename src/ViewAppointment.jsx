import React, { useEffect, useState } from 'react';
import './ViewAppointment.css';
import Header from './components/Header';
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
				console.log('User', user);
				if (user) {
					const token = await user.getIdToken();
					setIdToken(token);
					console.log('ID Token:', token);

					const response = await fetch('http://localhost/api/rmt/get-all-bookings', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
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

	const formatDateTime = (booking) => {
		const { year, month, day, hour } = booking;
		const date = new Date(year, month - 1, day, hour); // month is 0-indexed in JS
		const dateStr = date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
		const timeStr = date.toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: '2-digit',
			hour12: true,
		});
		return `${dateStr} at ${timeStr}`;
	};

	return (
		<div>
			<Header />
			<div className="view-appointment-container">
				<h1 className="view-appointment-title">Your Appointments</h1>

				{error && <p className="error-message">{error}</p>}

				{idToken ? (
					<div className="bookings-section">
						<table className="bookings-table">
							<thead>
								<tr>
									<th>Name</th>
									<th>Date & Time</th>
									<th>Email</th>
									<th>Phone</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>
								{bookings.map((booking, index) => (
									<tr key={booking.bookingID || index}>
										<td>{`${booking.form.firstName} ${booking.form.lastName}`}</td>
										<td>{formatDateTime(booking)}</td>
										<td>{booking.form.email}</td>
										<td>{booking.form.phoneNumber}</td>
										<td>
											<span
												className={`status-badge ${
													booking.canceled
														? 'status-canceled'
														: booking.confirmed
														? 'status-confirmed'
														: 'status-pending'
												}`}
											>
												{booking.canceled ? 'Canceled' : booking.confirmed ? 'Confirmed' : 'Pending'}
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<p className="loading-message">Loading appointments...</p>
				)}
			</div>
		</div>
	);
};

export default ViewAppointment;
