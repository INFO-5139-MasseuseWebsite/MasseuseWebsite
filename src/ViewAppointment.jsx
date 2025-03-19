import React from 'react';
import { useAuth } from './AuthContext';
import './ViewAppointment.css';

const ViewAppointment = () => {
	const { user } = useAuth();

	return (
		<div>
			<h1>View Appointment</h1>
			{user ? (
				<div>
					<p>{user.email}</p>
				</div>
			) : (
				<p>Please log in to view your appointments</p>
			)}
		</div>
	);
};

export default ViewAppointment;
