import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getAdminFromFirebaseID, getRMTIDFromFirebaseID } from "./database.js";
export const app = initializeApp({
    // grabs auth from the GOOGLE_APPLICATION_CREDENTIALS environment variable.
    // Make sure this points to a valid file
    credential: applicationDefault(),
    // databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});

export const auth = getAuth()

export async function authenticateToken(firebase_token) {
    const user = await auth.verifyIdToken(firebase_token, true)
    return {
        user: user,
        firebaseID: user.uid,
        rmtID: await getRMTIDFromFirebaseID(user.uid),
        admin: await getAdminFromFirebaseID(user.uid)
    }
}