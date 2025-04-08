import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import './ManageBookings.css';
import Header from './components/Header';

const ManageBookings = () => {
	const [bookings, setBookings] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	useEffect(() => {
		fetchBookings();
	}, []);

	const fetchBookings = async () => {
		try {
			const db = getFirestore();
			const bookingsRef = collection(db, 'appointments');
			const q = query(bookingsRef, where('status', 'in', ['pending', 'confirmed']));
			const querySnapshot = await getDocs(q);

			const bookingsData = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));

			setBookings(bookingsData);
			setLoading(false);
		} catch (error) {
			setError(`Failed to fetch bookings:`);
			setLoading(false);
		}
	};

	const handleStatusChange = async (bookingId, newStatus) => {
		try {
			const db = getFirestore();
			const bookingRef = doc(db, 'appointments', bookingId);
			await updateDoc(bookingRef, {
				status: newStatus,
			});

			setBookings(bookings.map((booking) => (booking.id === bookingId ? { ...booking, status: newStatus } : booking)));

			setSuccess(`Booking has been ${newStatus} successfully!`);
			setTimeout(() => setSuccess(''), 3000);
		} catch (error) {
			setError('Failed to update booking status');
			setTimeout(() => setError(''), 3000);
		}
	};

	const formatDate = (dateString) => {
		const options = {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		};
		return new Date(dateString).toLocaleDateString('en-US', options);
	};

	if (loading) {
		return (
			<div className="manage-bookings-container">
				<Header />
				<div className="loading">Loading bookings...</div>
			</div>
		);
	}

	return (
		<div>
			<Header />
			<div className="manage-bookings-container">
				<h1>Manage Bookings</h1>
				{error && <div className="error-message">{error}</div>}
				{success && <div className="success-message">{success}</div>}

				<div className="bookings-list">
					{bookings.length === 0 ? (
						<div className="no-bookings">No bookings found</div>
					) : (
						bookings.map((booking) => (
							<div key={booking.id} className="booking-card">
								<div className="booking-info">
									<h3>Appointment Details</h3>
									<p>
										<strong>Client:</strong> {booking.clientName}
									</p>
									<p>
										<strong>Date & Time:</strong> {formatDate(booking.dateTime)}
									</p>
									<p>
										<strong>Service:</strong> {booking.service}
									</p>
									<p>
										<strong>Duration:</strong> {booking.duration} minutes
									</p>
									<p>
										<strong>Status:</strong>
										<span className={`status-badge ${booking.status}`}>{booking.status}</span>
									</p>
								</div>

								<div className="booking-actions">
									{booking.status === 'pending' && (
										<>
											<button className="confirm-button" onClick={() => handleStatusChange(booking.id, 'confirmed')}>
												Confirm Booking
											</button>
											<button className="cancel-button" onClick={() => handleStatusChange(booking.id, 'cancelled')}>
												Cancel Booking
											</button>
										</>
									)}
									{booking.status === 'confirmed' && (
										<button className="cancel-button" onClick={() => handleStatusChange(booking.id, 'cancelled')}>
											Cancel Booking
										</button>
									)}
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default ManageBookings;
