import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "./CalendarBooking.css";

// Mock booked dates
const bookedDates = [
  { date: "2025-04-05", time: "10:00 AM" },
  { date: "2025-04-07", time: "2:00 PM" }
];

export default function CalendarBooking() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [userBookings, setUserBookings] = useState(bookedDates);

  const isDateBooked = (date) => {
    const formatted = date.toISOString().split("T")[0];
    return userBookings.some((b) => b.date === formatted);
  };

  return (
    <div className="calendar-booking">
      <h2>Select Appointment Date</h2>

      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        inline
        filterDate={(date) => !isDateBooked(date)}
      />

      <h3>Your Booked Slots</h3>
      <ul className="booking-list">
        {userBookings.map((b, i) => (
          <li key={i}>
            {b.date} at {b.time}
          </li>
        ))}
      </ul>
    </div>
  );
}
