import React from 'react';
import Header from './components/Header';
import HeroVideo from './components/HeroVideo';
import WelcomeSection from './components/WelcomeSection';
import TreatmentsSection from './components/TreatmentsSection';
import MapSection from './components/MapSection';
import Footer from './components/Footer';



import './App.css';

function App() {
  return (
    <div>
      <Header />
      <HeroVideo />
      <WelcomeSection />
      <TreatmentsSection />
      <MapSection />
      <Footer />
    </div>
  );
}

export default App;
