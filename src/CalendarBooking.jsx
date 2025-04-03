import React, { useState, useEffect } from "react";
import axios from "axios";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const CalendarBooking = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: ""
  });
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const res = await axios.get("/api/public/get-booked-dates");
        const data = res?.data;
        let dates = [];

        if (Array.isArray(data)) {
          dates = data;
        } else if (Array.isArray(data?.bookedDates)) {
          dates = data.bookedDates;
        } else {
          throw new Error("Unexpected booked dates format");
        }

        setBookedDates(dates);
        setFetchError(null);
      } catch (err) {
        console.error("Failed to fetch booked dates", err);
        setBookedDates([]);
        setFetchError("Unable to load booked dates. Please check your network or try again later.");
      }
    };

    fetchBookedDates();
  }, []);

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const day = selectedDate.getDate();

  const formatDate = (y, m, d) => {
    return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  };

  const isDisabled = (d) => {
    const dateStr = formatDate(currentDate.getFullYear(), currentDate.getMonth(), d);
    return bookedDates.includes(dateStr);
  };

  const changeMonth = (offset) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
    setCurrentDate(newDate);
  };

  const handleInputChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBooking = async () => {
    const selectedDateStr = formatDate(year, month, day);
    if (bookedDates.includes(selectedDateStr)) {
      setBookingSuccess("This date is already booked.");
      return;
    }

    try {
      await axios.post("/api/public/add-booking", {
        rmtID: "debug",
        year,
        month: month + 1,
        day,
        hour: 10,
        form
      });
      setBookingSuccess("Booking successful!");
      setBookedDates((prev) => [...prev, selectedDateStr]);
    } catch (error) {
      console.error("Booking failed", error);
      setBookingSuccess("Booking failed. Try again.");
    }
  };

  const renderCalendarDays = () => {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const totalDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    const blanks = Array.from({ length: firstDay }, (_, i) => (
      <div className="day blank" key={`b-${i}`}></div>
    ));

    const days = Array.from({ length: totalDays }, (_, i) => {
      const d = i + 1;
      const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), d);
      const isSelected =
        selectedDate.getDate() === d &&
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear();
      const disabled = isDisabled(d);

      return (
        <div
          key={d}
          className={`day ${isSelected ? "selected" : ""} ${disabled ? "disabled" : ""}`}
          onClick={() => {
            if (!disabled) setSelectedDate(dateObj);
          }}
        >
          {d}
          {disabled && <div className="dot"></div>}
        </div>
      );
    });

    return [...blanks, ...days];
  };

  return (
    <div className="calendar-wrapper">
      <aside className="calendar-left">
        <div className="date-large">
          <div className="number">{selectedDate.getDate()}</div>
          <div className="weekday">
            {selectedDate.toLocaleDateString("en-US", { weekday: "long" })}
          </div>
        </div>

        <div className="event-section">
          <p>Booked Dates</p>
          {fetchError && <p className="error-message">{fetchError}</p>}
          <ul>
            {bookedDates.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
          <span className="post-link">See booking history</span>
          <div className="create-event">
            Create an Event <span className="plus">+</span>
          </div>
        </div>

        <div className="booking-form">
          <h4>Book This Date</h4>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={handleInputChange}
          />
          <button onClick={handleBooking}>Book</button>
          {bookingSuccess && <p className="booking-status">{bookingSuccess}</p>}
        </div>
      </aside>

      <main className="calendar-main">
        <div className="calendar-header">
          <button onClick={() => changeMonth(-1)}>&lt;</button>
          <div className="month-year">
            <span className="month">{months[currentDate.getMonth()]}</span>
            <span className="year">{currentDate.getFullYear()}</span>
          </div>
          <button onClick={() => changeMonth(1)}>&gt;</button>
        </div>

        <div className="calendar-months">
          {months.map((m, i) => (
            <span
              key={m}
              className={`month-select ${i === currentDate.getMonth() ? "active" : ""}`}
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), i))}
            >
              {m}
            </span>
          ))}
        </div>

        <div className="weekdays">
          {weekdays.map((d) => (
            <div key={d} className="weekday-label">
              {d}
            </div>
          ))}
        </div>

        <div className="calendar-grid">{renderCalendarDays()}</div>
      </main>
    </div>
  );
};

export default CalendarBooking;
