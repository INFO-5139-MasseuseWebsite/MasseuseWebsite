import path from 'path'
import http from 'http'
import https from 'https'
import { addBooking, cancelBooking, getAvailableBookingsMonth, getBooking, getBookingsTable, getRMTInfo } from './database.mjs'
import { authAdmin, authRMT, filterJson, parseJson } from './middleware.mjs'
import checkType, { ARRAY_T, EMAIL, INTEGER, NULLABLE, STRING } from './formParser.mjs'
import e from 'express'
import { sendEmail } from './email.js'
import { format } from 'date-fns'
import { scheduleJob } from 'node-schedule'

// Node version requirement check
const [major, minor, patch] = process.versions.node.split('.').map(Number)
if (major !== 20) {
    throw 'Node version must be 20.x.x'
}

const PORT = process.env.PORT || 80
const app = e()

// every day at 4am, send out reminder emails to all clients that have an appointment today
scheduleJob('0 4 * * *', async date => {
    const year = date.getFullYear(),
        month = date.getMonth(),
        day = date.getDate()

    const bookingTable = await getBookingsTable()

    for (let [rmtID, bookings] of Object.entries(bookingTable)) {
        const rmtData = await getRMTInfo(rmtID)
        const rmtAddress = rmt.placesOfPractice?.[0] ?? {}
        for (let [bookingID, bookingData] of Object.entries(bookings)) {
            if (bookingData.year === year && bookingData.month === month && bookingData.day === day) {
                sendEmail(bookingData.form.email, 'Reminder for todays Appointment', './email/clientReminder.html', {
                    hour: bookingData.hour > 12 ? `${bookingData.hour - 12} pm` : `${bookingData.hour} am`,
                    rmtName: `${rmtData.firstName} ${rmtData.lastName}`,
                    rmtAddressProvince: rmtAddress.province ?? rmtAddress.businessState,
                    rmtAddressCity: rmtAddress.city ?? rmtAddress.businessCity,
                    rmtAddressStreet: rmtAddress.businessAddress,
                    rmtAddressPhone: rmtAddress.phone,
                })
            }
        }
    }
})

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

    if (!valid) {
        response.status(400).type('plain').send('(400) Invalid Form')
        return
    }

    (async () => {
        const [success, bookingID] = await addBooking(data)
        if (!success) {
            response.status(400).type('plain').send(bookingID)
            return
        }
        response.status(200).send()

        // get target rmt data
        const rmt = await getRMTInfo(data.rmtID)
        // gets the first place of practice, even if it doesnt exist
        // Need to handle 
        const rmtAddress = rmt.placesOfPractice?.[0] ?? {}
        const a = new Date(data.year, data.month, data.day, data.hour)
        const weekDayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const monthNames = ['January', 'Febuary', 'March', 'April']
        const clientEmail = sendEmail(data.form.email, 'Massage Appointment Confirmation', './email/clientConfirm.html', {
            rmtName: `${rmt.firstName} ${rmt.lastName}`,
            rmtAddressProvince: rmtAddress.province ?? rmtAddress.businessState,
            rmtAddressCity: rmtAddress.city ?? rmtAddress.businessCity,
            rmtAddressStreet: rmtAddress.businessAddress,
            rmtAddressPhone: rmtAddress.phone,
            date: `${format(a, 'EEEE, MMMM do, yyyy')} at ${format(a, 'h:mm b')}`,
            bookingID: bookingID,
        })
        if (rmt.email) {
            await sendEmail(rmt.email, 'New Client Booked', './email/rmtConfirm.html', {
                date: `${format(a, 'EEEE, MMMM do, yyyy')} at ${format(a, 'h:mm b')}`,
                bookingID: bookingID,
            })
        } else {
            console.log(`RMT ${data.rmtID} does not have an email`)
        }
        // we wait to await so that the rmt confirmation email starts sending before we start spinning
        await clientEmail
    })()
        .catch(e => {
            console.error(e)
            response.status(500).send()
        })
})
app.post('/api/public/get-available-bookings', (request, response) => {
    const [valid, form] = checkType({
        rmtID: STRING,
        year: INTEGER,
        month: INTEGER
    }, request.body)
    if (!valid) {
        console.log('(404)', form)
        response.status(400).type('text').send('(404) Bad Request: Invalid types')
        return
    }
    getAvailableBookingsMonth(form.rmtID, form.year, form.month)
        .then(available => response.status(200).type('json').send(available))
        .catch(err => response.status(err.status).type('text').send(err.message))
})
app.get('/api/public/cancel-booking', (request, response) => {
    if (!request.query?.id) {
        response.status(400).send('(400) No id')
        return
    }
    cancelBooking(request.query.id)
        .then(() => response.status(200).send('Appointment Successfully Canceled'))
        .catch(e => {
            console.error(e.serverError ?? e)
            response.status(e.status ?? 500).send(e.clientError)
        })
})

// Blanket auth for RMTs
app.post('/api/rmt/:handle', authRMT, filterJson, parseJson)
app.post('/api/rmt/dothing', (request, response) => {
    console.log('Accessing dothing...')
    response.status(200).send('Accessing dothing...')
})
app.post('/api/rmt/get-all-bookings', (request, response) => {
    getAllBookingsRMT(response.locals.auth.rmtID)
        .then(bookings => response.status(200).type('json').send(bookings))
        .catch(err => {
            console.log(err)
            response.status(400).send()
        })
})
app.post('/api/rmt/:handle', (request, response) => response.status(400).send())

// Blanket auth for Admins
app.post('/api/admin/:handle', authAdmin, filterJson, parseJson)
app.post('/api/admin/dothing', (request, response, next) => {
    console.log('Accessing dothing...')
    response.status(200).send()
})
app.post('/api/admin/:handle', (request, response) => response.status(400).send())

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

