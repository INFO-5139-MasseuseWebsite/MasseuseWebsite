import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import "./FullCalendarView.css";

const FullCalendarView = () => {
  const [date, setDate] = useState(new Date());
  const [bookings, setBookings] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/bookings");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        setError("Failed to load bookings. Please try again later.");
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const formattedDate = format(date, "yyyy-MM-dd'T'HH:mm:ssXXX"); 
  const handleBackNavigation = () => {
    if (window.confirm("Are you sure you want to leave this page? Unsaved changes may be lost.")) {
      navigate("/booking");
    }
  };

  return (
    <div className="full-calendar-container">
      <h1>Select Your Booking Date & Time</h1>
      <Calendar
        onChange={setDate}
        value={date}
        minDate={new Date()} // Disable past dates
        className="full-screen-calendar" // Added class to make calendar full-screen
      />
      
      <div className="bookings-container">
        <h2>Bookings for {formattedDate}</h2>
        {error ? (
          <p className="error-message">{error}</p>
        ) : bookings[formattedDate] ? (
          <ul>
            {bookings[formattedDate].map((booking) => (
              <li key={booking.id || `${formattedDate}-${booking.time}`}>{booking.time} - {booking.name}</li>
            ))}
          </ul>
        ) : (
          <p>No bookings for this date.</p>
        )}
      </div>
      
      <button className="back-button" onClick={handleBackNavigation}>Back to Booking</button>
    </div>
  );
};

export default FullCalendarView;
