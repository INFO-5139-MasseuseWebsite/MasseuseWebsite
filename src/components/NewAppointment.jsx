import { useState } from "react";
import HealthHistory from "./HealthHistory";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FullCalendarView from "./FullCalendarView";

export default function NewAppointmentPage() {
    const rmtID = 'debug' // use GET parameters to set this on load
    const today = new Date()
    const navigate = useNavigate()
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
    const [date, setDate] = useState({
        year: today.getFullYear(),
        month: today.getMonth(),
        day: today.getDate(),
        hour: null,
    })
    const [state, setState] = useState(false)

    const handleSubmit = async () => {
        const response = await axios.post('/api/public/add-booking', {
            ...date,
            form: formData
        })
        console.log(response.status, response.data)
    }

    return <div>
        {state ?
            <FullCalendarView rmtID={rmtID} date={date} setDate={setDate} onSubmit={handleSubmit} onCancel={()=>setState(false)} /> :
            <HealthHistory formData={formData} setFormData={setFormData} onSubmit={()=>setState(true)} onCancel={()=>navigate('/')} />
        }
    </div>
}