import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import "./FullCalendarView.css";

const FullCalendarView = ({rmtID, date, setDate, onSubmit, onCancel}) => {
  const [available, setAvailable] = useState({});
  const [error, setError] = useState(null);

  const fetchBookings = async (year, month) => {
    try {
      const response = await fetch("/api/public/get-available-bookings", {
        method:'POST',
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          rmtID: rmtID,
          year: year,
          month: month,
        })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setAvailable(data);
    } catch (error) {
      setError("Failed to load bookings. Please try again later.");
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings(date.year, date.month);
  }, [date]);

  return (
    <div className="full-calendar-container">
      <h1>Select Your Booking Date & Time</h1>
      <Calendar
        onChange={date=>setDate({
          year:date.getFullYear(),
          month:date.getMonth(),
          day:date.getDate(),
          hour:null
        })}
        value={new Date(date.year, date.month, date.day)}
        minDate={new Date()} // Disable past dates
        // className="full-screen-calendar" // Added class to make calendar full-screen
      />
      
      <div className="bookings-container">
        {available?.available?.[date.day-1].map((v, i) => <>{v && <p onClick={()=>setDate({...date, hour: available.hourIndexOffset + i})}>{available.hourIndexOffset + i}</p>}</>)}
        {/* <h2>Bookings for {formattedDate}</h2>
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
        )} */}
      </div>
      
      <button className="back-button" onClick={onCancel}>Return to Health Form</button>
      <button onClick={onSubmit} disabled={date.hour?false:true}>Select Time</button>
    </div>
  );
};

export default FullCalendarView;
