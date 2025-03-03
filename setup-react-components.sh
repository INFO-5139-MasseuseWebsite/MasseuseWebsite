#!/bin/bash

# Create necessary directories
mkdir -p src/components
mkdir -p src/assets/images
mkdir -p src/assets/location
mkdir -p src/assets/logo

# Move assets to src/assets
if [ -d "./Images" ]; then
    mv ./Images/* src/assets/images/
    rmdir ./Images
fi

if [ -d "./location" ]; then
    mv ./location/* src/assets/location/
    rmdir ./location
fi

if [ -d "./Logo" ]; then
    mv ./Logo/* src/assets/logo/
    rmdir ./Logo
fi

# Create Header.jsx
cat > src/components/Header.jsx << 'EOF'
import React from 'react';
import Logo from '../assets/logo/LogoCMTO.svg';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={Logo} alt="Logo" height="50" />
      </div>
      <nav className="navbar">
        <ul>
          <li><a href="index.html">Home</a></li>
          <li className="dropdown">
            <a href="#explore-section">Treatments</a>
            <div className="dropdown-content">
              <a href="#">Massages</a>
              <a href="#">Deep Tissue</a>
              <a href="#">Holistic</a>
              <a href="#">Aromatherapy</a>
              <a href="#">Acupuncture</a>
              <a href="#">chiropractic-care</a>
              <a href="#">Facial Care</a>
              <a href="#">Hands / Feet</a>
            </div>
          </li>
          <li><a href="#map-section">Hours/Location</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Login</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
EOF

# Create HeroVideo.jsx
cat > src/components/HeroVideo.jsx << 'EOF'
import React from 'react';
import MassageVid from '../assets/images/MassageVid.mp4';

const HeroVideo = () => {
  return (
    <section className="hero-video">
      <video autoPlay muted loop playsInline className="video-bg">
      <source src={MassageVid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
  );
};


export default HeroVideo;
EOF

# Create WelcomeSection.jsx
cat > src/components/WelcomeSection.jsx << 'EOF'
import React from 'react';

const WelcomeSection = () => {
  return (
    <section className="welcome">
      <h2>Take a deep breath...</h2>
      <p>
        We welcome you to the <strong>College of Massage Therapists of Ontario</strong>,
        we invite you to meet your Registered Massage Therapist (RMT). Using our platform we hope that you can find the
        right RMT to meet all your health needs while also providing you with a premium restorative experiance.
        Our RMTs believe in creating a tranquil environment where you can unwind, and rejuvinate your mind and body.
      </p>
    </section>
  );
};

export default WelcomeSection;
EOF

# Create TreatmentCard.jsx
cat > src/components/TreatmentCard.jsx << 'EOF'
import React from 'react';

const TreatmentCard = ({ image, alt, title, description, price }) => {
  return (
    <div className="treatment-card">
      <img src={image} alt={alt} className="treatment-image" />
      <h3><a href="#">{title}</a></h3>
      <p>{description}</p>
      <p className="price">{price}</p>
    </div>
  );
};

export default TreatmentCard;
EOF

# Create TreatmentsSection.jsx
cat > src/components/TreatmentsSection.jsx << 'EOF'
import React from 'react';
import TreatmentCard from './TreatmentCard';
import relaxImg from '../assets/images/relax.png';
import deepTissueImg from '../assets/images/deeptissue.png';
import templesImg from '../assets/images/temples.jpg';
import roomImg from '../assets/images/room.jpeg';
import accuImg from '../assets/images/accu.jpg';
import chiroImg from '../assets/images/chiro.jpg';
import faceMaskImg from '../assets/images/facemask.jpeg';
import handImg from '../assets/images/hand.png';

const TreatmentsSection = () => {
  const treatments = [
    {
      image: relaxImg,
      alt: 'Massages',
      title: 'Massages',
      description:
        'Immerse yourself in a world of complete relaxation with a classic massage. Book with our knowledgeable Registered Massage Therapists',
      price: '$70 - 60 mins'
    },
    {
      image: deepTissueImg,
      alt: 'Deep Tissue Massage',
      title: 'Deep Tissue',
      description:
        'A deeper, more intense massage to target muscle knots and relieve chronic tension. Ideal for those with stiff muscles or soreness from physical activity.',
      price: '$100 - 60 mins'
    },
    {
      image: templesImg,
      alt: 'Holistic Massage',
      title: 'Holistic',
      description:
        'Holistic therapy for balancing mind, body, and spirit. We use natural healing techniques to align energy and promote overall well-being.',
      price: '$90 - 60 mins'
    },
    {
      image: roomImg,
      alt: 'Aromatherapy Massage',
      title: 'Aromatherapy',
      description:
        'Immerse yourself in the therapeutic power of essential oils, combined with a relaxing massage to help balance your body and mind for a truly rejuvenating experience.',
      price: '$90 - 60 mins'
    },
    {
      image: accuImg,
      alt: 'Acupuncture',
      title: 'Acupuncture',
      description:
        'Acupuncture therapy to stimulate specific points on the body, promoting energy flow and healing. Ideal for pain relief, stress reduction, and overall wellness.',
      price: '$120 - 60 mins'
    },
    {
      image: chiroImg,
      alt: 'Chiropractic Care',
      title: 'Chiropractic Care',
      description:
        'Chiropractic care that focuses on the spine and musculoskeletal system to improve alignment, mobility, and overall health.',
      price: '$85 - 60 mins'
    },
    {
      image: faceMaskImg,
      alt: 'Facial Care',
      title: 'Facial Care',
      description:
        'Pamper your skin with a rejuvenating facial, designed to cleanse, hydrate, and refresh. Perfect for a youthful glow and overall skin health.',
      price: '$75 - 60 mins'
    },
    {
      image: handImg,
      alt: 'Hands / Feet Care',
      title: 'Hands / Feet',
      description:
        'Treat your hands and feet to a relaxing therapy session with our special hand and foot care treatments that promote relaxation and improve skin health.',
      price: '$40 - 30 mins'
    }
  ];

  return (
    <section className="explore-section" id="explore-section">
      <h2>Our Treatments</h2>
      <div className="treatment-container">
        {treatments.map((treatment, index) => (
          <TreatmentCard
            key={index}
            image={treatment.image}
            alt={treatment.alt}
            title={treatment.title}
            description={treatment.description}
            price={treatment.price}
          />
        ))}
      </div>
    </section>
  );
};

export default TreatmentsSection;
EOF

# Create MapSection.jsx
cat > src/components/MapSection.jsx << 'EOF'
import React from 'react';
import markerIcon from '../assets/location/marker.svg';
import phoneIcon from '../assets/location/phone.svg';
import timeIcon from '../assets/location/time.svg';

const MapSection = () => {
  return (
    <section className="map" id="map-section">
      <h1>GIVE US A VISIT</h1>
      <div className="mapContainer">
        <div className="mapEmbed">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8159.1462176870455!2d-79.40172200975833!3d43.69612860626877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b333ecb8379f5%3A0x2b7c1df679b58ae7!2sThe%20College%20of%20Massage%20Therapists%20of%20Ontario%20(CMTO)!5e0!3m2!1sen!2sca!4v1738809915753!5m2!1sen!2sca"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="infoContainer">
          <div className="info">
            <img src={markerIcon} alt="Location Icon" className="map-icon" />
            1867 Yonge St #810, Toronto, ON M4S 1Y5
          </div>
          <div className="info">
            <img src={phoneIcon} alt="Phone Icon" className="map-icon" />
            (416) 489-2626
          </div>
          <div className="info">
            <img src={timeIcon} alt="Hours Icon" className="map-icon" />
            Mon - Fri: 9am - 4pm for Online Service. <br />
            Tuesday & Thursday: 9am - 1pm for In Person
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
EOF

# Create Footer.jsx
cat > src/components/Footer.jsx << 'EOF'
import React from 'react';
import markerIcon from '../assets/location/marker.svg';
import phoneIcon from '../assets/location/phone.svg';
import timeIcon from '../assets/location/time.svg';
import Logo from '../assets/logo/LogoCMTO.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-icons">
          <div className="icon">
            <img src={markerIcon} alt="Location Icon" className="footer-icon" />
            <p>1867 Yonge St #810, Toronto, ON M4S 1Y5</p>
          </div>
          <div className="icon">
            <img src={phoneIcon} alt="Phone Icon" className="footer-icon" />
            <p>(416) 489-2626</p>
          </div>
          <div className="icon">
            <img src={timeIcon} alt="Hours Icon" className="footer-icon" />
            <p>
              Mon - Fri: 9am - 4pm for Online Service. <br /> Tuesday & Thursday: 9am - 1pm for In Person
            </p>
          </div>
        </div>
        <div className="footer-logo">
          <img src={Logo} alt="Logo" height="50" />
        </div>
      </div>
      <div className="copyright">
        <p>&copy; 2025 CMTO. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
EOF

# Update (or create) App.jsx
cat > src/App.jsx << 'EOF'
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
EOF

echo "React components and asset structure have been set up successfully."
