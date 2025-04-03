
import React from 'react';
import CalendarSection from '../CalendarBooking';
import HealthHistoryForm from '../HealthHistory';
import '../CalendarBooking.css';
import '../HealthHistory.css';

const NewAppointment = () => {
  return (
    <div className="booking-layout">
      <div className="booking-container">
        {/* Calendar Section */}
        <CalendarSection />
      </div>

      {/* Health History Form */}
      <div className="booking-container">
        <HealthHistoryForm />
      </div>
    </div>
  );
};

export default NewAppointment;
