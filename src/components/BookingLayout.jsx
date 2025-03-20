import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import "../components/BookingLayout.css";
import FullCalendarView from "../components/FullCalendarView.jsx";
import Sidebar from "../components/Sidebar.jsx"; // Adjust path if needed


const BookingHealthHistory = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
    occupation: '',
    dateOfBirth: '',
    receivedMassageBefore: '',
    referredByPractitioner: '',
    practitionerNameAddress: '',
    cardiovascularConditions: [],
    cardiovascularHistory: '',
    infections: [],
    respiratoryConditions: [],
    respiratoryFamilyHistory: '',
    headNeckConditions: [],
    otherConditions: {
      lossOfSensation: '',
      diabetesOnset: '',
      allergies: '',
      reactionType: '',
      epilepsy: '',
      cancer: '',
      skinConditions: '',
      arthritis: '',
      arthritisFamilyHistory: '',
    },
    womenHealth: {
      pregnantDue: '',
      gynecologicalConditions: '',
      generalHealth: '',
      primaryCarePhysician: '',
      physicianAddress: '',
    },
    currentMedications: [],
    medication: '',
    condition: '',
    otherTreatment: '',
    otherTreatmentReason: '',
    surgeryDate: '',
    surgeryNature: '',
    injuryDate: '',
    injuryNature: '',
    otherMedicalConditions: '',
    otherMedicalConditionsDetails: '',
    internalPinsWires: '',
    internalPinsWiresDetails: '',
    internalPinsWiresLocation: '',
    massageTherapyReason: '',
    allergiesLubricants: '',
    allergiesLubricantsDetails: '',
    treatmentGoals: '',
    limitationsDailyLife: '',
    discomfortAreas: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.date) newErrors.date = "Please select a date.";
    if (!formData.service) newErrors.service = "Please choose a service.";
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSuccessMessage(`Booking confirmed for ${formData.name} on ${format(new Date(formData.date), "PPP")}`);

    let bookings = JSON.parse(localStorage.getItem("bookings")) || {};
    const formattedDate = format(new Date(formData.date), "yyyy-MM-dd");

    if (!bookings[formattedDate]) {
      bookings[formattedDate] = [];
    }

    bookings[formattedDate].push({
      time: "10:00 AM", // Static time (Can be updated dynamically)
      name: formData.name,
    });

    localStorage.setItem("bookings", JSON.stringify(bookings));
    navigate("/full-calendar-view");
  };

  return (
    <div className="booking-health-history">
      <Sidebar /> {/* Sidebar Component */}

      <div className="form-container">
        <h1>Health History & Booking Form</h1>
        {successMessage && <p className="success-message">{successMessage}</p>}

        <form onSubmit={handleSubmit}>
          {["name", "phoneNumber", "email", "address", "occupation", "dateOfBirth"].map((field) => (
            <div className="form-group" key={field}>
              <label htmlFor={field}>{field.replace(/([A-Z])/g, " $1").trim()}:</label>
              <input
                type={field === "dateOfBirth" ? "date" : "text"}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <div className="form-group">
            <label>Select Date</label>
            <input
              type="date"
              value={formData.date ? format(new Date(formData.date), "yyyy-MM-dd") : ""}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
            {errors.date && <p className="error-message">{errors.date}</p>}
          </div>

          <div className="form-group">
            <label>Service</label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              required
            >
              <option value="">Select a service</option>
              <option value="consultation">Consultation</option>
              <option value="therapy">Therapy Session</option>
              <option value="massage">Massage</option>
            </select>
            {errors.service && <p className="error-message">{errors.service}</p>}
          </div>

          <button type="submit">Confirm Booking</button>
        </form>
      </div>
    </div>
  );
};

export default BookingHealthHistory;