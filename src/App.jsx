import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Page Components
import Header from './components/Header';
import HeroVideo from './components/HeroVideo';
import WelcomeSection from './components/WelcomeSection';
import TreatmentsSection from './components/TreatmentsSection';
import MapSection from './components/MapSection';
import Footer from './components/Footer';
import Links from './Links';
import CSSLoader from './CSSLoader';

// Pages
import HealthHistory from './HealthHistory';
import CalendarBooking from './CalendarBooking'; // ✅ Correct!
import Login from './Login';
import BookNow from './BookNow';
import NotFound404 from './404';

function App() {
  return (
    <Router>
      {/* <CSSLoader /> Uncomment if needed */}
      <Links />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <HeroVideo />
              <WelcomeSection />
              <TreatmentsSection />
              <MapSection />
              <Footer />
            </>
          }
        />
        <Route path="/health-history" element={<HealthHistory />} />
        <Route path="/calendar-booking" element={<CalendarBooking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/book-now" element={<BookNow />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </Router>
  );
}

export default App;
