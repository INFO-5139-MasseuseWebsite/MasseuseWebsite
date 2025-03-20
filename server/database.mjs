// https://getpantry.cloud/apiv1/pantry/YOUR_PANTRY_ID/basket/YOUR_BASKET_NAME

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'

const PANTRY_ID = process.env.PANTRY_ID
if (!PANTRY_ID)
    throw 'No PANTRY_ID found in environment variables'
const DB = `https://getpantry.cloud/apiv1/pantry/${PANTRY_ID}/basket/`
const CMTO_DB = `https://cmto.ca.thentiacloud.net/rest/public/profile/get/`

export async function getFirebaseCredidentials() {
    const creds = await axios.get(DB + 'firebase_sdk_credidentials')
    return creds.data
}

// https://www.30secondsofcode.org/js/s/days-in-month/
// Gets the number of days in a month
// Expects month to be an integer from 0-11
const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

export async function addBooking(data) {
    //verify time
    const availableMonth = await getAvailableBookingsMonth(data.rmtID, data.year, data.month)
    if (data.day > availableMonth.maxDay || data.day <= 0)
        return [false, 'Invalid Day (out of bounds)']
    if (data.hour < availableMonth.hourIndexOffset)
        return [false, 'Invalid Hour (out of bounds)']
    const day = availableMonth.available[data.day]
    const available = day[data.hour - availableMonth.hourIndexOffset]
    if (!available)
        return [false, 'Date already booked']

    const bookingID = uuidv4()
    const result = await axios.put(DB + 'rmt_booking', {
        [data.rmtID]: {
            [bookingID]: {
                bookingID: bookingID,
                form: data.form,
                year: data.year,
                month: data.month,
                day: data.day,
                hour: data.hour,
                confirmed: false,
                canceled: false,
            }
        }
    })
    return [true, bookingID]
}

// This can be moved into RMT data if we wanna personalize it
const minHour = 9, // 9am
    maxHour = 12 + 5, // 5pm
    noticeDays = 7; // 7 days buffer between today and next available booking date

// rmtID: string ID of the rmt
// year: numeric year. No restrictions
// month: numeric month. Valid range: 0-11
export async function getAvailableBookingsMonth(rmtID, year, month) {
    const rmt_result = await getRMTInfo(rmtID)
    if (!rmt_result) throw {
        status: 400,
        message: 'Invalid rmtID: RMT doesnt exist'
    }
    const bookings_result = await axios.get(DB + 'rmt_booking')
    const bookings = Object.values(bookings_result.data[rmtID] ?? {})
    if (month < 0) throw {
        status: 400,
        message: 'Invalid month: Less than 0'
    }
    if (month > 11) throw {
        status: 400,
        message: 'Invalid month: Greater than 11'
    }
    const daysInTargetMonth = daysInMonth(year, month)
    const today = new Date()

    // If the searched date is before today,
    if (year < today.getFullYear() || (year === today.getFullYear() && month < today.getMonth())) {
        return {
            // Arrays start at 0. Each index represents an hour. This determines what hour index 0 is.
            hourIndexOffset: minHour,
            // available will never have data. Don't bother processing it
            empty: true,
            available: [],
            // Number of days in the target month for ease of access
            maxDay: daysInTargetMonth,
        };
    }

    let nextAvailableDay;
    if (today.getMonth() === month)
        // If target month is today's month
        // Offset with no extra consideration
        nextAvailableDay = today.getDate() + noticeDays;
    else if (today.getMonth() + 1 === month)
        // If target month is next month
        // Take take into account wrap-around
        nextAvailableDay = Math.max(today.getDate() + noticeDays - daysInMonth(today.getFullYear(), today.getMonth()), 1);
    // At least 2 months of overhead. Don't bother with "can't book too soon" calculations
    else nextAvailableDay = 1;
    // only process bookings in this current year/month and that havnt been canceled
    const validBookings = bookings.filter(
        (booking) => booking.year === year && booking.month === month && !booking.canceled
    );
    // fill array with "no available bookings" up until the next available day
    const available = Array(Math.min(nextAvailableDay - 1, daysInTargetMonth - 1)).fill(
        Array(maxHour - minHour).fill(false)
    );
    // fill rest of array with actual availability data
    for (let day = nextAvailableDay - 1; day <= daysInTargetMonth - 1; day++) {
        const availableDay = getAvailableBookingsDay(validBookings, day, minHour, maxHour);
        available.push(availableDay);
    }

    return {
        // Arrays start at 0. This determines what hour index 0 is.
        hourIndexOffset: minHour,
        // available probably has data. Process it
        empty: false,
        available,
        // Number of days in the target month for ease of access
        maxDay: daysInTargetMonth,
    };
}
function getAvailableBookingsDay(bookings, day, minHour, maxHour) {
    const ret = Array(maxHour - minHour).fill(true)
    for (let booking of bookings) {
        if (booking.day !== day) continue
        const index = booking.hour - minHour
        if (index < 0) console.error(`Booking ${booking.bookingID} has been booked at an invalid time. FIX IT`)
        else ret[index] = false
    }
    return ret
}

