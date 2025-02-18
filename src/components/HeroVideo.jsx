import React from 'react';
import MassageVid from '../assets/images/MassageVid.mp4';

const HeroVideo = () => {
  return (
    <section className="hero-video">
      <video autoPlay muted loop className="video-bg">
        <source src={MassageVid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
  );
};

export default HeroVideo;
