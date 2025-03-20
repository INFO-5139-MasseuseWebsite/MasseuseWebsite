import React, { useState } from 'react';
import Logo from './assets/logo/LogoCMTO.svg';
import TableImage from './assets/images/table.jpeg';
import './BookNow.css';

const BookNow = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [city, setCity] = useState('');
    const [registrationStatus, setRegistrationStatus] = useState('');
    const [gender, setGender] = useState('');
    const [language, setLanguage] = useState('');
    const [searchType, setSearchType] = useState('rmt');
    const [authorizedToPractice, setAuthorizedToPractice] = useState(false);
    const [acupunctureAuthorized, setAcupunctureAuthorized] = useState(false);

    const placeholderText = searchType === 'rmt'
        ? 'Type in any name, practice location, or first 3 digits of postal code'
        : 'Enter name of the corporation';

    return (
        <div className="book-now-content">
            <div className="logo-container">
                <div className="logo">
                    <img src={Logo} alt="Logo" />
                </div>
            </div>

            <hr className="logo-hr" />

            <div className="book-with-us-section">
                <h1>Book with Us!</h1>
                <p>
                    Ready to book your next massage therapy session? <br />
                    With just a few simple steps, our form will guide you to find the right Registered Massage Therapist (RMT) in Ontario.
                    Whether you're looking for an individual RMT or a Health Professional Corporation, you can easily search and find the perfect fit for your needs.
                    Once you find your RMT, you’ll be able to book your service directly with them!
                </p>
            </div>

            <div className="welcome-section">
                <h1>Find an RMT or Corporation</h1>
                <p>
                    Looking for a Registered Massage Therapist (RMT) or a Health Professional Corporation in Ontario? <br />
                    The public register contains up-to-date information on every RMT in Ontario, including those who are no longer practising.
                    You can easily find an RMT near you with just a few clicks!
                </p>
                <br />
                <p>
                    RMTs who are incorporated or part of a <a href="https://www.cmto.com/rmts/professional-corporations/" target="_blank" rel="noopener noreferrer">professional coporation</a> must obtain
                    a certificate of authorization and pay the applicable application and renewal fees.
                    The content of the register is determined by the Regulated Health Professions Act, 1991 (RHPA) and CMTO’s
                    and <a href="https://www.cmto.com/wp-content/uploads/2021/11/By-Law-No.-8-The-Register-and-Registrant-Information.pdf" target="_blank" rel="noopener noreferrer"> By-Law No. 8 </a>
                    and <a href="https://www.cmto.com/wp-content/uploads/2021/11/By-law-No.-12-Professional-Corporations.pdf" target="_blank" rel="noopener noreferrer">By-Law No. 12</a>.
                </p>
                <p>
                    <br />
                    This information is gathered by CMTO when an individual first applies to the College. Additional information is obtained directly from RMTs
                    when they complete their annual renewal or when they notify the College of changes to their information (e.g., new practice address).
                </p>
                <p>
                    <br />
                    View the <a href="https://www.cmto.com/glossary-public-register-terms/" target="_blank" rel="noopener noreferrer">glossary of terms</a> used in the public register.
                </p>
            </div>


            <div className="table-image">
                <img src={TableImage} alt="Table" />
            </div>

            <div className="search-form">
                <h2>Search for:</h2>
                <form>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                value="rmt"
                                checked={searchType === 'rmt'}
                                onChange={() => setSearchType('rmt')}
                            />
                            Registered Massage Therapist (RMT) in Ontario
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="corporation"
                                checked={searchType === 'corporation'}
                                onChange={() => setSearchType('corporation')}
                            />
                            Health Professional Corporation in Ontario
                        </label>
                    </div>

                    <div className="input-group">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder={placeholderText}
                        />
                        <br /> <br />
                    </div>

                    <div className="checkbox-group">
                        <div>
                            <input
                                type="checkbox"
                                id="authorizedToPractice"
                                checked={authorizedToPractice}
                                onChange={() => setAuthorizedToPractice(!authorizedToPractice)}
                            />
                            <label htmlFor="authorizedToPractice">Only show massage therapists who are authorized to practice</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="acupunctureAuthorized"
                                checked={acupunctureAuthorized}
                                onChange={() => setAcupunctureAuthorized(!acupunctureAuthorized)}
                            />
                            <label htmlFor="acupunctureAuthorized">Only show massage therapists who are acupuncture authorized</label>
                        </div>
                    </div>

                    {searchType === 'rmt' && (
                        <>
                            <br />
                            <div className="select-group">
                                <label>City or Town</label>
                                <select value={city} onChange={(e) => setCity(e.target.value)}>
                                    <option value="">Select one...</option>
                                    <option value="London">London</option>
                                    <option value="Barrie">Barrie</option>
                                    <option value="Brampton">Brampton</option>
                                    <option value="Guelph">Guelph</option>
                                    <option value="Hamilton">Hamilton</option>
                                    <option value="Kitchener">Kitchener</option>
                                    <option value="Markham">Markham</option>
                                    <option value="Mississauga">Mississauga</option>
                                    <option value="North Bay">North Bay</option>
                                    <option value="Oakville">Oakville</option>
                                    <option value="Ottawa">Ottawa</option>
                                    <option value="Sarnia">Sarnia</option>
                                    <option value="St. Catharines">St. Catharines</option>
                                    <option value="St. Thomas">St. Thomas</option>
                                    <option value="Sudbury">Sudbury</option>
                                    <option value="Thunder Bay">Thunder Bay</option>
                                    <option value="Toronto">Toronto</option>
                                    <option value="Waterloo">Waterloo</option>
                                </select>
                            </div>

                            <div className="select-group">
                                <label>Registration Status</label>
                                <select value={registrationStatus} onChange={(e) => setRegistrationStatus(e.target.value)}>
                                    <option value="">Select one...</option>
                                    <option value="Current">Current</option>
                                    <option value="Deceased">Deceased</option>
                                    <option value="Resigned">Resigned</option>
                                    <option value="Revoked">Revoked</option>
                                    <option value="Suspended">Suspended</option>
                                </select>
                            </div>

                            <div className="select-group">
                                <label>Gender</label>
                                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <option value="">Select one...</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Non-Binary">Non-Binary</option>
                                </select>
                            </div>

                            <div className="select-group">
                                <label>Language</label>
                                <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                                    <option value="">Select one...</option>
                                    <option value="English">English</option>
                                    <option value="Arabic">Arabic</option>
                                    <option value="Chinese">Chinese</option>
                                    <option value="French">French</option>
                                    <option value="German">German</option>
                                    <option value="Hindi">Hindi</option>
                                    <option value="Italian">Italian</option>
                                    <option value="Japanese">Japanese</option>
                                    <option value="Korean">Korean</option>
                                    <option value="Polish">Polish</option>
                                    <option value="Portuguese">Portuguese</option>
                                    <option value="Russian">Russian</option>
                                    <option value="Spanish">Spanish</option>
                                    <option value="Tagalog">Tagalog</option>
                                    <option value="Turkish">Turkish</option>
                                    <option value="Vietnamese">Vietnamese</option>
                                    <option value="Bengali">Bengali</option>
                                    <option value="Thai">Thai</option>
                                    <option value="Persian">Persian</option>
                                    <option value="Punjabi">Punjabi</option>
                                    <option value="Urdu">Urdu</option>
                                </select>
                            </div>
                        </>
                    )}
                    <br />
                    <button type="submit" className="search-btn">Search</button>
                    <br />
                </form>
            </div>

            <div className="additional-info">
                <h3>What You Can Find in the Public Register:</h3>
                <ul>
                    <br /> <br />
                    <li>Practice location(s)</li>
                    <li>Common names</li>
                    <li>Gender</li>
                    <li>Authorization to practice</li>
                    <li>Conditions or limitations on registration</li>
                    <li>Conduct and disciplinary history (if any)</li>
                </ul>
                <br />
                <p>If you're unable to find what you're looking for or need further assistance, please contact the Registration Services Department at <a href="mailto:registrationservices@cmto.com">registrationservices@cmto.com</a>.</p>
                <br /> <br /> <br /> <br />
            </div>
        </div>

    );
};

export default BookNow;



