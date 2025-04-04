import React from 'react';
import Header from './components/Header';
import HeroVideo from './components/HeroVideo';
import WelcomeSection from './components/WelcomeSection';
import TreatmentsSection from './components/TreatmentsSection';
import MapSection from './components/MapSection';
import Footer from './components/Footer';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HealthHistory from './HealthHistory';
// import './HealthHistory.css';
import Links from './Links';
import CSSLoader from './CSSLoader';
import NotFound404 from './404';
import Login from './Login';
import BookNow from './BookNow'; 


// function App() {
//   return (
//     <div>
//       <Header />
//       <HeroVideo />
//       <WelcomeSection />
//       <TreatmentsSection />
//       <MapSection />
//       <Footer />
//     </div>
//   );
// }

// export default App;

function App() {
  return (
    <Router>
      {/* <CSSLoader /> */}
      <Links />


      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <HeroVideo />
            <WelcomeSection />
            <TreatmentsSection />
            <MapSection />
            <Footer />
          </>
        } />
        <Route path="/health-history" element={<HealthHistory />} />
        <Route path="/login" element={<Login />} />
        <Route path="/book-now" element={<BookNow />} /> 
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </Router>
  );
}

export default App;