export async function getRMTInfo(rmtID) {
    console.log('cmto')
    const cmto_result = axios.get(CMTO_DB, {
        params: {
            id: rmtID
        }
    })
    console.log('local')
    const local_result = axios.get(DB + 'rmts')
    const cmto = await cmto_result
    console.log('get cmto')
    const local = await local_result
    if (cmto.status !== 200 && local.status !== 200) {
        return null
    }
    console.log('get local')
    console.log(cmto.data, local.data)
    // Merge CMTO data with our data, overwriting existing data with our data
    const rmt = {
        ...(cmto.data ?? {}),
        // If rmt doesnt exist in our database, use an object with default values instead
        ...(local.data[rmtID] ?? {

        }),
        // remove email from data so that we dont actually email anyone
        publicEmail: null
    }
    console.log(rmt)
    return rmt
}
export async function setRMTInfo(rmtID, data) {
    await axios.put(DB + 'rmts', {
        [rmtID]: data
    })
}

export async function getEmailCredentials() {
    const result = await axios.get(DB + 'email')
    return {
        email: result.data.email,
        password: result.data.password,
    }
}

export async function getBooking(bookingID) {
    const result = await axios.get(DB + 'rmt_booking')
    console.log(bookingID)
    let data = null
    for (let [rmt, rmtData] of Object.entries(result.data)) {
        console.log(rmt, rmtData)
        if (rmtData[bookingID]) {
            data = [rmtData[bookingID], rmt]
            break
        }
    }
    console.log(data)
    if (!data) return null
    return data
}

export async function cancelBooking(bookingID) {
    const [booking, rmtID] = await getBooking(bookingID) ?? []
    if (!booking) throw {
        serverError: `Booking with id ${bookingID} doesn't exist`,
        clientError: '(404) Page Not Found',
        status: 404,
    }
    await axios.put(DB + 'rmt_booking', {
        [rmtID]: {
            [booking.bookingID]: {
                canceled: true
            }
        }
    })
}

export async function getRMTIDFromFirebaseID(firebaseID) {
    const rmtIDS = await axios.get(DB + 'rmt_firebase')
    const rmtID = rmtIDS.data[firebaseID]
    if (!rmtID) return null
    return rmtID
}

export async function getAllBookingsRMT(rmtID) {
    const allBookings = await axios.get(DB + 'rmt_booking')
    if (!allBookings.data[rmtID]) return []
    const rmtBookings = []
    for (let [id, booking] of Object.entries(allBookings.data[rmtID])) {
        rmtBookings.push(booking)
    }
    return rmtBookings
}

export async function getAdminFromFirebaseID(firebaseID) {
    const admins = await axios.get(DB + 'admin_firebase')
    const isAdmin = admins.data[firebaseID]
    return isAdmin ?? false
}
