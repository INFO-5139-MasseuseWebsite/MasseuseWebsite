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
