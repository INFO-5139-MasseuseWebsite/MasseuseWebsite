import React, { useState, useEffect } from 'react';
import './ManageBookings.css';
import Header from './components/Header';
import { getAuth } from 'firebase/auth';

const ManageBookings = () => {
	const [bookings, setBookings] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [idToken, setIdToken] = useState(null);
	const auth = getAuth();

	useEffect(() => {
		fetchBookings();
	}, []);

	const fetchBookings = async () => {
		try {
			const user = auth.currentUser;
			const token = await user.getIdToken(true);
			setIdToken(token);

			const response = await fetch('http://localhost/api/rmt/get-all-bookings', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
			});

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(errorText || 'Failed to fetch bookings');
			}

			const data = await response.json();
			const pendingBookings = data.filter((booking) => booking.confirmed === false && booking.canceled === false);
			setBookings(pendingBookings);
			setError(null);
		} catch (err) {
			console.error('Error fetching bookings:', err);
			setError('Unable to load appointments. Please try again later.');
		} finally {
			setLoading(false);
		}
	};

	const handleStatusChange = async (bookingId, newStatus) => {
		try {
			const endpoint =
				newStatus === 'confirmed'
					? 'http://localhost/api/rmt/confirm-booking'
					: 'http://localhost/api/rmt/cancel-booking';

			const response = await fetch(endpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${idToken}`
				},
				body: JSON.stringify({ bookingID: bookingId }),
			});

			if (!response.ok) {
				throw new Error('Failed to update booking status');
			}

			// Update local state
			setBookings(bookings.filter((booking) => booking.bookingID !== bookingId));

			setSuccess(`Booking has been ${newStatus} successfully!`);
			setTimeout(() => setSuccess(''), 3000);
		} catch (err) {
			console.error('Error updating booking:', err);
			setError('Failed to update booking status');
			setTimeout(() => setError(''), 3000);
		}
	};

	const formatDateTime = (booking) => {
		try {
			const { year, month, day, hour } = booking;
			const date = new Date(year, month - 1, day, hour);

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
		} catch (err) {
			console.error('Error formatting date:', err);
			return 'Invalid date';
		}
	};

	return (
		<>
			<Header />
			<div className="manage-bookings-container">
				<h1>Manage Bookings</h1>
				{error && <div className="error-message">{error}</div>}
				{success && <div className="success-message">{success}</div>}

				{loading ? (
					<div className="loading">Loading appointments...</div>
				) : (
					<div className="bookings-list">
						{bookings.length > 0 ? (
							bookings.map((booking, index) => (
								<div key={booking.bookingID || index} className="booking-card">
									<div className="booking-info">
										<h3>Appointment Details</h3>
										<p>
											<strong>Client:</strong> {booking.form.firstName} {booking.form.lastName}
										</p>
										<p>
											<strong>Date & Time:</strong> {formatDateTime(booking)}
										</p>
										<p>
											<strong>Email:</strong> {booking.form.email}
										</p>
										<p>
											<strong>Phone:</strong> {booking.form.phoneNumber}
										</p>
										<p>
											<strong>Status:</strong>
											<span className="status-badge pending">Pending</span>
										</p>
									</div>

									<div className="booking-actions">
										<button
											className="confirm-button"
											onClick={() => handleStatusChange(booking.bookingID, 'confirmed')}
										>
											Confirm
										</button>
										<button
											className="cancel-button"
											onClick={() => handleStatusChange(booking.bookingID, 'cancelled')}
										>
											Cancel
										</button>
									</div>
								</div>
							))
						) : (
							<div className="no-bookings">No pending appointments found</div>
						)}
					</div>
				)}
			</div>
		</>
	);
};

export default ManageBookings;
