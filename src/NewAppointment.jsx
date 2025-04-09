import { useState } from "react"
import HealthHistory from "./HealthHistory"
import CalendarThing from "./CalendarThing"
import Header from "./components/Header"
import Footer from "./components/Footer"
import axios from "axios"
import { useNavigate, useSearchParams } from "react-router-dom"

export default function NewAppointment({ }) {
    const navigate = useNavigate()
    const [searchParams, setSerchParams] = useSearchParams()
    const rmtID = searchParams.get('rmt')
    const today = new Date()
    const [formData, setFormData] = useState({

        firstName: '',
        lastName: '',
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
    })
    const [date, setDate] = useState({
        year: today.getFullYear(),
        month: today.getMonth(),
        day: today.getDate(),
        hour: null
    })
    const [formState, setFormState] = useState(false)
    const [error, setError] = useState(null)

    const submit = async () => {
        console.log({
            rmtID: rmtID,
            year: date.year,
            month: date.month,
            day: date.day,
            hour: date.hour,
            form: formData
        })
        const response = await axios.post('/api/public/add-booking', {
            rmtID: rmtID,
            year: date.year,
            month: date.month,
            day: date.day,
            hour: date.hour,
            form: formData
        })
        if (response.status !== 200) {
            setError('Data is wrong. Dev message: Fix it')
            return
        }
        setError(null)
        navigate('/')
    }
    return <>
        <Header />
        <div style={{ height: '100px' }}></div>
        {!formState && <>
            <HealthHistory formData={formData} setFormData={setFormData} onSubmit={() => setFormState(true)} />
            {error && <p style={{ color: '#aa0000' }}>{error}</p>}
        </>}
        {formState && <>
            <CalendarThing date={date} setDate={setDate} rmtID={rmtID} />
            {error && <p style={{ color: '#aa0000' }}>{error}</p>}
            <button onClick={() => setFormState(false)}>Go Back</button>
            <button onClick={submit}>Submit</button>
        </>}

        <Footer />
    </>
}