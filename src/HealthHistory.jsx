import React, { useState } from 'react';
import './HealthHistory.css';
import Header from './components/Header';
import MassageWall from './components/HeroImage'

const HealthHistory = () => {
  const [formData, setFormData] = useState({

    name: '',
    phoneNumber: '',
    email: '',
    address: '',
    occupation: '',
    dateOfBirth: '',
    receivedMassageBefore: '',
    referredByPractitioner: '',
    practitionerNameAddress: '',

    cardiovascularConditions: [],
    cardiovascularHistory: '',
    infections: [],
    respiratoryConditions: [],
    respiratoryFamilyHistory: '',
    headNeckConditions: [],


    otherConditions: {
      lossOfSensation: '',
      diabetesOnset: '',
      allergies: '',
      reactionType: '',
      epilepsy: '',
      cancer: '',
      skinConditions: '',
      arthritis: '',
      arthritisFamilyHistory: '',
    },
    womenHealth: {
      pregnantDue: '',
      gynecologicalConditions: '',
      generalHealth: '',
      primaryCarePhysician: '',
      physicianAddress: '',
    },
    currentMedications: [],
    medication: '',
    condition: '',
    otherTreatment: '',
    otherTreatmentReason: '',
    surgeryDate: '',
    surgeryNature: '',
    injuryDate: '',
    injuryNature: '',

    otherMedicalConditions: '',
    otherMedicalConditionsDetails: '',
    internalPinsWires: '',
    internalPinsWiresDetails: '',
    internalPinsWiresLocation: '',
    massageTherapyReason: '',
    allergiesLubricants: '',
    allergiesLubricantsDetails: '',
    treatmentGoals: '',
    limitationsDailyLife: '',
    discomfortAreas: '',
  });

  const sanitizeInput = (input) => {
    if (typeof input === 'string') {
      return DOMPurify.sanitize(input);
    }
    return input;
  };


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      const updatedConditions = [...formData[name]];
      if (checked) {
        updatedConditions.push(value);
      } else {
        updatedConditions.splice(updatedConditions.indexOf(value), 1);
      }
      setFormData({
        ...formData,
        [name]: updatedConditions,
      });
    } else if (type === 'radio') {
      if (name.includes('.')) {
        const [parent, child] = name.split('.');
        setFormData((prevData) => ({
          ...prevData,
          [parent]: {
            ...prevData[parent],
            [child]: value,
          },
        }));
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else {
      if (name.includes('.')) {
        const [parent, child] = name.split('.');
        setFormData((prevData) => ({
          ...prevData,
          [parent]: {
            ...prevData[parent],
            [child]: value,
          },
        }));
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    }
  };

  //TO DO: Once linked handle submit 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    alert('Form submitted successfully!');
  };

  return (
    <div>
      <MassageWall />
      <Header />
    <div className="health-history-content">
    <div className="health-history-form">
      <h1>Health History Form</h1>
      <p>
        The information request below will assist us in treating you safely. Feel free to ask any questions about the information being requested.
        Please note that all information provided below will be kept confidentially unless allowed or required by law.
        Your written permission will be required to release any information. Please inform us of any changes to your health status. We are required
        to keep annually updated records of your health history.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="text-style"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="text-style"
          />
        </div>


        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="text-style"
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="text-style"
          />
        </div>

        <div className="form-group">
          <label htmlFor="occupation">Occupation:</label>
          <input
            type="text"
            id="occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            required
            className="text-style"
          />
        </div>

        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            className="text-style"
          />
        </div>

        <div className="form-group">
          <p>Have you received massage therapy before?</p>
          <label>
            <input
              type="radio"
              name="receivedMassageBefore"
              value="Yes"
              checked={formData.receivedMassageBefore === 'Yes'}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="receivedMassageBefore"
              value="No"
              checked={formData.receivedMassageBefore === 'No'}
              onChange={handleChange}
            />
            No
          </label>
        </div>

        <div className="form-group">
          <p>Did a health care practitioner refer you for massage therapy?</p>
          <label>
            <input
              type="radio"
              name="referredByPractitioner"
              value="Yes"
              checked={formData.referredByPractitioner === 'Yes'}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="referredByPractitioner"
              value="No"
              checked={formData.referredByPractitioner === 'No'}
              onChange={handleChange}
            />
            No
          </label>
        </div>

        {formData.referredByPractitioner === 'Yes' && (
          <div className="form-group">
            <label htmlFor="practitionerNameAddress">
              If yes, please provide their name and address:
            </label>
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

        <div className="form-group">
          <h3>Please indicate the conditions you are experiencing or have experienced:</h3>
          <h4>Cardiovascular:</h4>
          <ul>
            {[
              'High blood pressure',
              'Low blood pressure',
              'Chronic congestive heart failure',
              'Heart attack',
              'Phlebitis/Varicose veins',
              'Stroke/CVA',
              'Pacemaker or similar device',
              'Heart disease',
            ].map((condition) => (
              <li key={condition}>
                <label>
                  <input
                    type="checkbox"
                    name="cardiovascularConditions"
                    value={condition}
                    checked={formData.cardiovascularConditions.includes(condition)}
                    onChange={handleChange}
                  />
                  {condition}
                </label>
              </li>
            ))}
          </ul>
          <p>Is there any history of the above?</p>
          <label>
            <input
              type="radio"
              name="cardiovascularHistory"
              value="Yes"
              checked={formData.cardiovascularHistory === 'Yes'}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="cardiovascularHistory"
              value="No"
              checked={formData.cardiovascularHistory === 'No'}
              onChange={handleChange}
            />
            No
          </label>
        </div>

        <div className="form-group">
          <h4>Infections:</h4>
          <ul>
            {['Hepatitis', 'Skin Conditions', 'TB', 'HIV', 'Herpes'].map((infection) => (
              <li key={infection}>
                <label>
                  <input
                    type="checkbox"
                    name="infections"
                    value={infection}
                    checked={formData.infections.includes(infection)}
                    onChange={handleChange}
                  />
                  {infection}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="form-group">
          <h4>Respiratory:</h4>
          <ul>
            {['Chronic cough', 'Shortness of breath', 'Bronchitis', 'Asthma', 'Emphysema'].map((condition) => (
              <li key={condition}>
                <label>
                  <input
                    type="checkbox"
                    name="respiratoryConditions"
                    value={condition}
                    checked={formData.respiratoryConditions.includes(condition)}
                    onChange={handleChange}
                  />
                  {condition}
                </label>
              </li>
            ))}
          </ul>
          <p>Is there a family history of any of the above?</p>
          <label>
            <input
              type="radio"
              name="respiratoryFamilyHistory"
              value="Yes"
              checked={formData.respiratoryFamilyHistory === 'Yes'}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="respiratoryFamilyHistory"
              value="No"
              checked={formData.respiratoryFamilyHistory === 'No'}
              onChange={handleChange}
            />
            No
          </label>
        </div>

        <div className="form-group">
          <h4>Head/Neck:</h4>
          <ul>
            {[
              'History of headaches',
              'History of migraines',
              'Vision problems',
              'Vision loss',
              'Ear problems',
              'Hearing loss',
            ].map((condition) => (
              <li key={condition}>
                <label>
                  <input
                    type="checkbox"
                    name="headNeckConditions"
                    value={condition}
                    checked={formData.headNeckConditions.includes(condition)}
                    onChange={handleChange}
                  />
                  {condition}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="form-group">
          <h4>Other conditions:</h4>
          <label>
            Loss of sensation, where?
            <input
              type="text"
              name="otherConditions.lossOfSensation"
              value={formData.otherConditions.lossOfSensation}
              onChange={handleChange}
              className="text-style"
            />
          </label>
          <label>
            Diabetes, onset:
            <input
              type="text"
              name="otherConditions.diabetesOnset"
              value={formData.otherConditions.diabetesOnset}
              onChange={handleChange}
              className="text-style"
            />
          </label>
          <label>
            Allergies/hypersensitivity to what?
            <input
              type="text"
              name="otherConditions.allergies"
              value={formData.otherConditions.allergies}
              onChange={handleChange}
              className="text-style"
            />
          </label>
          <label>
            Type of reaction:
            <input
              type="text"
              name="otherConditions.reactionType"
              value={formData.otherConditions.reactionType}
              onChange={handleChange}
              className="text-style"
            />
          </label>

          <p>Epilepsy:</p>
          <label>
            <input
              type="radio"
              name="otherConditions.epilepsy"
              value="Yes"
              checked={formData.otherConditions.epilepsy === 'Yes'}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="otherConditions.epilepsy"
              value="No"
              checked={formData.otherConditions.epilepsy === 'No'}
              onChange={handleChange}
            />
            No
          </label>
          <br />
          <label>
            Cancer, where?
            <input
              type="text"
              name="otherConditions.cancer"
              value={formData.otherConditions.cancer}
              onChange={handleChange}
              className="text-style"
            />
          </label>

          <label>
            Skin conditions, what?
            <input
              type="text"
              name="otherConditions.skinConditions"
              value={formData.otherConditions.skinConditions}
              onChange={handleChange}
              className="text-style"
            />
          </label>

          <p>Arthritis:</p>
          <label>
            <input
              type="radio"
              name="otherConditions.arthritis"
              value="Yes"
              checked={formData.otherConditions.arthritis === 'Yes'}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="otherConditions.arthritis"
              value="No"
              checked={formData.otherConditions.arthritis === 'No'}
              onChange={handleChange}
            />
            No
          </label>
          <p>Is there a family history of arthritis?</p>
          <label>
            <input
              type="radio"
              name="otherConditions.arthritisFamilyHistory"
              value="Yes"
              checked={formData.otherConditions.arthritisFamilyHistory === 'Yes'}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="otherConditions.arthritisFamilyHistory"
              value="No"
              checked={formData.otherConditions.arthritisFamilyHistory === 'No'}
              onChange={handleChange}
            />
            No
          </label>
        </div>

        <div className="form-group">
          <h4>Women:</h4>
          <label>
            Pregnant, due:
            <input
              type="text"
              name="womenHealth.pregnantDue"
              value={formData.womenHealth.pregnantDue}
              onChange={handleChange}
              className="text-style"
            />
          </label>

          <label>
            Gynecological conditions, what?
            <input
              type="text"
              name="womenHealth.gynecologicalConditions"
              value={formData.womenHealth.gynecologicalConditions}
              onChange={handleChange}
              className="text-style"
            />
          </label>
          <label>
            Overall, how is your general health?
            <input
              type="text"
              name="womenHealth.generalHealth"
              value={formData.womenHealth.generalHealth}
              onChange={handleChange}
              className="text-style"
            />
          </label>
          <label>
            Primary care physician:
            <input
              type="text"
              name="womenHealth.primaryCarePhysician"
              value={formData.womenHealth.primaryCarePhysician}
              onChange={handleChange}
              className="text-style"
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="womenHealth.physicianAddress"
              value={formData.womenHealth.physicianAddress}
              onChange={handleChange}
              className="text-style"
            />
          </label>
        </div>

        <hr />

        <div className="form-group">
          <h4>Current medications:</h4>
          <label>
            Medication:
            <input
              type="text"
              name="currentMedications.medication"
              value={formData.currentMedications.medication}
              onChange={handleChange}
              className="text-style"
            />
          </label>

          <label>
            Condition it treats:
            <input
              type="text"
              name="currentMedications.condition"
              value={formData.currentMedications.condition}
              onChange={handleChange}
              className="text-style"
            />
          </label>
        </div>

        <div className="form-group">
          <p>Are you currently receiving treatment from another health care professional?</p>
          <label>
            <input
              type="radio"
              name="otherTreatment"
              value="Yes"
              checked={formData.otherTreatment === 'Yes'}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="otherTreatment"
              value="No"
              checked={formData.otherTreatment === 'No'}
              onChange={handleChange}
            />
            No
          </label>
          {formData.otherTreatment === 'Yes' && (
            <label>
              If yes, for what?
              <input
                type="text"
                name="otherTreatmentReason"
                value={formData.otherTreatmentReason}
                onChange={handleChange}
                className="text-style"
              />
            </label>
          )}
        </div>

        <div className="form-group">
          <label>
            Surgery date:
            <input
              type="date"
              name="surgeryDate"
              value={formData.surgeryDate}
              onChange={handleChange}
              className="text-style"
            />
          </label>
          <label>
            Nature of the surgery:
            <input
              type="text"
              name="surgeryNature"
              value={formData.surgeryNature}
              onChange={handleChange}
              className="text-style"
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Injury date:
            <input
              type="date"
              name="injuryDate"
              value={formData.injuryDate}
              onChange={handleChange}
              className="text-style"
            />
          </label>
          <label>
            Nature of the injury:
            <input
              type="text"
              name="injuryNature"
              value={formData.injuryNature}
              onChange={handleChange}
              className="text-style"
            />
          </label>
        </div>

        <div className="form-group">
          <p>Do you have any other medical conditions? (e.g. digestive conditions, haemophilia, osteoporosis, mental illness)</p>
          <label>
            <input
              type="radio"
              name="otherMedicalConditions"
              value="Yes"
              checked={formData.otherMedicalConditions === 'Yes'}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="otherMedicalConditions"
              value="No"
              checked={formData.otherMedicalConditions === 'No'}
              onChange={handleChange}
            />
            No
          </label>
          {formData.otherMedicalConditions === 'Yes' && (
            <label>
              What are they?
              <input
                type="text"
                name="otherMedicalConditionsDetails"
                value={formData.otherMedicalConditionsDetails}
                onChange={handleChange}
                className="text-style"
              />
            </label>
          )}
        </div>

        <div className="form-group">
          <p>Do you have any internal pins, wires, artificial joints or special equipment?</p>
          <label>
            <input
              type="radio"
              name="internalPinsWires"
              value="Yes"
              checked={formData.internalPinsWires === 'Yes'}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="internalPinsWires"
              value="No"
              checked={formData.internalPinsWires === 'No'}
              onChange={handleChange}
            />
            No
          </label>
          {formData.internalPinsWires === 'Yes' && (
            <>
              <label>
                What?
                <input
                  type="text"
                  name="internalPinsWiresDetails"
                  value={formData.internalPinsWiresDetails}
                  onChange={handleChange}
                  className="text-style"
                />
              </label>
              <label>
                Where?
                <input
                  type="text"
                  name="internalPinsWiresLocation"
                  value={formData.internalPinsWiresLocation}
                  onChange={handleChange}
                  className="text-style"
                />
              </label>
            </>
          )}
        </div>

        <div className="form-group">
          <label>
            What is the reason you are seeking massage therapy? Please include the location of any issue or joint discomfort.
            <textarea
              name="massageTherapyReason"
              value={formData.massageTherapyReason}
              onChange={handleChange}
              className="textarea-style"
            />
          </label>
        </div>

        <div className="form-group">
          <p>Allergies:</p>
          <label>
            Do you have any allergies and/or sensitivities to hydrotherapy additives and/or lubricants?
            <input
              type="text"
              name="allergiesLubricants"
              value={formData.allergiesLubricants}
              onChange={handleChange}
              className="text-style"
            />
          </label>
          <label>
            Specify:
            <input
              type="text"
              name="allergiesLubricantsDetails"
              value={formData.allergiesLubricantsDetails}
              onChange={handleChange}
              className="text-style"
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Overall, what are your goals for the treatment?
            <br />
            <textarea
              name="treatmentGoals"
              value={formData.treatmentGoals}
              onChange={handleChange}
              className="textarea-style"
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Are there any limitations to activities of daily life? (e.g. Limited mobility, pain or discomfort, difficulties sleeping,
            stress or anxiety, reduces physical endurance, troubles lifting, postural problems, circulatory issues, post-surgery or injury
            recovery)
            <br />
            <textarea
              name="limitationsDailyLife"
              value={formData.limitationsDailyLife}
              onChange={handleChange}
              className="textarea-style"
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Are there any particular areas where you're experiencing discomfort or tension that you'd like focused on? (e.g. back, legs,
            shoulders, or neck?)
            <br />
            <textarea
              name="discomfortAreas"
              value={formData.discomfortAreas}
              onChange={handleChange}
              className="textarea-style"
            />
          </label>
        </div>

        <button type="submit" className="submit-button" >Submit</button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default HealthHistory;