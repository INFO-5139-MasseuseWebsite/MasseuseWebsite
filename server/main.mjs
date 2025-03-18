import path from 'path'
import http from 'http'
import https from 'https'
import { addBooking, getAvailableBookingsMonth } from './database.mjs'
import { authRMT, filterJson, parseJson } from './middleware.mjs'
import checkType, { ARRAY_T,  EMAIL, INTEGER, NULLABLE, STRING } from './formParser.mjs'
import e from 'express'

// Node version requirement check
const [major, minor, patch] = process.versions.node.split('.').map(Number)
if(major !== 20) {
    throw 'Node version must be 20.x.x'
}

const PORT = process.env.PORT || 80
const app = e()

// Blanket auth for public
app.post('/api/public/:handle', filterJson, parseJson)
app.post('/api/public/add-booking', (request, response) => {
    const form = request.body
    const [valid, data] = checkType({
        rmtID: STRING,
        year: INTEGER,
        month: INTEGER,
        day: INTEGER,
        hour: INTEGER,
        form: {
            firstName: STRING,
            lastName: STRING,
            email: EMAIL,
            // give it a proper typing later
            phoneNumber: STRING,
            // if we are to actually store an address, it needs to be split up into proper fields
            // this works as a placeholder for now though
            address: NULLABLE(STRING),
            occupation: NULLABLE(STRING),
            dateOfBirth: NULLABLE(STRING),
            recievedMassageBefore: NULLABLE(STRING),
            referredByPractitioner: NULLABLE(STRING),
            // this also needs to be split up if we are storing it
            practitionerNameAddress: NULLABLE(STRING),
            cardiovascularConditions: NULLABLE(ARRAY_T(STRING)),
            cardiovascularHistory: NULLABLE(STRING),
            infections: NULLABLE(ARRAY_T(STRING)),
            respiratoryConditions: NULLABLE(ARRAY_T(STRING)),
            respiratoryFamilyHistory: NULLABLE(STRING),
            headNeckConditions: NULLABLE(ARRAY_T(STRING)),
            otherConditions: NULLABLE({
                lossOfSensation: NULLABLE(STRING),
                diabetesOnset: NULLABLE(STRING),
                allergies: NULLABLE(STRING),
                reactionType: NULLABLE(STRING),
                epilepsy: NULLABLE(STRING),
                cancer: NULLABLE(STRING),
                skinConditions: NULLABLE(STRING),
                arthritis: NULLABLE(STRING),
                arthritisFamilyHistory: NULLABLE(STRING),
            }),
            womenHealth: NULLABLE({
                pregnantDue: NULLABLE(STRING),
                gynecologicalConditions: NULLABLE(STRING),
                generalHealth: NULLABLE(STRING),
                primaryCarePhysician: NULLABLE(STRING),
                physicianAddress: NULLABLE(STRING),
            }),
            currentMedications: NULLABLE(ARRAY_T(STRING)),
            otherTreatment: NULLABLE(STRING),
            otherTreatmentReason: NULLABLE(STRING),
            surgeryDate: NULLABLE(STRING),
            surgeryNature: NULLABLE(STRING),
            injuryDate: NULLABLE(STRING),
            injuryNature: NULLABLE(STRING),

            otherMedicalConditions: NULLABLE(STRING),
            otherMedicalConditionsDetails: NULLABLE(STRING),
            internalPinsWires: NULLABLE(STRING),
            internalPinsWiresDetails: NULLABLE(STRING),
            internalPinsWiresLocation: NULLABLE(STRING),
            massageTherapyReason: NULLABLE(STRING),
            allergiesLubricants: NULLABLE(STRING),
            allergiesLubricantsDetails: NULLABLE(STRING),
            treatmentGoals: NULLABLE(STRING),
            limitationsDailyLife: NULLABLE(STRING),
            discomfortAreas: NULLABLE(STRING),
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
http.createServer(app).listen(PORT, () => console.log('Server listening on port 80'));
// certificate information goes here
const https_credentials = {}
// https.createServer(https_credentials, app).listen(443, () => console.log('Server listening on port 443'));

