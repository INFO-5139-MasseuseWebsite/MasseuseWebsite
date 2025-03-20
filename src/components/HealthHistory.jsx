import React, { useState } from 'react';
import './HealthHistory.css';

const HealthHistory = ({formData, setFormData, onSubmit}) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value),
      }));
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit()
  };

  return (
    <div className="health-history-form">
      <h1>Health History Form</h1>
      <p>
        The information request below will assist us in treating you safely. Feel free to ask any questions
        about the information being requested. Please note that all information provided below will be kept
        confidentially unless allowed or required by law.
      </p>
      <form onSubmit={handleSubmit}>
        {['name', 'phoneNumber', 'email', 'address', 'occupation', 'dateOfBirth'].map((field) => (
          <div className="form-group" key={field}>
            <label htmlFor={field}>{field.replace(/([A-Z])/g, ' $1').trim()}:</label>
            <input
              type={field === 'dateOfBirth' ? 'date' : 'text'}
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className="text-style"
            />
          </div>
        ))}

        <div className="form-group">
          <p>Have you received massage therapy before?</p>
          {['Yes', 'No'].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="receivedMassageBefore"
                value={option}
                checked={formData.receivedMassageBefore === option}
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </div>

        <div className="form-group">
          <p>Did a health care practitioner refer you for massage therapy?</p>
          {['Yes', 'No'].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="referredByPractitioner"
                value={option}
                checked={formData.referredByPractitioner === option}
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </div>

        {formData.referredByPractitioner === 'Yes' && (
          <div className="form-group">
            <label htmlFor="practitionerNameAddress">Practitioner Name and Address:</label>
            <input
              type="text"
              id="practitionerNameAddress"
              name="practitionerNameAddress"
              value={formData.practitionerNameAddress}
              onChange={handleChange}
              className="text-style"
            />
          </div>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HealthHistory;
