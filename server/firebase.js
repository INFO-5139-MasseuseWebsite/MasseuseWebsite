import { initializeApp,applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
export const app = initializeApp({
    // grabs auth from the GOOGLE_APPLICATION_CREDENTIALS environment variable.
    // Make sure this points to a valid file
    credential: applicationDefault(),
    // databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});

export const auth = getAuth()
