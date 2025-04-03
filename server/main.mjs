import path from 'path';
import http from 'http';
import { addBooking, publicCancelBooking, getAvailableBookingsMonth, getRMTInfo, rmtConfirmAppointment, rmtRejectAppointment, getAllBookedSlots } from './database.mjs';
import { authAdmin, authRMT, filterJson, parseJson } from './middleware.mjs';
import checkType, { ARRAY_T, EMAIL, INTEGER, NULLABLE, STRING } from './formParser.mjs';
import e from 'express';
import { sendEmail } from './email.mjs';
import { format } from 'date-fns';

// Ensure the current Node.js version is 20.x.x
const [major] = process.versions.node.split('.').map(Number);
if (major !== 20) {
    throw new Error('Node version must be 20.x.x');
}

const PORT = process.env.PORT || 80;
const app = e();

// In-memory storage for booked slots (for fallback)
let memoryBookedSlots = [];

// GET route to return all booked date-time slots
app.get('/api/public/get-booked-dates', async (req, res) => {
    try {
        const allSlots = await getAllBookedSlots?.();
        if (Array.isArray(allSlots)) {
            res.status(200).json(allSlots);
        } else {
            res.status(200).json(memoryBookedSlots);
        }
    } catch (err) {
        console.error('Failed to get booked slots:', err);
        res.status(500).json([]);
    }
});

// POST route to handle a new booking
app.post('/api/public/add-booking', filterJson, parseJson, (request, response) => {
    const form = request.body;

    // Validate request data types using checkType
    const [valid, data] = checkType(
        {
            rmtID: STRING,
            year: INTEGER,
            month: INTEGER,
            day: INTEGER,
            hour: INTEGER,
            form: {
                firstName: STRING,
                lastName: STRING,
                email: EMAIL,
                phoneNumber: STRING,
                address: NULLABLE(STRING),
                occupation: NULLABLE(STRING),
                dateOfBirth: NULLABLE(STRING),
                recievedMassageBefore: NULLABLE(STRING),
                referredByPractitioner: NULLABLE(STRING),
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
            },
        },
        form
    );

    // If invalid, return 400 Bad Request
    if (!valid) {
        response.status(400).type('plain').send('(400) Invalid Form');
        return;
    }

    // Construct a formatted booking slot string
    const bookingSlot = `${data.year}-${String(data.month).padStart(2, '0')}-${String(data.day).padStart(2, '0')} ${String(data.hour).padStart(2, '0')}:00`;

    // Check if the slot is already booked
    if (memoryBookedSlots.includes(bookingSlot)) {
        response.status(409).json({ error: "Slot already booked" });
        return;
    }

    // Store the slot in memory
    memoryBookedSlots.push(bookingSlot);

    (async () => {
        // Attempt to add the booking using database function
        const [success, bookingID] = await addBooking(data);
        if (!success) {
            response.status(400).type('plain').send(bookingID);
            return;
        }

        response.status(200).send();

        // Retrieve RMT (massage therapist) information
        const rmt = await getRMTInfo(data.rmtID);
        const rmtAddress = rmt.placesOfPractice?.[0] ?? {};

        // Generate a JavaScript Date object for formatting
        const a = new Date(data.year, data.month - 1, data.day, data.hour);

        // Send confirmation email to client
        const clientEmail = sendEmail(data.form.email, 'Massage Appointment Scheduled', './email/clientConfirm.html', {
            rmtName: `${rmt.firstName} ${rmt.lastName}`,
            rmtAddressProvince: rmtAddress.province ?? rmtAddress.businessState,
            rmtAddressCity: rmtAddress.city ?? rmtAddress.businessCity,
            rmtAddressStreet: rmtAddress.businessAddress,
            rmtAddressPhone: rmtAddress.phone,
            date: `${format(a, 'EEEE, MMMM do, yyyy')} at ${format(a, 'h:mm b')}`,
            bookingID: bookingID,
        });

        // Send confirmation email to the RMT if they have an email
        if (rmt.email) {
            await sendEmail(rmt.email, 'New Client Booked', './email/rmtConfirm.html', {
                date: `${format(a, 'EEEE, MMMM do, yyyy')} at ${format(a, 'h:mm b')}`,
                bookingID: bookingID,
            });
        } else {
            console.log(`RMT ${data.rmtID} does not have an email`);
        }

        await clientEmail;
    })().catch(e => {
        console.error(e);
        response.status(500).send();
    });
});

// Serve static files from the dist directory
app.use(e.static(path.resolve(import.meta.dirname, '../dist')));

// Serve index.html for all unmatched routes (for React Router support)
app.get('*', (req, res) => res.sendFile(path.resolve(import.meta.dirname, '../dist/index.html')));

// Start HTTP server
http.createServer(app).listen(PORT, () => console.log(`Server listening on port ${PORT}`));
