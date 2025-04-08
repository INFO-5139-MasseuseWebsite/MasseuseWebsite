import React from 'react';
import './AboutUs.css';
import Header from './components/Header';
import Footer from './components/Footer';

const AboutUs = () => {
  return (
    <div>
    <Header />
    <div className="about-us">
      <header className="about-header">
        <h1>About the College of Massage Therapists of Ontario (CMTO)</h1>
      </header>

      <section className="overview">
        <h2>Overview</h2>
        <p>
          The College of Massage Therapists of Ontario (CMTO) is the regulatory body that oversees Registered
          Massage Therapists (RMTs/MTs) working in the province. CMTO receives its authority from the Regulated
          Health Professions Act, 1991 and the Massage Therapy Act, 1991. CMTO is not a school or an organization
          that advocates on behalf of RMTs. CMTO exists to protect the public interest. 
          CMTO is overseen by a Board, similar to a board of directors.
        </p>
        <p>
          CMTO regulates RMTs and protects the public by:
          <ul>
            <li>Setting the requirements for becoming an RMT to ensure qualified individuals practice.</li>
            <li>Maintaining an up-to-date public register to help Ontarians verify qualified RMTs.</li>
            <li>Developing and enforcing rules for RMTs’ practice and conduct, including a Code of Ethics.</li>
            <li>Running a Quality Assurance Program to ensure RMTs maintain up-to-date knowledge and skills.</li>
            <li>Receiving and investigating complaints from the public about Massage Therapy care and taking disciplinary action when necessary.</li>
          </ul>
        </p>
      </section>

      <section className="history">
        <h2>History of the Profession</h2>
        <p>
        Massage Therapy came into increased prominence during World War I, at the time when Canada helped care for
        its soldiers overseas. Orthopaedical centres, devoted to conditions involving the musculoskeletal system, 
        were among the many makeshift hospitals set up during this time. These centers began offering hydrotherapy 
        and massage to injured soldiers. Throughout World War I, nearly 2,000 soldiers were treated daily with 
        massage, establishing Massage Therapy as a necessary and valued form of healthcare. CMTO has been 
        regulating Massage Therapy in Ontario since 1919. Learn more about how regulation protects the client.
        </p>
      </section>

      <section className="mission">
        <h2>CMTO’s Vision and Mission</h2>
        <p>
          <strong>Our Vision:</strong> Regulatory excellence, promoting public trust, and safe, quality Massage Therapy.
        </p>
        <p>
          <strong>Our Mission:</strong> CMTO is dedicated to excellence in protecting the public interest, guiding registrants, and promoting
          the highest possible quality of the practice of Massage Therapy.
        </p>
      </section>

      <section className="activities">
        <h2>CMTO Activities</h2>
        <h3>Registration Services</h3>
        <p>
          Develops, establishes, and maintains requirements for individuals registered with CMTO. Approves and assigns
          classes of registration for RMTs registered with CMTO.
        </p>
        <h3>Professional Practice</h3>
        <p>
          Promotes continuing competency and improvement among RMTs through STRiVE. 
          Addresses changes in practice settings. 
          Develops and maintains CMTO’s Standards of Practice and Code of Ethics, and 
          guides RMTs and provides practice advice.
        </p>
        <h3>Professional Conduct</h3>
        <p>
          Investigates complaints and concerns about RMTs. Conducts discipline hearings and takes disciplinary action when
          necessary. Investigates mandatory reports of abuse. Informs the public about illegal practitioners.
        </p>
        <h3>Client Relations</h3>
        <p>
          Provides funding for therapy and counselling if a client is abused by an RMT.
        </p>
      </section>
    </div>
    <Footer />
    </div>
    
  );
};

export default AboutUs;
