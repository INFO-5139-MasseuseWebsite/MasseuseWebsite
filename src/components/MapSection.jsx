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
