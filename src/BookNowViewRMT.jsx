import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import './BookNowViewRMT.css';
import Header from './components/Header';
import Footer from './components/Footer';

const BookNowViewRMT = () => {
    const { id } = useParams();
    const location = useLocation();
    // const navigate = useNavigate();
    const [person, setPerson] = useState(location.state?.personDetails || null);
    const [loading, setLoading] = useState(!person);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!person) {
            axios.post(`http://localhost/api/public/rmt-details/${id}`)
                .then(res => setPerson(res.data))
                .catch(() => setError("Error fetching RMT details"))
                .finally(() => setLoading(false));
        }
    }, [id, person]);

    const formatDate = (dateStr) => {
        if (!dateStr) return "N/A";
        return new Date(dateStr).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!person) return <p>No RMT details found.</p>;

    return (

        <div>
            <Header />
            <div className="profile">


                <div className="back-button-container">
                    <NavLink
                        to={{
                            pathname: "/book-now",
                            state: location.state
                        }}
                        className="back-button"
                        activeClassName="active"
                    >
                        ← Back to Results
                    </NavLink>
                </div>

                <h1 className="profile-heading">{person.firstName} {person.lastName}</h1>

                <section className="info-section">
                    <h2 className="section-title">Basic Information</h2>
                    <div className="info-grid">
                        <p><strong>Gender</strong></p>
                        <p>{person.gender || 'N/A'}</p>

                        <p><strong>Initial Registration Date</strong></p>
                        <p>{formatDate(person.initialRegistrationDate)}</p>

                        <p><strong>Class of Registration</strong></p>
                        <p>{person.registrationCategory	 || 'N/A'}</p>

                        <p><strong>Status</strong></p>
                        <p>{person.registrationStatus || 'N/A'}</p>

                        <p><strong>Electoral District</strong></p>
                        <p>{person.electoralZone || 'N/A'}</p>

                        <p><strong>Authorized to Practice</strong></p>
                        <p>{person.authorizedToPractice ? 'Yes' : 'No'}</p>

                        <p><strong>Acupuncture Authorized</strong></p>
                        <p>{person.acupunctureAuthorized ? 'Yes' : 'No'}</p>
                    </div>
                </section>

                <section className="info-section">
                    <h2 className="section-title">Public Register Alert</h2>
                    <p>{person.publicRegisterAlert || 'None.'}</p>
                </section>

                {person.placesOfPractice?.length > 0 && (
                    <section className="info-section">
                        <h2 className="section-title">Business Contact Information</h2>
                        <table className="info-table">
                            <thead>
                                <tr>
                                    <th>Business Name</th>
                                    <th>Street Address</th>
                                    <th>City</th>
                                    <th>Province</th>
                                    <th>Postal Code</th>
                                    <th>Phone Number</th>
                                    <th>Business Website</th>
                                    <th>Is Primary?</th>
                                </tr>
                            </thead>
                            <tbody>
                                {person.placesOfPractice.map((loc, i) => (
                                    <tr key={i}>
                                        <td>{loc.practiceLocation}</td>
                                        <td>{loc.address1}</td>
                                        <td>{loc.city}</td>
                                        <td>{loc.province}</td>
                                        <td>{loc.postalCode}</td>
                                        <td>{loc.phone}</td>
                                        <td>{loc.website || '-'}</td>
                                        <td>{loc.isPrimary ? "Yes" : "No"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                )}

                <section className="info-section">
                    <h2 className="section-title">Registration History</h2>
                    <p className="section-note">
                        As of January 1, 2021, only changes to an RMT's class (i.e., General or Inactive) or status (i.e., suspended, revoked) will show in "Registration History" below. For example, if the most recent record is General Certificate, Current, Effective 01-Jan-2021, it means there has been no change to that RMT's class and status and they are still a current General Certificate holder.
                    </p>
                    {person.registrationHistory?.length > 0 ? (
                        <table className="info-table">
                            <thead>
                                <tr>
                                    <th>Class</th>
                                    <th>Status</th>
                                    <th>Effective Date</th>
                                    <th>Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {person.registrationHistory.map((entry, idx) => (
                                    <tr key={idx}>
                                        <td>{entry.class}</td>
                                        <td>{entry.status}</td>
                                        <td>{formatDate(entry.effectiveDate)}</td>
                                        <td>{entry.notes || '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : <p>No registration history available.</p>}
                </section>


                {person.education?.length > 0 && (
                    <section className="info-section">
                        <h2 className="section-title">Education</h2>
                        <table className="info-table">
                            <thead>
                                <tr>
                                    <th>Education Institution</th>
                                    <th>Completion Date</th>
                                    <th>Highest Level Attained</th>
                                </tr>
                            </thead>
                            <tbody>
                                {person.education.map((edu, idx) => (
                                    <tr key={idx}>
                                        <td>{edu.institution}</td>
                                        <td>{formatDate(edu.completionDate)}</td>
                                        <td>{edu.level}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                )}


                {person.languagesOfCare?.length > 0 && (
                    <section className="info-section">
                        <h2 className="section-title">Language Used In Practice</h2>
                        <p>{person.languagesOfCare.join(", ")}</p>
                    </section>
                )}

                {person.nameHistory?.length > 0 && (
                    <section className="info-section">
                        <h2 className="section-title">Name History</h2>
                        <table className="info-table">
                            <thead>
                                <tr>
                                    <th>Last Name</th>
                                    <th>Middle Name</th>
                                    <th>First Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {person.nameHistory.map((name, idx) => (
                                    <tr key={idx}>
                                        <td>{name.lastName}</td>
                                        <td>{name.middleName || '-'}</td>
                                        <td>{name.firstName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                )}

                <div className="book-container">
                    <button
                        className="book-button"
                        onClick={() => alert("Booking feature coming soon..")} //Link to Rodrigo's page 
                    >
                        📅 Book Now
                    </button>
                </div>


            </div>
            <Footer />
        </div>
    );
};

export default BookNowViewRMT;


