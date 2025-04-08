import React, { useEffect, useState } from 'react';
import './ViewAppointment.css';
import Header from './components/Header';
import { getAuth } from 'firebase/auth';

const ViewAppointment = () => {
	const [idToken, setIdToken] = useState(null);
	const [bookings, setBookings] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const auth = getAuth();

	useEffect(() => {
		const getTokenAndFetchBookings = async () => {
			try {
				const user = auth.currentUser;
				if (!user) {
					setLoading(false);
					setError('Please sign in to view appointments');
					return;
				}

				const token = await user.getIdToken(true); // Force token refresh
				setIdToken(token);

				const response = await fetch('http://localhost/api/rmt/get-all-bookings', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				});

				if (!response.ok) {
					const errorText = await response.text();
					throw new Error(errorText || `HTTP error! status: ${response.status}`);
				}

				const data = await response.json();
				setBookings(data);
				setError(null); // Clear any previous errors
			} catch (error) {
				console.error('Error fetching bookings:', error);
				setError('Unable to load appointments. Please try again later.');
			} finally {
				setLoading(false);
			}
		};

		if (auth.currentUser) {
			getTokenAndFetchBookings();
		}
	}, [auth]);

	const formatDateTime = (booking) => {
		try {
			const { year, month, day, hour } = booking;
			const date = new Date(year, month - 1, day, hour);

			// Check if date is valid
			if (isNaN(date.getTime())) {
				throw new Error('Invalid date');
			}

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
		} catch (error) {
			console.error('Error formatting date:', error);
			return 'Invalid date';
		}
	};

	return (
		<div>
			<Header />
			<div className="view-appointment-container">
				<h1 className="view-appointment-title">Your Appointments</h1>

				{error && <p className="error-message">{error}</p>}

				{loading ? (
					<p className="loading-message">Loading appointments...</p>
				) : (
					<div className="bookings-section">
						{bookings.length > 0 ? (
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
						) : (
							<p className="no-bookings-message">No appointments found.</p>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default ViewAppointment;
