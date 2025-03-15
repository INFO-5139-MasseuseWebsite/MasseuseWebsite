import bodyParser from "body-parser"
import mime from 'mime'
import { auth } from "./firebase.js"
import { getRMTIDFromFirebaseID } from "./database.js"

export const parseJson = bodyParser.json({ type: ['json', 'application/json'] })

export function filterJson(request, response, next) {
    if (request.headers['content-type'] && mime.lookup(request.headers['content-type']) !== 'application/json') {
        response.status(400).type('plain').send(`Invalid content-type: expected application/json, got ${request.headers['content-type']}`)
    } else {
        next()
    }
}

export function authRMT(request, response, next) {
    const firebase_token = request.headers.authorization
    console.log(firebase_token)
        (async () => {
            const user = await auth.verifyIdToken(firebase_token, true)
            response.locals.auth = {
                user: user,
                firebaseID: user.uid,
                rmtID: await getRMTIDFromFirebaseID(user.uid)
            }
            next()
        })()
        .catch(err => {
            console.error(err)
            response.status(401).send(err)
        })
}