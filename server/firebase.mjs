import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getAdminFromFirebaseID, getFirebaseCredidentials, getRMTIDFromFirebaseID } from "./database.mjs";
import path from 'path'
import fs from 'node:fs'

const GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS
if (!GOOGLE_APPLICATION_CREDENTIALS)
    throw 'No GOOGLE_APPLICATION_CREDENTIALS found in environment variables'

// This is jank. I hate it
// Gets the creds from pantry, then writes it to a file so google can then read the file.
// Murder.
getFirebaseCredidentials().then(async creds => {
    fs.writeFileSync(GOOGLE_APPLICATION_CREDENTIALS, JSON.stringify(creds))
    const app = initializeApp({
        // grabs auth from the GOOGLE_APPLICATION_CREDENTIALS environment variable.
        // Make sure this points to a valid file
        credential: applicationDefault(),
        // databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
    })
})

export async function authenticateToken(firebase_token) {
    const user = await getAuth().verifyIdToken(firebase_token, true)
    return {
        user: user,
        firebaseID: user.uid,
        rmtID: await getRMTIDFromFirebaseID(user.uid),
        admin: await getAdminFromFirebaseID(user.uid)
    }
}