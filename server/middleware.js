import bodyParser from "body-parser"
import mime from 'mime'
import { authenticateToken } from "./firebase.js"

export const parseJson = bodyParser.json({ type: ['json', 'application/json'] })

export function filterJson(request, response, next) {
    if (request.headers['content-type'] && mime.lookup(request.headers['content-type']) !== 'application/json') {
        response.status(400).type('text').send(`Invalid content-type: expected application/json, got ${request.headers['content-type']}`)
    } else {
        next()
    }
}

export function authRMT(request, response, next) {
    const firebase_token = request.headers.authorization
    console.log(firebase_token)
    authenticateToken(firebase_token).then(auth => {
        if(!auth.rmtID) {
            console.log(`Unauthorized RMT API connection attempt from ${request.ip}`)
            response.status(401).send()
            return
        }
        response.locals.auth = auth
        next()
    })
    .catch(err => {
        console.error(err)
        response.status(401).send()
    })
}
export function authAdmin(request, response, next) {
    const firebase_token = request.headers.authorization
    console.log(firebase_token)
    authenticateToken(firebase_token).then(auth => {
        if(!auth.admin) {
            console.log(`Unauthorized Admin API connection attempt from ${request.ip}`)
            response.status(401).send()
            return
        }
        response.locals.auth = auth
        next()
    })
    .catch(err => {
        console.error(err)
        response.status(401).send()
    })
}