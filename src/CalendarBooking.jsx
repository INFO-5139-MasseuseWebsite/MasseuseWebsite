import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:80"; // ✅ Change this if your backend uses another port

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const timeSlots = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

const CalendarBooking = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: ""
  });
  const [bookedSlots, setBookedSlots] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchBooked = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/public/get-booked-dates`);
        const data = res?.data;
        if (Array.isArray(data)) {
          setBookedSlots(data);
        }
      } catch (err) {
        console.error("Error fetching booked dates", err);
        setFetchError("Could not load booked slots.");
      }
    };
    fetchBooked();
  }, []);

  const formatDate = (dateObj) => {
    return dateObj
      ? `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")}`
      : "";
  };

  const changeMonth = (offset) => {
    const newMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
    setCurrentDate(newMonth);
  };

  const isDayDisabled = (day) => {
    const dateStr = formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    return timeSlots.every(time => bookedSlots.includes(`${dateStr} ${time}`));
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      setStatusMessage("Please select a date and time.");
      return;
    }

    const dateStr = formatDate(selectedDate);
    const dateTimeStr = `${dateStr} ${selectedTime}`;

    if (bookedSlots.includes(dateTimeStr)) {
      setStatusMessage("That time slot is already booked.");
      return;
    }

    try {
      await axios.post(`${API_BASE}/api/public/add-booking`, {
        rmtID: "debug",
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
        day: selectedDate.getDate(),
        hour: parseInt(selectedTime.split(":")[0]),
        form
      });

      setBookedSlots(prev => [...prev, dateTimeStr]);
      setStatusMessage("✅ Booking confirmed!");
      setSelectedTime("");
    } catch (err) {
      console.error("Booking failed", err);
      setStatusMessage("❌ Booking failed. Please try again.");
    }
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const blanks = Array.from({ length: firstDay }, (_, i) => (
      <div key={`b${i}`} className="day blank" />
    ));

    const days = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const thisDate = new Date(year, month, day);
      const disabled = isDayDisabled(day);
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year;

      return (
        <div
          key={day}
          className={`day ${isSelected ? "selected" : ""} ${disabled ? "disabled" : ""}`}
          onClick={() => !disabled && setSelectedDate(thisDate)}
        >
          {day}
        </div>
      );
    });

    return [...blanks, ...days];
  };

  const renderTimeDropdown = () => {
    if (!selectedDate) return null;

    const dateStr = formatDate(selectedDate);
    return (
      <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
        <option value="">-- Select Time --</option>
        {timeSlots.map((time) => {
          const fullSlot = `${dateStr} ${time}`;
          const isTaken = bookedSlots.includes(fullSlot);
          return (
            <option key={time} value={time} disabled={isTaken}>
              {time} {isTaken ? " (Booked)" : ""}
            </option>
          );
        })}
      </select>
    );
  };

  return (
    <div className="calendar-wrapper">
      <aside className="calendar-left">
        <div className="date-large">
          <div className="number">{selectedDate ? selectedDate.getDate() : "--"}</div>
          <div className="weekday">
            {selectedDate ? selectedDate.toLocaleDateString("en-US", { weekday: "long" }) : "No date selected"}
          </div>
        </div>

        <div className="booking-form">
          <h4>Book Appointment</h4>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
          />

          {renderTimeDropdown()}

          <button onClick={handleBooking}>Book Now</button>
          {statusMessage && <p className="booking-status">{statusMessage}</p>}
        </div>
      </aside>

      <main className="calendar-main">
        <div className="calendar-header">
          <button onClick={() => changeMonth(-1)}>&lt;</button>
          <div className="month-year">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </div>
          <button onClick={() => changeMonth(1)}>&gt;</button>
        </div>

        <div className="weekdays">
          {weekdays.map((day) => (
            <div key={day} className="weekday-label">{day}</div>
          ))}
        </div>

        <div className="calendar-grid">
          {renderCalendar()}
        </div>
      </main>
    </div>
  );
};

export default CalendarBooking;
