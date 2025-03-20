import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HeroVideo from "./components/HeroVideo";
import WelcomeSection from "./components/WelcomeSection";
import TreatmentsSection from "./components/TreatmentsSection";
import MapSection from "./components/MapSection";
import Footer from "./components/Footer";
import About from "./components/About"; // Fixed path
import FullCalendarView from "./components/FullCalendarView"; // Added missing import
import "./App.css"; // Ensure App.css exists
import Logo from "./assets/logo/LogoCMTO.svg";
import NewAppointmentPage from "./components/NewAppointment";

function App() {
  return (
    <Router>
      <div>
        {/* Header Component */}
        <header className="header">
          <div className="logo">
            <Link to="/">
              <img src={Logo} alt="Company Logo" height="50" />
            </Link>
          </div>
          <nav className="navbar">
            <ul className="nav-list">
              <li><Link to="/">Home</Link></li>
              <li className="dropdown">
                <a href="#treatments" className="dropdown-toggle">Treatments</a>
              </li>
              <li><Link to="/book-appointment">Book Appointment</Link></li> {/* Fixed link */}
              <li><a href="#map-section">Location</a></li>
              <li><Link to="/about">About Us</Link></li> {/* Fixed link */}
              <li><Link to="/login">Login</Link></li>
            </ul>
          </nav>
        </header>

        {/* Main Routes */}
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <HeroVideo />
                <WelcomeSection />
                <TreatmentsSection />
                <MapSection />
              </>
            }
          />

          {/* Health History Page */}
          <Route path="/book-appointment" element={<NewAppointmentPage />} /> {/* Fixed path */}

          {/* About Page */}
          <Route path="/about" element={<About />} />

          {/* Full Calendar Page */}
          <Route path="/full-calendar-view" element={<FullCalendarView />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}



export default App;
