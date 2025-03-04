import path from 'path'
import http from 'http'
import https from 'https'
import { addBooking, getAvailableBookingsMonth } from './database.js'
import e from 'express'
import { authRMT, filterJson, parseJson } from './middleware.js'
import { ARRAY_T, checkType, DATA_TYPES, EMAIL, NULLABLE } from './formParser.js'
const app = e()

// Blanket auth for public
app.post('/api/public/:handle', filterJson, parseJson)
app.post('/api/public/add-booking', (request, response) => {
    const form = request.body
    const [valid, data] = checkType({
        rmtID: DATA_TYPES.STRING,
        year: DATA_TYPES.INTEGER,
        month: DATA_TYPES.INTEGER,
        day: DATA_TYPES.INTEGER,
        hour: DATA_TYPES.INTEGER,
        form: {
            firstName: DATA_TYPES.STRING,
            lastName: DATA_TYPES.STRING,
            email: EMAIL,
            // give it a proper typing later
            phoneNumber: DATA_TYPES.STRING,
            // if we are to actually store an address, it needs to be split up into proper fields
            // this works as a placeholder for now though
            address: NULLABLE(DATA_TYPES.STRING),
            occupation: NULLABLE(DATA_TYPES.STRING),
            dateOfBirth: NULLABLE(DATA_TYPES.STRING),
            recievedMassageBefore: NULLABLE(DATA_TYPES.STRING),
            referredByPractitioner: NULLABLE(DATA_TYPES.STRING),
            // this also needs to be split up if we are storing it
            practitionerNameAddress: NULLABLE(DATA_TYPES.STRING),
            cardiovascularConditions: NULLABLE(ARRAY_T(DATA_TYPES.STRING)),
            cardiovascularHistory: NULLABLE(DATA_TYPES.STRING),
            infections: NULLABLE(ARRAY_T(DATA_TYPES.STRING)),
            respiratoryConditions: NULLABLE(ARRAY_T(DATA_TYPES.STRING)),
            respiratoryFamilyHistory: NULLABLE(DATA_TYPES.STRING),
            headNeckConditions: NULLABLE(ARRAY_T(DATA_TYPES.STRING)),
            otherConditions: NULLABLE({
                lossOfSensation: NULLABLE(DATA_TYPES.STRING),
                diabetesOnset: NULLABLE(DATA_TYPES.STRING),
                allergies: NULLABLE(DATA_TYPES.STRING),
                reactionType: NULLABLE(DATA_TYPES.STRING),
                epilepsy: NULLABLE(DATA_TYPES.STRING),
                cancer: NULLABLE(DATA_TYPES.STRING),
                skinConditions: NULLABLE(DATA_TYPES.STRING),
                arthritis: NULLABLE(DATA_TYPES.STRING),
                arthritisFamilyHistory: NULLABLE(DATA_TYPES.STRING),
            }),
            womenHealth: NULLABLE({
                pregnantDue: NULLABLE(DATA_TYPES.STRING),
                gynecologicalConditions: NULLABLE(DATA_TYPES.STRING),
                generalHealth: NULLABLE(DATA_TYPES.STRING),
                primaryCarePhysician: NULLABLE(DATA_TYPES.STRING),
                physicianAddress: NULLABLE(DATA_TYPES.STRING),
            }),
            currentMedications: NULLABLE(ARRAY_T(DATA_TYPES.STRING)),
            otherTreatment: NULLABLE(DATA_TYPES.STRING),
            otherTreatmentReason: NULLABLE(DATA_TYPES.STRING),
            surgeryDate: NULLABLE(DATA_TYPES.STRING),
            surgeryNature: NULLABLE(DATA_TYPES.STRING),
            injuryDate: NULLABLE(DATA_TYPES.STRING),
            injuryNature: NULLABLE(DATA_TYPES.STRING),

            otherMedicalConditions: NULLABLE(DATA_TYPES.STRING),
            otherMedicalConditionsDetails: NULLABLE(DATA_TYPES.STRING),
            internalPinsWires: NULLABLE(DATA_TYPES.STRING),
            internalPinsWiresDetails: NULLABLE(DATA_TYPES.STRING),
            internalPinsWiresLocation: NULLABLE(DATA_TYPES.STRING),
            massageTherapyReason: NULLABLE(DATA_TYPES.STRING),
            allergiesLubricants: NULLABLE(DATA_TYPES.STRING),
            allergiesLubricantsDetails: NULLABLE(DATA_TYPES.STRING),
            treatmentGoals: NULLABLE(DATA_TYPES.STRING),
            limitationsDailyLife: NULLABLE(DATA_TYPES.STRING),
            discomfortAreas: NULLABLE(DATA_TYPES.STRING),
        }
    }, form)

    if (valid) {
        addBooking(data)
            .then(result => {
                if (result === true)
                    response.status(200).send()
                else
                    response.status(400).type('plain').send(result)
            })
            .catch(() => response.status(500).send())
    } else {
        response.status(400).type('plain').send('(400) Invalid Form')
    }
})
app.post('/api/public/get-available-bookings', (request, response) => {
    const rmt = request.body.rmtID
    const year = parseInt(request.body.year, 10)
    const month = parseInt(request.body.month, 10)
    if (!rmt) {
        response.status(400).type('plain').send('(404) Bad Request: Invalid json')
        return
    }
    if (isNaN(year)) {
        response.status(400).type('plain').send('(404) Bad Request: Invalid json')
        return
    }
    if (isNaN(month)) {
        response.status(400).type('plain').send('(404) Bad Request: Invalid json')
        return
    }
    console.log(rmt, year, month)
    getAvailableBookingsMonth(rmt, year, month)
        .then(available => response.status(200).type('json').send(available))
        .catch(err => response.status(err.status).type('plain').send(err.message))
})

// Blanket auth for RMTs
app.post('/api/rmt/:handle', authRMT, filterJson, parseJson)
app.post('/api/rmt/dothing', (request, response, next) => {
    console.log('Accessing dothing...')
    response.status(200).send()
})

// Blanket auth for Admins
app.post('/api/admin/:handle', (request, response, next) => {
    // authenticate. Replace with FireStore Admin
    console.log('Accessing Admin...')
    if (request.headers['x-auth']) {
        console.log(`Authed as ${request.headers['x-auth']}`)
        next()
        return
    }
    console.log('Unauthorized')
    response.status(401).send('401 Unauthorized')
})
app.post('/api/admin/dothing', (request, response, next) => {
    console.log('Accessing dothing...')
    response.status(200).send()
})

// This makes *everything* within the dist folder public.
// If we add any private files, this needs to be changed.
// Pipeline needs work
app.use(e.static(path.resolve(import.meta.dirname, '../dist')))

// for testing purposes, use both http and https
// when https testing is done (mainly need a certificate), remove the http
http.createServer(app).listen(80, () => console.log('Server listening on port 80'));
// certificate information goes here
const https_credentials = {}
https.createServer(https_credentials, app).listen(443, () => console.log('Server listening on port 443'));

