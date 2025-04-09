import React from 'react';
import MassageWall from '../assets/images/MassageWall.jpg';

const HeroImage = () => {
  return (
    <section className="hero-image">
      <div
        className='image-bg'
        style={{ backgroundImage: `url(${MassageWall})`}}
        ></div>
    </section>
  );
};

export default HeroImage;
